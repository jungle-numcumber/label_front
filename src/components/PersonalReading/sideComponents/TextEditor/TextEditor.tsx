import { editorViewOptionsCtx } from '@milkdown/core';
import { defaultValueCtx, Editor, rootCtx, JSONRecord } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect } from 'react';
import { block, blockPlugin } from '@milkdown/plugin-block';
import { math } from '@milkdown/plugin-math';
import { menu, menuPlugin } from '@milkdown/plugin-menu';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history'
import io from 'socket.io-client';
import React from 'react';
import './TextEditor.css';
import axios from "axios";

const url:string = 'https://tradingstudy.shop:443';
let socket:any;

let timerId:NodeJS.Timeout
export class WrapperTextEditor extends React.Component<{markdownValue: JSONRecord, commitIdx: number, userIdx: string, pdfIdx: string}, { fp: any, flag: boolean }> {
    constructor(props: any) {
        super(props);
        socket = io(url, {
            transports: ["websocket"],
            query: {
                "userId": String(this.props.userIdx),
                "pdfId": String(this.props.pdfIdx)
            },
        });
        
        this.state = {fp: {}, flag: false};
        socket.on('connect',() => {
            socket.once('updateEditorOnce', (value: any) => {
                this.setState({
                    fp: value,
                    flag: true,
                })
            })
        })
        
        if (this.props.commitIdx !== -1) {
            socket.disconnect();
        }
    }

    render() {
        return (
            <div>
                {this.state.flag && <TextEditor value={this.state.fp} markdownValue={this.props.markdownValue} commitIdx={this.props.commitIdx} userIdx={this.props.userIdx} pdfIdx={this.props.pdfIdx}/>}
            </div>
        )
    };

    componentWillUnmount() {
        if (socket != null && socket.connected === true) {
            // console.log('disconnect');
            socket.disconnect();
        }
    }
}

/* solution 2 */
function updateEditor(userID : string, pdfID : string, value : any) {
    timerId = setTimeout(() => {
        socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value}, clearTimeout(timerId));
    }, 700)
}

async function updateOrClearEditor(userID: string, pdfID : string, jsonOutput : any) {
    if (timerId) {
        clearTimeout(timerId);
        updateEditor(userID, pdfID, jsonOutput)
    } else {
        updateEditor(userID, pdfID, jsonOutput)
    }
}

async function imageHandler(imageSrc : any, userID : string) {
    const { preSignedUrl, fileName } : any = await getPresignedUrl(userID);
    const imageFile = await imageSrcToFile(imageSrc, fileName);
    const imageUrl = `https://label-editor.s3.ap-northeast-2.amazonaws.com/${fileName}`;

    await uploadImageToS3(preSignedUrl.signedUrlPut, imageFile);
    return imageUrl
}

async function getPresignedUrl(userID : string) {
    try {
        const randomString = Math.random().toString(36).substring(2, 11);
        const fileName = `${userID}_${randomString}.png`;
        const response = await axios.post("https://tradingstudy.shop:443/users/sign", {
            fileName
        });
        return {preSignedUrl: response.data, fileName};
    } catch (err) {
        console.log(err);
    }
}

async function imageSrcToFile(imageSrc : any, fileName : any) {
    var arr = imageSrc.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
}

async function uploadImageToS3(preSignedUrl : any, imageFile : any) {
    const response = await fetch(preSignedUrl, {
        method: 'PUT',
        body: imageFile,
        headers: {
        'x-amz-acl':'public-read',
        'Content-Type': 'image/png',
        },
    })
}

export const TextEditor: FC<{ value: JSONRecord, markdownValue: JSONRecord, commitIdx: number, userIdx: string, pdfIdx: string }> = ({ value, markdownValue, commitIdx, userIdx, pdfIdx }) => {
    // let readonly = false;
    // const editable = () => !readonly;
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
                const editor = Editor.make()
                    .config((ctx) => {
                        ctx.set(rootCtx, root);
                        // ?????? ????????? editor?????? ??? ?????? ??????
                        // ?????? ???????????? JSON???????????? DB?????? ????????????
                        if (commitIdx === -1 && value) {
                            ctx.set(defaultValueCtx, {
                                type: "json",
                                value: value,
                            });    
                        } else if (commitIdx === -1 && Object.keys(value).length === 0) {
                            // console.log('-----------------', markdownValue);
                            ctx.set(defaultValueCtx, '');  
                        } else {
                            ctx.set(defaultValueCtx, {
                                type: "json",
                                value: markdownValue,
                            });
                            console.log(markdownValue);
                        }
                        
                        ctx.get(listenerCtx).updated(async (ctx, doc, prevDoc) => {
                            let jsonOutput = doc.toJSON();
                            console.log('jsonOutput: ',jsonOutput);
                            let arrOutput = jsonOutput.content;
                            for (let i = 0; i < arrOutput.length; i++) {
                                // html??? dom??? ????????? doc??? ????????? ?????????. ??????????????? ???????????????.
                                // JSON ???????????? DB??? ???????????? ????????? ??????
                                // ??? ???????????? ???????????? ???????????? ?????? ?????? ??????
                                if (arrOutput[i].content) {
                                    for (let j = 0; j < arrOutput[i].content.length; j++) {
                                        let contentInDoc = arrOutput[i].content[j]
                                        let contentInDocType = contentInDoc['type']
                                        let contentAttr = contentInDoc['attrs']
                                        console.log('contentAttr',contentAttr)
                                        if (contentAttr !== undefined && !contentAttr['title']) {
                                            contentAttr['title'] = 'try'
                                            console.log('it is not stored yet!!')
                                            let imageSrc = contentAttr['src']
                                            /* ???????????? s3 ????????? ?????? */
                                            /* ????????? url ??????????????? doc JSON ?????? */
                                            const imageUrl = await imageHandler(imageSrc, userIdx);
                                            console.log('imagesrc:', imageUrl)
                                            contentAttr['src'] = imageUrl;
                                            // console.log('changed val:',imageSrc);
                                        }
                                        else {
                                            if (contentInDocType === 'image')
                                            console.log('it is alread loaded!!');
                                        }
                                        console.log(arrOutput[i], contentInDoc, contentInDocType);
                                    }
                                }
                            }

                            await updateOrClearEditor(userIdx, pdfIdx, jsonOutput);
                            
                            return value;
                        });
                    })
                    .use(block)
                    .use(menu)
                    .use(nord)
                    .use(history)
                    .use(gfm)
                    .use(math)
                    .use(prism)
                    .use(listener)

                    return editor
        }, [commitIdx, markdownValue])
           
    useEffect(() => {
        document.querySelector('.ProseMirror.editor')?.setAttribute('ondrop', 'drop_handler(event)');
        document.querySelector('.ProseMirror.editor')?.setAttribute('ondragover', 'dragover_handler(event)');
        
        let height = document.querySelector('.PersonalReading__mainPage')?.clientHeight;
        if (height != null) {
            document.querySelector('.milkdown')?.setAttribute('style', `height: ${height - 240}px`);    
        }
        
        if (commitIdx !== -1) {
            document.querySelector('.ProseMirror.editor')?.setAttribute('contenteditable', 'false');
        }
        
        // document.querySelector('.editor')?.setAttribute('style', 'overflow: scroll !important');
    });
    
    return <ReactEditor editor={editor} />
};