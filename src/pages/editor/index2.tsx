import React, { useState, useEffect, useRef } from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import styles from './index.less';
import { Button, Input } from 'antd';
import { ContentUtils } from 'braft-utils';
import {
  blockExportFn,
  blockImportFn,
  blockRendererFn,
  TemplateBlock,
} from './templateBlock';

const entityExtension = editorState => ({
  type: 'entity',
  name: 'DELETE-BLOCK',
  // control: {
  //   text: '可删除',
  // },
  data: {
    key: 'hello',
  },
  // 指定entity在编辑器中的渲染组件
  component: props => {
    // 通过entityKey获取entity实例，关于entity实例请参考https://github.com/facebook/draft-js/blob/master/src/model/entity/DraftEntityInstance.js
    const entity = props.contentState.getEntity(props.entityKey);
    // 通过entity.getData()获取该entity的附加数据
    const { key } = entity.getData();
    console.log(props);
    return (
      <div data-key={key} className="delete-block">
        {/* <span
          className="delete-btn"
          style={{ color: 'red' }}
          onClick={() => {
            console.log(112312);
            ContentUtils.removeBlock(editorState, props.children.block);
          }}
        >
          删除
        </span> */}
        {props.children}
      </div>
    );
  },
  importer: (nodeName, node, source) => {
    // source属性表明输入来源，可能值为create、paste或undefined
    // console.log(source);
    if (
      nodeName.toLowerCase() === 'div' &&
      node.classList &&
      node.classList.contains('delete-block')
    ) {
      // 此处可以返回true或者一个包含mutability和data属性的对象
      return {
        mutability: 'MUTABLE',
        data: {
          key: node.dataset.key,
        },
      };
    }
  },
  exporter: (entityObject, originalText) => {
    // 注意此处的entityObject并不是一个entity实例，而是一个包含type、mutability和data属性的对象
    const { key } = entityObject.data;
    console.log(entityObject);
    return (
      <span data-key={key} className="delete-block">
        {/* <span
          className="delete-btn"
          style={{ color: 'red' }}
          onClick={() => {
            console.log(7777777);
          }}
        >
          删除
        </span> */}
        <TemplateBlock>{originalText}</TemplateBlock>
      </span>
    );
  },
});
const colorImportant = {
  type: 'inline-style',
  name: 'WORD-IMPORTANT',
  style: {
    color: 'red',
  },
  importer: (nodeName, node) => {
    // 指定html转换为editorState时，何种规则的内容将会附加上该扩展样式
    // 如果编辑器在createEditorState时使用的是RAW数据，并且开启了stripPastedStyles，则可以不指定importer，因为不存在html转editorState的场景
    return (
      nodeName === 'span' &&
      [].find.call(node.style, styleName => styleName.indexOf('color') !== -1)
    );
  },
  exporter: () => {
    // 指定该样式在输出的html中如何呈现，对于inline-style类型的扩展可以不指定exporter，输出样式即为该扩展的style
    return (
      <span
        style={{
          color: 'red',
        }}
      />
    );
  },
};
BraftEditor.use(entityExtension);
BraftEditor.use(colorImportant);
export default props => {
  const editorInstance = useRef(null);
  const [keyword, setKeyword] = useState();
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(
      `<div class="my-template" data-b="hahah"><ul><li><strong>客户姓名：</strong></li><li><strong>客户电话： </strong></li><li><strong>访谈内容 </strong></li><li><strong>会议纪要</strong></li></ul></div><p></p><div class="my-template" data-b="hahah">hellow-world</div><p></p>`,
      { blockImportFn, blockExportFn },
    ),
  );

  const handleEditorChange = v => {
    setEditorState(v);
  };
  const submitContent = () => {};
  const add = () => {
    setEditorState(
      ContentUtils.insertHTML(
        editorState,
        '<div class="module-wrapper"><p></p><div class="delete-btn DraftStyleDefault-block" data-type="1">12</div>Hello World!</div><div>874583475</div><p></p>',
      ),
    );
  };
  useEffect(() => {
    console.log(ContentUtils);
  }, []);
  useEffect(() => {
    // console.log(ContentUtils.getSelectedBlocks(editorState));
    console.log(
      'editorState',
      BraftEditor.createEditorState(editorState).toHTML({
        blockImportFn,
        blockExportFn,
      }),
    );
    // const arrs = document.getElementsByClassName('delete-btn');
    // if (arrs.length) {
    //   for (var i in arrs) {
    //     const item = arrs[i];
    //     if (item.addEventListener) {
    //       item.addEventListener('click', e => {
    //         const key = e.target.parentNode.getAttribute('data-key');
    //         console.log(key);
    //         e.target.parentNode.parentNode.remove(e.target.parentNode);
    //         // ContentUtils.forceRender(editorState)
    //         console.log(editorInstance.current.getDraftInstance());
    //         // ContentUtils.removeBlock(editorState, {
    //         //   getKey: () => key,
    //         //   getLength: () => 6,
    //         // });
    //       });
    //     }
    //   }
    // }
  }, [editorState]);
  const toggleInlineStyle = inlineStyle => {
    console.log(ContentUtils);
    // handleEditorChange(
    //   ContentUtils.toggleInlineStyle(editorState, inlineStyle),
    // );
  };
  return (
    <div className={styles.contaniner}>
      <div className={styles.moduleBar}></div>
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
        ref={editorInstance}
        extendControls={[
          {
            key: 'my-button', // 控件唯一标识，必传
            type: 'button',
            // title: '这是一个自定义的按钮', // 指定鼠标悬停提示文案
            className: 'my-button', // 指定按钮的样式名
            html: null, // 指定在按钮中渲染的html字符串
            text: '客户模板', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
            onClick: () => {
              setEditorState(
                ContentUtils.insertAtomicBlock(
                  editorState,
                  'block-template',
                  true,
                  {
                    b: 67676,
                    data_b: 3127312,
                    dataB: 666,
                    data: { b: 7878 },
                    keyword,
                    text: '我是一个粉刷家粉刷本领强',
                  },
                ),
                // ContentUtils.insertHTML(
                //   editorState,
                //   '<div class="delete-block">Hello World!!</div><p></p>',
                // ),
              );
            },
          },
          {
            key: 'search-box',
            type: 'button',
            className: 'search-box',
            text: (
              <Input.Search
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onSearch={v => {
                  // console.log(v);
                  // let str = BraftEditor.createEditorState(editorState).toHTML({
                  //   blockImportFn,
                  //   blockExportFn,
                  // });
                  // // toggleInlineStyle('WORD-IMPORTANT');
                  // str = str.replaceAll('color:red', '');
                  // console.log('str', str);
                  // if (v) {
                  //   str = str.replaceAll(
                  //     v,
                  //     `<span class="red" style="color:red">${v}</span>`,
                  //   );
                  // }
                  // setEditorState(
                  //   BraftEditor.createEditorState(str, {
                  //     blockImportFn,
                  //     blockExportFn,
                  //   }),
                  // );
                }}
              />
            ),
          },
        ]}
        blockRendererFn={blockRendererFn}
        converts={{ blockImportFn, blockExportFn }}
      />
    </div>
  );
};
