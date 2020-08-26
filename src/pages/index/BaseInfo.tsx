import React, { useContext, useEffect, useState } from 'react';
import {
  Input,
  Form,
  InputNumber,
  Radio,
  Button,
  Space,
  TreeSelect,
} from 'antd';
const TreeNode = TreeSelect.TreeNode;

enum PosterTypeEnum {
  名片海报,
  产品海报,
  案例海报,
  专属海报,
  通用海报,
}
interface Props {
  nextStep: (values: any) => void;
  initailData?: any;
}
const BaseInfo: React.FC<Props> = props => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);
  const nextStep = () => {
    form
      .validateFields()
      .then(values => {
        props.nextStep(values);
      })
      .catch(err => {});
  };
  const loop = tree => {
    return tree.map((item, i) => (
      <TreeNode
        key={item.posterTypeId}
        value={item.posterTypeId}
        title={item.typeName}
      >
        {item.childTypes && item.childTypes.length
          ? loop(item.childTypes)
          : undefined}
      </TreeNode>
    ));
  };
  useEffect(() => {
    form.setFieldsValue(props.initailData);
  }, [props.initailData]);
  return (
    <div>
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item
          name="posterName"
          label="海报名称"
          rules={[{ required: true, message: '海报名称必填' }]}
        >
          <Input
            placeholder="请输入海报名称，最多10个字符"
            maxLength={10}
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item
          name="posterTypeId"
          label="海报类型"
          rules={[{ required: true, message: '请选择海报类型' }]}
        >
          <TreeSelect
            showSearch
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            allowClear
            treeDefaultExpandAll
          >
            {loop(treeData)}
          </TreeSelect>
          {/* <EnumSelect enum={PosterTypeEnum} style={{ width: 300 }} /> */}
        </Form.Item>
        <Form.Item
          name="sort"
          label="海报排序"
          rules={[{ required: true, message: '海报排序必填' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="state"
          label="是否启用"
          rules={[{ required: true, message: '请选择是否启用' }]}
        >
          <Radio.Group>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space align="center">
            <Button onClick={() => nextStep()}>下一步</Button>
            <Button onClick={() => {}}>返回</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default BaseInfo;
