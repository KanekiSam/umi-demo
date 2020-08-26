import React, { Key, useState, useEffect, useRef } from 'react';
import { Form, Button, Space, Modal, message } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import html2canvas from 'html2canvas';
import DropItem from './DropItem';
import PosterElementForm from './PosterElementForm';
import styles from './index.less';
import UploadForm from './UploadForm';
import PreviewModal from './PreviewModal';

export const ItemTypes = {
  COMP: 'posterEle',
};
export enum PosterElementEnum {
  二维码 = 1,
  客户名称,
  客户头像,
  图片,
  自定义文字,
  姓名,
  手机,
  邮箱,
  个性签名,
}
const DragItem: React.FC<{
  item: any;
  value: Key[];
  onDelete: (type: Key) => void;
  setActiveId: Function;
}> = ({ item, value, onDelete, setActiveId }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { ...item, type: ItemTypes.COMP },
    collect: monitor => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });
  const active = value.find(
    obj => obj.posterComponentId == item.posterComponentId,
  );
  return (
    <div
      ref={dragRef}
      style={{ opacity }}
      className={`${styles.element} ${active ? styles.active : ''}`}
      onClick={() => {
        if (active) {
          setActiveId(item.posterComponentId);
        }
      }}
    >
      {active && (
        <div
          title="删除"
          className={styles.deleteIcon}
          onClick={e => {
            e.stopPropagation();
            onDelete(item.posterComponentId);
          }}
        >
          <CloseOutlined />
        </div>
      )}
      {item.componentName}
    </div>
  );
};
interface ElementsProps {
  elements: any[];
  value?: Key[];
  onChange?: Function;
  onDeleteElement: (type: Key) => void;
  setActiveId: Function;
}
const Elements: React.FC<ElementsProps> = ({
  elements,
  value = [],
  onChange,
  onDeleteElement,
  setActiveId,
}) => {
  return (
    <div>
      {elements.map(item => (
        <DragItem
          key={item.posterComponentId}
          item={item}
          value={value}
          onDelete={onDeleteElement}
          setActiveId={setActiveId}
        />
      ))}
    </div>
  );
};

interface Props {
  prevStep: Function;
  step1Data: any;
  initialData: any;
}
const screenWidth = 375;
const screenHight = 667;
const PosterElement: React.FC<Props> = props => {
  const [elements, setElements] = useState([
    { posterComponentId: PosterElementEnum.二维码, componentName: '二维码' },
    { posterComponentId: PosterElementEnum.姓名, componentName: '姓名' },
    {
      posterComponentId: PosterElementEnum.客户头像,
      componentName: '客户头像',
    },
    {
      posterComponentId: PosterElementEnum.自定义文字,
      componentName: '自定义文字',
    },
    { posterComponentId: PosterElementEnum.手机, componentName: '手机' },
  ]);
  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    const posterElement = form.getFieldValue('posterElement') || [];
    form.setFieldsValue({
      posterElement: data.map(item => {
        const obj = posterElement.find(
          ele => ele.posterComponentId == item.posterComponentId,
        );
        if (obj) {
          return {
            ...obj,
            ...item,
          };
        }
        return item;
      }),
    });
  }, [data]);
  const [url, setUrl] = useState('');
  const onPreview = () => {
    return new Promise((r, j) => {
      setActiveId(undefined);
      setTimeout(() => {
        const targetRef = document.getElementById('targetRef');
        if (targetRef) {
          html2canvas(targetRef)
            .then(canvas => {
              setUrl(canvas.toDataURL());
              r(true);
            })
            .catch(err => j(err));
        } else {
          j('找不到id为targetRef的元素');
        }
      }, 0);
    });
  };
  const [loading, setLoading] = useState(false);
  const handleSave = values => {};
  const onDeleteElement = (type: Key) => {
    setData(data.filter(item => item.posterComponentId != type));
    setActiveId(undefined);
  };
  useEffect(() => {
    form.setFieldsValue(props.initialData);
    setData(props.initialData?.posterElement ?? []);
  }, [props.initialData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.posterElement}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          className={styles.formRight}
          onFinish={values => {
            handleSave(values);
          }}
        >
          <Space align="start">
            <Form.Item noStyle shouldUpdate>
              {() => (
                <div
                  style={{
                    width: screenWidth,
                    height: screenHight,
                    border: '1px solid #efefef',
                  }}
                >
                  <DropItem
                    data={data}
                    setData={v => setData(v)}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    form={form}
                  />
                </div>
              )}
            </Form.Item>
            <div style={{ width: 500 }}>
              <Form.Item
                label="背景图片"
                name="backgroundImage"
                rules={[{ required: true, message: '请上传背景图片' }]}
              >
                <UploadForm />
              </Form.Item>
              <Form.Item
                label="海报元素"
                name="posterElement"
                rules={[{ required: true, message: '请选择海报元素' }]}
              >
                <Elements
                  elements={elements}
                  onDeleteElement={onDeleteElement}
                  setActiveId={setActiveId}
                />
              </Form.Item>
              {data.map((item, i) => (
                <div
                  style={{
                    display: activeId == item.posterComponentId ? '' : 'none',
                  }}
                  key={i}
                >
                  <PosterElementForm
                    type={item.posterComponentId}
                    deleteElement={onDeleteElement}
                    initialValues={props.initialData?.posterElement ?? []}
                    onValueChange={values => {
                      const posterElement =
                        form.getFieldValue('posterElement') || [];
                      form.setFieldsValue({
                        posterElement: posterElement.map(item => {
                          if (item.posterComponentId == values.type) {
                            return {
                              ...item,
                              compValue: {
                                ...item.compValue,
                                ...values,
                              },
                            };
                          }
                          return item;
                        }),
                      });
                    }}
                  />
                </div>
              ))}
              <div style={{ textAlign: 'center' }}>
                <Space align="center">
                  <Button onClick={() => props.prevStep()}>上一步</Button>
                  <Button htmlType="submit" loading={loading}>
                    确定
                  </Button>
                  <PreviewModal url={url} onClick={onPreview}>
                    <Button>预览</Button>
                  </PreviewModal>
                  <Button
                    onClick={() => {
                      // posterEditContext.back();
                    }}
                  >
                    取消
                  </Button>
                </Space>
              </div>
            </div>
          </Space>
        </Form>
      </div>
    </DndProvider>
  );
};
export default PosterElement;
