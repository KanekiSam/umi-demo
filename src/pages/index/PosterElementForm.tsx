import React, { Key, useEffect } from 'react';
import { Form, Button, Input, Card, Select } from 'antd';
import { PosterElementEnum } from './PosterElement';
import { CompactPicker } from 'react-color';
import UploadForm from './UploadForm';
import { FontJson } from './FontJson';

const CompactPickerForm = (props: { value?: string; onChange?: Function }) => {
  return (
    <CompactPicker color={props.value} onChangeComplete={({ hex }) => props.onChange?.(hex)} />
  );
};
interface Props {
  type: Key;
  onValueChange: Function;
  deleteElement: (type: Key) => void;
  initialValues: any[];
}
const PosterElementForm: React.FC<Props> = ({
  type,
  onValueChange,
  deleteElement,
  initialValues,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    const values = initialValues.find((item) => item.posterComponentId == type);
    form.setFieldsValue(values?.compValue ?? {});
  }, [initialValues]);
  const fontLists = Object.keys(FontJson).map((key) => ({ label: key, value: FontJson[key] }));
  return (
    <div title={PosterElementEnum[type]} style={{ display: type ? '' : 'none' }}>
      <Form
        form={form}
        onValuesChange={(values) => {
          onValueChange({ ...values, type });
        }}
        labelCol={{ span: 6 }}
      >
        {[PosterElementEnum.二维码, PosterElementEnum.图片, PosterElementEnum.客户头像].indexOf(
          +type,
        ) > -1 && (
          <Form.Item label="图片" name="picUrl">
            <UploadForm />
          </Form.Item>
        )}
        {[
          PosterElementEnum.个性签名,
          PosterElementEnum.姓名,
          PosterElementEnum.客户名称,
          PosterElementEnum.手机,
          PosterElementEnum.自定义文字,
          PosterElementEnum.邮箱,
        ].indexOf(+type) > -1 && (
          <div style={{}}>
            <Form.Item label="文字颜色" name="fontColor">
              <CompactPickerForm />
            </Form.Item>
            <Form.Item label="文字内容" name="textContent" initialValue={PosterElementEnum[+type]}>
              <Input
                disabled={
                  [
                    PosterElementEnum.姓名,
                    PosterElementEnum.客户名称,
                    PosterElementEnum.手机,
                    PosterElementEnum.邮箱,
                  ].indexOf(+type) > -1
                }
              />
            </Form.Item>
            <Form.Item label="文字大小" name="fontSize">
              <Input suffix="px" />
            </Form.Item>
            <Form.Item label="文字字体" name="fontFamiliy">
              <Select>
                {fontLists.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="对其方式" name="align">
              <Select>
                <Select.Option value="1">居左</Select.Option>
                <Select.Option value="2">居右</Select.Option>
              </Select>
            </Form.Item>
          </div>
        )}
      </Form>
    </div>
  );
};
export default PosterElementForm;
