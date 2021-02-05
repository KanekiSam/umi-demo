import React, { useRef, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import E, { $ } from 'wangeditor';
import CustomerMenu, { showTooltip } from './CustomerMenu';
import styles from './index.less';
import jquery from 'jquery';

interface Props {}
const WangEditorComponent: React.FC<Props> = props => {
  const editor = useRef<any>(null);
  const [editorContent, setEditorContent] = useState('');
  const [target, setTarget] = useState();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [keyword, setKeyword] = useState();
  useEffect(() => {
    editor.current = new E('#content');
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.current.config.onchange = html => {
      console.log(editor.current.txt.html());
      setEditorContent(editor.current.txt.html());
    };
    editor.current.config.height = window.innerHeight - 180;
    editor.current.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ];
    const menuKey = 'template'; // 菜单 key ，各个菜单不能重复
    editor.current.menus.extend(menuKey, CustomerMenu);
    // editor.current.config.menus = editor.current.config.menus.concat(menuKey);
    editor.current.create();
    editor.current.txt.html(editorContent);
    const $textElem = editor.current.$textElem;
    $textElem.on('click', e => {
      console.log('click');
      // 存储代码元素
      let $template = null;

      const target = e.target;
      let $target = $(target);
      console.log(target, $target);
      const getParent = t => {
        console.log(t.parentNode);
        $target = $(t);
        if (
          $target.getNodeName() === 'DIV' &&
          $target.elems[0].getAttribute('class') === 'wxtext'
        ) {
          console.log('get', $target);
          $template = $target;
          setTarget($target);
          //   $target.remove();
        } else if (
          t.parentNode.classList &&
          !t.parentNode.classList.contains('w-e-text')
        ) {
          getParent(t.parentNode);
        }
      };
      getParent(target);
      //   if (
      //     $target.getNodeName() === 'DIV' &&
      //     $target.elems[0].getAttribute('class') === 'wxtext'
      //   ) {
      //     $template = $target;
      //   }
      console.log('$template', $template);
      if ($template == null) {
        // hideLinkTooltip();
        setVisible(false);
        return;
      }
      //   if (!editor.current.txt.eventHooks.templateClickEvents) {
      //     editor.current.txt.eventHooks.templateClickEvents = [];
      //   }
      //   const templateClickEvents =
      //     editor.current.txt.eventHooks.templateClickEvents;
      //   templateClickEvents.forEach(fn => fn($template));
    });
    const hideLinkTooltip = () => {
      console.log('remove');
      // 移除 tooltip
      setTarget(undefined);
      setVisible(false);
    };

    // editor.current.txt.eventHooks.clickEvents.push(() => {
    //   if (!target) {
    //     setVisible(false);
    //   }
    // });
    // editor.current.txt.eventHooks.keyupEvents.push(() => {
    //   if (!target) {
    //     setVisible(false);
    //   }
    // });
    editor.current.txt.eventHooks.toolbarClickEvents.push(hideLinkTooltip);
    editor.current.txt.eventHooks.menuClickEvents.push(hideLinkTooltip);
    editor.current.txt.eventHooks.textScrollEvents.push(hideLinkTooltip);
  }, []);

  const addContent = () => {
    editor.current.cmd.do(
      'insertHTML',
      `<div class="wxtext"><p><ul><li><font size="5">客户名称</font></li><li><font size="5">客户电话</font></li><li><font size="5">客户联系地址</font></li></ul></p></div>`,
    );
    // const ls = document.getElementsByClassName('wxtext');
    // for (var i in ls) {
    //   const item = ls[i];
    //   if (item.addEventListener) {
    //     item.addEventListener('click', e => {
    //       //   e.preventDefault();
    //       //   e.stopPropagation();
    //       console.log('show', target);
    //       setVisible(true);
    //       //   console.log(e.target.getBoundingClientRect)
    //       setPosition({ left: e.pageX, top: e.pageY });
    //       //   if (!editor.current.txt.eventHooks.templateClickEvents) {
    //       //     editor.current.txt.eventHooks.templateClickEvents = [];
    //       //   }
    //       //   editor.current.txt.eventHooks.templateClickEvents.push($template => {
    //       //     $template.remove();
    //       //   });
    //     });
    //   }
    // }
    // console.log(jquery('.wxtext'));
    // jquery('.wxtext').on('click', e => {
    //   console.log(e);
    //   setVisible(false);
    // });

    jquery('.wxtext li').on('click', e => {
      e.preventDefault();
      //   e.stopPropagation();
      console.log('CLICK', e);
      console.log(visible);
      setVisible(state => !state);
      setPosition({ left: e.pageX, top: e.pageY + 10 });
    });
  };
  return (
    <div>
      <Button onClick={() => addContent()}>添加一个内容</Button>
      <Input.Search
        style={{ width: 200 }}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onSearch={e => {
          const str = editor.current.txt.html();
          console.log(str);
        //   var regex = /<(?<HtmlTag>[\w]+)[^>]*\s[iI][dD]=(?<Quote>["']?)footer(?(Quote)\k<Quote>)[^>]*?(/>|>((?<Nested><\k<HtmlTag>[^>]*>)|</\k<HtmlTag>>(?<-Nested>)|.*?)*</\k<HtmlTag>>)/;
          if (keyword) {
            editor.current.txt.html(
              str.replaceAll(
                keyword,
                `<span style="color:red;">${keyword}</span>`,
              ),
            );
          } else {
            editor.current.txt.html(
              str.replaceAll(
                `<span style="color:red;">${keyword}</span>`,
                keyword,
              ),
            );
          }
        }}
      />
      <div id="content"></div>
      {target && (
        <div
          className={styles.tooltip}
          style={{
            left: position.left,
            top: position.top,
            display: visible ? 'block' : 'none',
          }}
        >
          <div
            className={styles.btn}
            onClick={() => {
              console.log(target);
              if (target) {
                target.remove();
                setTarget(undefined);
              }
            }}
          >
            删除
          </div>
        </div>
      )}
    </div>
  );
};
export default WangEditorComponent;
