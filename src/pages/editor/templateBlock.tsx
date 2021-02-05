import React from 'react';
import { ContentUtils } from 'braft-utils';

interface Props {}
const TemplateBlock: React.FC<any> = props => {
  const blockData = props.contentState
    .getEntity(props.block.getEntityAt(0))
    .getData();
  //   const dataB = blockData.get('dataB');
  //   const text = blockData.get('text');
  console.log('blockData', blockData);
  const removeBarBlock = () => {
    props.blockProps.editor.setValue(
      ContentUtils.removeBlock(props.blockProps.editorState, props.block),
    );
  };
  return (
    <div className="template-block">
      <button className="button-remove" onClick={removeBarBlock}>
        <i className="bfi-bin"></i>
      </button>
      {/* <h2>{`Hello ${dataB}!`}</h2> */}
      {/* <p>{blockData.dataB}</p> */}
      <p>
        {blockData.keyword
          ? blockData.text.replaceAll(
              blockData.keyword,
              `<span class="red">${blockData.keyword}</span>`,
            )
          : blockData.text}
        {/* <input name="123" /> */}
      </p>
    </div>
  );
};
const TemplateBlock2: React.FC<any> = props => {
  const blockData = props.block.getData();
  const dataB = blockData.get('dataB');
  const text = blockData.get('text');
  console.log('blockData', dataB);
  const removeBarBlock = () => {
    props.blockProps.editor.setValue(
      ContentUtils.removeBlock(props.blockProps.editorState, props.block),
    );
  };
  return (
    <div className="template-block">
      <button className="button-remove" onClick={removeBarBlock}>
        <i className="bfi-bin"></i>
      </button>
      {/* <h2>{`Hello ${dataB}!`}</h2> */}
      {/* <p>{blockData.dataB}</p> */}
      <p>
        {text}
        {/* <input name="123" /> */}
      </p>
    </div>
  );
};
const blockRendererFn = (block, { editor, editorState }) => {
  // console.log(editorState.toRow());
  if (block.type === 'block-template') {
    return {
      component: TemplateBlock2,
      editable: true, // 此处的editable并不代表组件内容实际可编辑，强烈建议设置为false
      props: { editor, editorState }, // 此处传入的内容可以在组件中通过this.props.blockProps获取到
    };
  }
  if (block.getType() === 'atomic') {
    const entity = editorState
      .getCurrentContent()
      .getEntity(block.getEntityAt(0));
    if (entity.getType() === 'block-template') {
      return {
        component: TemplateBlock,
        editable: true, // 此处的editable并不代表组件内容实际可编辑，强烈建议设置为false
        props: { editor, editorState }, // 此处传入的内容可以在组件中通过this.props.blockProps获取到
      };
    }
  }
  // 不满足block.getType() === 'block-bar'的情况时请勿return任何内容以免造成其他类型的block显示异常
};
const blockImportFn = (nodeName, node) => {
  if (nodeName === 'div' && node.classList.contains('my-template')) {
    const text = node.innerText;
    const dataB = node.dataset.b;
    return {
      type: 'block-template',
      data: {
        text: text,
        dataB: dataB,
      },
    };
  }
};
const blockExportFn = (contentState, block) => {
  if (block.type === 'block-template') {
    const obj = block.data;
    return {
      start: `<div class="my-template" data-b="${obj.dataB}">`,
      end: '</div>',
      text: obj.text,
    };
  }
  if (block.type === 'atomic') {
    let range = block.entityRanges.length > 0 ? block.entityRanges[0] : -1;
    if (range != -1) {
      const entity = contentState.getEntity(
        contentState.getBlockForKey(block.key).getEntityAt(0),
      );
      if (entity.getType() === 'block-template') {
        //   if (block.type === 'block-template') {
        const obj = entity.getData();
        console.log(obj);
        // return {
        //   start: `<div class="my-template" data-b="${obj.dataB}">`,
        //   end: '</div>',
        // };
        return (
          <div className="my-template" data-b={obj.dataB}>
            <p>
              {obj.keyword
                ? obj.text.replaceAll(
                    obj.keyword,
                    `<span class="red">${obj.keyword}</span>`,
                  )
                : obj.text}
            </p>
          </div>
        );
      }
    }
  }
};
export { blockExportFn, blockImportFn, blockRendererFn, TemplateBlock };
