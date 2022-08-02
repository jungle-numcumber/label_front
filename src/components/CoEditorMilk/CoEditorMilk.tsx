/* Copyright 2021, Milkdown by Mirone. */

import { defaultValueCtx, Editor, JSONRecord, rootCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { codeFence as cmCodeFence, commonmark, heading, paragraph , link, commonmarkNodes, commonmarkPlugins, blockquote, SupportedKeys, image  } from '@milkdown/preset-commonmark';
// import { Node } from '@milkdown/prose/model';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect } from 'react';
import { CodeFence } from './CodeFence';
import { codeFence } from './CodeFence/codeFence.node';
import { block, blockPlugin } from '@milkdown/plugin-block';
import { math } from '@milkdown/plugin-math';
import { gfm } from '@milkdown/preset-gfm';
import io from 'socket.io-client';
import React from 'react'
import { insert, createNode } from '@milkdown/utils';
import { history } from '@milkdown/plugin-history'
import { upload, uploadPlugin, Uploader } from '@milkdown/plugin-upload';
import { menu } from '@milkdown/plugin-menu'
import type { Node } from 'prosemirror-model';
import axios from "axios";
import { fileURLToPath } from 'url';
import imagefile2 from './test.png'
import fs from 'fs';

let firstPage = '';
// const url: string = 'ws://3.34.199.193:3000';
const url:string = 'https://tradingstudy.shop:443';
const socket = io(url, { 
    transports: ["websocket"],
    query: {
        "userId": "ddong",
        "pdfId": "pdf"
    }
});

let timerId : NodeJS.Timeout
export class WrapperMilkdown extends React.Component<{},{ fp: any, flag: boolean }> {
    constructor(props: any) {
        console.log('construct')
        super(props);
        this.state = {fp: {}, flag: false};
        socket.on('connect',() => {
            socket.once('updateEditorOnce', (value) => {
                this.setState({
                    fp: value,
                    flag: true
                })
            })
        })
    }
    render() {
      return (
        <div>
            {this.state.flag && <Milkdown value = {this.state.fp}/>}
        </div>
        )
    };
  }

/* solution 2 */
function updateEditor(userID : string, pdfID : string, value : any) {
    timerId = setTimeout(() => {
        socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value});
        // alert("editor is updated.");
    }, 700);
}

async function updateOrClearEditor(userID: string, pdfID : string, jsonOutput : any) {
    if (timerId) {
        clearTimeout(timerId);
        updateEditor(userID, pdfID, jsonOutput)
        console.log('clear')
    } else {
        updateEditor(userID, pdfID, jsonOutput)
        console.log('update')
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
        // const response = await axios.post("https://tradingstudy.shop/users/sign", {
        //     fileName
        // });
        
        console.log(response, "is my url")
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
    console.log("presigned url check !", preSignedUrl);
    // fetch(preSignedUrl, {
    //     method: "PUT",
    //     body: imagefile2,
    //   });
    const response = await fetch(preSignedUrl, {
          method: 'PUT',
          body: imagefile2,
          headers: {
            'x-amz-acl':'public-read',
            'Content-Type': 'image/png',
          },
        })
    var options = { headers: { 'Content-Type': 'image/png' } };
    axios.put(preSignedUrl, imagefile2, options).then(res => console.log(res)).catch(err => console.log(err));
        const response2 = await fetch(
            new Request(preSignedUrl, {
            method: 'PUT',
            body: imagefile2,
            headers: new Headers({
              'Content-Type': 'image/png',
            }),
          })
        )
        // const axiosResponse = await axios.put(preSignedUrl, {
        //     data: imagefile2,
      
        //   }, {
        //     headers: {
        //       'Content-Type': 'image/*'
        //     }
        //   });
    //   if (response.status !== 200) {
    //     // The upload failed, so let's notify the caller.
    //     console.log(response)
    //     return;
    //   }
}

let uploaded = new Map();
let notuploaded = new Map();
export const Milkdown: FC<{ value: JSONRecord }> = ({ value }) => {
    console.log('in milk compo:', value)
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
                const editor = Editor.make()
                    .config((ctx) => {
                        ctx.set(rootCtx, root);
                        // 처음 생성된 editor라면 빈 화면 생성
                        // 그게 아니라면 JSON형식으로 DB에서 불러들임
                        if (value) {
                            ctx.set(defaultValueCtx, {
                                type: "json",
                                value: value,
                            });
                        } else {
                            ctx.set(defaultValueCtx, '');
                        }

                        ctx.get(listenerCtx).updated(async (ctx, doc, prevDoc) => {
                            const userID = 'ddong';
                            const pdfID = 'pdf';
                            let jsonOutput = doc.toJSON();
                            let arrOutput = jsonOutput.content;
                            console.log('doc?',doc);
                            console.log('default images map : ', uploaded)
                            console.log('json output', arrOutput, 'prevDoc')
                            for (let i = 0; i < arrOutput.length; i++) {
                                // html상 dom을 바꿔도 doc은 바뀌지 않는다. 다른것으로 생각해야함.
                                // JSON 형식으로 DB와 주고받는 것으로 수정
                                // 한 블록안에 여러개의 이미지를 넣는 경우 처리
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
                                            /* 이미지를 s3 서버에 전달 */
                                            /* 이미지 url 반환받아서 doc JSON 변경 */
                                            const imageUrl = await imageHandler(imageSrc, userID);
                                            console.log('imagesrc:',imageSrc, imageUrl)
                                            contentAttr['src'] = 'imageUrl';
                                            console.log('changed val:',imageSrc);
                                        }
                                        else {
                                            if (contentInDocType === 'image')
                                            console.log('it is alread loaded!!');
                                        }
                                        console.log(arrOutput[i], contentInDoc, contentInDocType);
                                    }
                                }
                            }

                            await updateOrClearEditor(userID, pdfID, jsonOutput);
                            
                            return value;
                        });
                    })
                    .use(block.configure(blockPlugin, {
                        configBuilder: (ctx) => {
                            return [/* your actions */];
                        }
                    }))
                    .use(nord)
                    // .use(nodes)
                    // .use(commonmarkPlugins)
                    .use(gfm)
                    // .use(math)
                    // .use(tooltip)
                    // .use(prism)
                    .use(menu)
                    .use(listener)
                    .use(history)

                    return editor
        })
        useEffect(() => {
        }, []);
    
    return <ReactEditor editor={editor} />
};

// /* Copyright 2021, Milkdown by Mirone. */

// import { defaultValueCtx, Editor, JSONRecord, rootCtx } from '@milkdown/core';
// import { listener, listenerCtx } from '@milkdown/plugin-listener';
// import { prism } from '@milkdown/plugin-prism';
// import { tooltip } from '@milkdown/plugin-tooltip';
// import { codeFence as cmCodeFence, commonmark, heading, paragraph , link, commonmarkNodes, commonmarkPlugins, blockquote, SupportedKeys, image  } from '@milkdown/preset-commonmark';
// // import { Node } from '@milkdown/prose/model';
// import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
// import { nord } from '@milkdown/theme-nord';
// import { FC, ReactNode, useEffect } from 'react';
// import { CodeFence } from './CodeFence';
// import { codeFence } from './CodeFence/codeFence.node';
// import { block, blockPlugin } from '@milkdown/plugin-block';
// import { math } from '@milkdown/plugin-math';
// import { gfm } from '@milkdown/preset-gfm';
// import io from 'socket.io-client';
// import React from 'react'
// import { insert, createNode } from '@milkdown/utils';
// import { history } from '@milkdown/plugin-history'
// import { upload, uploadPlugin, Uploader } from '@milkdown/plugin-upload';
// import type { Node } from 'prosemirror-model';

// let firstPage = '';
// // const url: string = 'ws://3.34.199.193:3000';
// const url: string = 'ws://localhost:3000';
// const socket = io(url, { 
//     transports: ["websocket"],
//     query: {
//         "userId": "ddong",
//         "pdfId": "pdf"
//     }
// });

// let timerId : NodeJS.Timeout
// export class WrapperMilkdown extends React.Component<{},{ fp: any, flag: boolean }> {
//     constructor(props: any) {
//         console.log('construct')
//         super(props);
//         this.state = {fp: {}, flag: false};
//         socket.on('connect',() => {
//             socket.once('updateEditorOnce', (value) => {
//                 this.setState({
//                     fp: value,
//                     flag: true
//                 })
//             })
//         })
//     }
//     render() {
//     // console.log('value in render:', this.state.fp, this.state.flag)
//       return (
//         <div>
//             {this.state.flag && <Milkdown value = {this.state.fp}/>}
//         </div>
//         )
//     };
//   }

// /* solution 2 */
// function updateEditor(userID : string, pdfID : string, value : any) {
//     timerId = setTimeout(() => {
//         socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value});
//         // alert("editor is updated.");
//     }, 700);
// }

// function getImageOrder() {
//     let images = document.getElementsByClassName('labelEditorImage')
//     console.log('# images :', images['length'], images[0])
    
//     for (let i = 0; i < images.length; i++) {
//         uploaded.set(images[i].getAttribute('title'), 'tempurl' + i.toString())
//         images[i].setAttribute('alt','y')
//     }
//     console.log('default images map : ', uploaded)
// }


// // const Image: FC = () => {
// //     const { node } = useNodeCtx();
// //     let title = Math.random().toString(36).substring(2, 11);
// //     return (
// //         <div className = {title}>
// //         <img
// //             src={node.attrs['src']}
// //             className={'labelEditorImage'}
// //             title={title}
// //             key = {title}
// //         />
// //         </div>
// //     );
// // };
// interface Props {
//     children: React.ReactNode;
// }

// let uploaded = new Map();
// let notuploaded = new Map();
// export const Milkdown: FC<{ value: JSONRecord }> = ({ value }) => {
//     console.log('in milk compo:', value)
//     const { editor, loading, getInstance } = useEditor((root, renderReact) => {
//                 // const nodes = commonmark
//                     // .configure(image, { view: renderReact(Image) })
//                     // .configure(paragraph, {
//                     //     className: () => {
//                     //         const title2 = Math.random().toString(36).substring(2, 11);
//                     //         return title2
//                     //     }
//                     // })
//                 const editor = Editor.make()
//                     .config((ctx) => {
//                         ctx.set(rootCtx, root);
//                         // 처음 생성된 editor라면 빈 화면 생성
//                         // 그게 아니라면 JSON형식으로 DB에서 불러들임
//                         if (value) {
//                             ctx.set(defaultValueCtx, {
//                                 type: "json",
//                                 value: value,
//                             });
//                         } else {
//                             ctx.set(defaultValueCtx, '');
//                         }
//                         ctx.get(listenerCtx).updated((ctx, doc, prevDoc) => {
//                                 let jsonOutput = doc.toJSON();
//                                 let arrOutput = jsonOutput.content;
//                                 console.log('doc?',doc);
                                
//                                 // let images = document.getElementsByClassName('labelEditorImage')
//                                 // console.log('# images :', images['length'], images[0])

//                                 // for (let i = 0; i < images.length; i++) {
//                                 //     const title : any = images[i].getAttribute('title');
//                                 //     console.log('title!',uploaded.get(title))
//                                 //     if(!uploaded.get(title)) {
//                                 //         console.log('ㅈㄸ')
//                                 //     }
//                                 // }
//                                 console.log('default images map : ', uploaded)

//                                 console.log('json output', arrOutput, 'prevDoc', prevDoc?.toJSON())
//                                 for (let i = 0; i < arrOutput.length; i++) {
//                                     // console.log(arrOutput[i].content.length)
//                                     // html상 dom을 바꿔도 doc는 바뀌지 않는다. 다른것으로 생각해야함. 그냥 배열같은거에 저장을 해둬야겠다.
//                                     // 그리고 항상 사진은 여러개가 들어오더라도 연속적으로 들어온다.
//                                     // 한 블록안에 여러개의 이미지를 넣는 경우 생각해야함
//                                     if (arrOutput[i].content) {
//                                         for (let j = 0; j < arrOutput[i].content.length; j++) {
//                                             let contentInDoc = arrOutput[i].content[j]
//                                             let contentInDocType = contentInDoc['type']
//                                             let contentAttr = contentInDoc['attrs']
//                                             console.log('contentAttr',contentAttr)
//                                             if (contentAttr !== undefined)
//                                                 contentAttr['title'] = 'try'
//                                             if (contentInDocType === 'image') {
//                                                 console.log('contentAttr',contentAttr['alt']);
//                                                 console.log('it is alread loaded!!');
//                                             }
//                                             console.log(arrOutput[i], contentInDoc, contentInDocType);
//                                         }
//                                     }
//                                 }

//                                 const userID = 'ddong';
//                                 const pdfID = 'pdf';
//                                 // console.log('input value:', value)
//                                 /* solution 2 */
//                                 if (timerId) {
//                                     clearTimeout(timerId);
//                                     updateEditor(userID, pdfID, jsonOutput)
//                                     console.log('clear')
//                                 } else {
//                                     updateEditor(userID, pdfID, jsonOutput)
//                                     console.log('update')
//                                 }
//                                 /* solution 1 */
//                                 // socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value});
//                                 return value;
                            
                            
//                             // 서버로 전송한 이미지는 tag uploadCheck 특성과 값 'y' 추가
                            
                            
//                         });
//                     })
//                     .use(block.configure(blockPlugin, {
//                         configBuilder: (ctx) => {
//                             return [/* your actions */];
//                         }
//                     }))
//                     .use(nord)
//                     // .use(nodes)
//                     // .use(commonmarkPlugins)
//                     .use(gfm)
//                     // .use(math)
//                     // .use(tooltip)
//                     // .use(prism)
//                     .use(listener)
//                     // .use(history).use(commonmark).use(
//                     //     upload.configure(uploadPlugin, {
//                     //         uploader,
//                     //     }),
//                     // ).create()
//                     // editor.action(insert('# Hello Macro'));
//                     return editor
//         })
//         useEffect(() => {
//             // setTimeout(() => {
//             //     getImageOrder();
//             //     let target = document.getElementsByClassName('image-container');
//             //         for (let j = 0; j < target.length; j++) {
//             //             let imageTag = target[j].getElementsByTagName('img');
//             //             console.log('imageTag: ', imageTag);
//             //             imageTag[0].setAttribute('alt','y')
//             //             // console.log('child tag: ', target[0].getElementsByTagName('img'))
//             //         }
//             //         console.log('target: ', target);
//             //   }, 0);
//         }, []);
    
//     return <ReactEditor editor={editor} />
// };