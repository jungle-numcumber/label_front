/* Copyright 2021, Milkdown by Mirone. */

import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { codeFence as cmCodeFence, commonmark, image, link, commonmarkNodes, commonmarkPlugins, blockquote, SupportedKeys  } from '@milkdown/preset-commonmark';
import { Node } from '@milkdown/prose/model';
import { ReactEditor, useEditor, useNodeCtx } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { FC, ReactNode, useEffect } from 'react';
import { CodeFence } from './CodeFence';
import { codeFence } from './CodeFence/codeFence.node';
import { Image } from './Image';
import { block, blockPlugin } from '@milkdown/plugin-block';
import { math } from '@milkdown/plugin-math';
import { gfm } from '@milkdown/preset-gfm';
import io from 'socket.io-client';
import React from 'react'

let firstPage = '';
const url: string = 'ws://localhost:3000';
const socket = io(url, { 
    transports: ["websocket"],
    query: {
        "userId": "ddong",
        "pdfId": "pdf"
    }
});
let timerId : NodeJS.Timeout
export class WrapperMilkdown extends React.Component<{},{ fp: string, flag: boolean }> {
    constructor(props: any) {
        console.log('construct')
        super(props);
        this.state = {fp: '', flag: false};
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
    console.log('value in render:', this.state.fp, this.state.flag)
      return (
        <div>
            {this.state.flag && <Milkdown value = {this.state.fp}/>}
        </div>
        )
    };
  }

/* solution 2 */
function updateEditor(userID : string, pdfID : string, value : string) {
    timerId = setTimeout(() => {
        socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value});
        alert("editor is updated.");
    }, 700);
}
const Link: FC<{ children: ReactNode }> = ({ children }) => {
    const { node } = useNodeCtx();
    return (
        <a className="my-title" href={node.attrs['href']} title={node.attrs['tittle']}>
            {children}
        </a>
    );
};

export const Milkdown: FC<{ value: string }> = ({ value }) => {
    console.log('in milk compo:', value)
    const { editor, loading, getInstance } = useEditor((root, renderReact) => {
        const nodes = commonmark
                    .configure(image, { view: renderReact(Image) })
                    .configure(link, { view: renderReact(Link) })
                    .replace(cmCodeFence, codeFence(renderReact<Node>(CodeFence, { as: 'section' }))());
                const node2 = commonmarkNodes.configure(blockquote, {
                    keymap: {
                        [SupportedKeys.Blockquote]: 'Mod-Shift-b',
                        // or you may want to bind multiple keys:
                        [SupportedKeys.Blockquote]: ['Mod-Shift-b', 'Mod-b'],
                    },
                }); 
                const editor = Editor.make()
                    .config((ctx) => {
                        console.log('defaultValueCtx:', 'hey');
                        ctx.set(rootCtx, root);
                        ctx.set(defaultValueCtx, value);
                        ctx.get(listenerCtx).markdownUpdated((_, value) => {
                            const userID = 'ddong';
                            const pdfID = 'pdf';
                            console.log('input value:', value)
                            /* solution 2 */
                            if (timerId) {
                                clearTimeout(timerId);
                                updateEditor(userID, pdfID, value)
                                console.log('clear')
                            } else {
                                updateEditor(userID, pdfID, value)
                                console.log('update')
                            }
                            /* solution 1 */
                            // socket.emit("updateEditor", {id: userID, pdfId: pdfID, text: value});
                            return value;
                        });
                    })
                    .use(block.configure(blockPlugin, {
                        configBuilder: (ctx) => {
                            return [/* your actions */];
                        }
                    }))
                    .use(nord)
                    // .use(node2)
                    // .use(commonmarkPlugins)
                    .use(gfm)
                    .use(math)
                    .use(tooltip)
                    .use(prism)
                    .use(listener)

                    return editor
        })
        useEffect(() => {
        }, [value]);
    
    return <ReactEditor editor={editor} />
};