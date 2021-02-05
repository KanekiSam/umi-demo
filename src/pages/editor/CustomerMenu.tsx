import E from 'wangeditor';
const { $ } = E;
const {
  BtnMenu,
  DropListMenu,
  PanelMenu,
  DropList,
  Panel,
  Tooltip,
} = E.menuConstructors;
export const showTooltip = editor => $template => {
  console.log($template);
  const conf = [
    {
      $elem: $(
        `<span>${editor.i18next.t('menus.panelMenus.template.删除')}</span>`,
      ),
      onClick: (editor, $template) => {
        $template.remove();
        return true;
      },
    },
  ];
  console.log(Tooltip);
  let tooltip = new Tooltip(editor, $template, conf);
  tooltip.create();
  const hideLinkTooltip = () => {
    // 移除 tooltip
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  };

  editor.txt.eventHooks.clickEvents.push(hideLinkTooltip);
  editor.txt.eventHooks.keyupEvents.push(hideLinkTooltip);
  editor.txt.eventHooks.toolbarClickEvents.push(hideLinkTooltip);
  editor.txt.eventHooks.menuClickEvents.push(hideLinkTooltip);
  editor.txt.eventHooks.textScrollEvents.push(hideLinkTooltip);
};
class CustomerMenu extends BtnMenu {
  constructor(editor) {
    const $elem = E.$(
      `<div class="w-e-template">
            <button>客户数据</button>
        </div>`,
    );
    super($elem, editor);
    this.editor = editor;
  }
  // 菜单点击事件
  clickHandler() {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    this.editor.cmd.do(
      'insertHTML',
      `<div class="wxtext"><p><ul><li><font size="5">客户名称</font></li><li><font size="5">客户电话</font></li><li><font size="5">客户联系地址</font></li></ul></p></div>`,
    );

    // alert("hello world");
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive() {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    this.active();
    // this.editor.txt.eventHooks.templateClickEvents = [];
    // this.editor.txt.eventHooks.templateClickEvents.push(showTooltip(this.editor));

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}
export default CustomerMenu;
