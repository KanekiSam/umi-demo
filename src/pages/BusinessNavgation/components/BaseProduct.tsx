import React, { useState, useEffect, Key } from 'react';
import { Collapse, Button, Space, Card, Input, Spin } from 'antd';
import { UpOutlined, SearchOutlined } from '@ant-design/icons';
import { data } from './data';
import styles from '../index.less';
import Flow from './ProcessFlow/Flows';
const { Panel } = Collapse;

interface Props {}
const BaseProduct: React.FC<Props> = props => {
  // 选中的一级
  const [activeTab, setActiveTab] = useState<Key>();
  // 选中的二级
  const [activekey, setActivekey] = useState<Key>();
  // 选中的三级
  const [subActiveKey, setSubActiveKey] = useState<Key>();
  // 选中的产品
  const [active, setActive] = useState<
    { id: string; name: string; type: any } | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState<string | undefined>();
  // 控制展示面板
  const [showPanel, setShowPanel] = useState<Key>();
  useEffect(() => {
    if (data) {
      const first = data?.[0]?.id?.toString?.();
      first && onTabChange(data?.[0]?.id?.toString?.());
    }
  }, [data]);
  const getProduct = (item: any, curLine = false) => {
    if (!item?.subCategory?.length) {
      return item?.product ?? [];
    } else {
      const res = item.subCategory.find((sub: any) => sub.product);
      if (!res) {
        for (const sub of item.subCategory) {
          const result: any[] = getProduct(sub);
          if (result.length) {
            return result;
          }
        }
      }
      return item.subCategory.reduce((prev: any[], next: any) => {
        return prev.concat(
          (next.product ?? []).map(good => ({ ...good, parentId: next.id })),
        );
      }, []);
    }
  };
  const onTabChange = (tab: string) => {
    setSubActiveKey(undefined);
    const item: any = data.find(item => item.id.toString() == tab);
    setActiveTab(tab);
    const product = getProduct(item);
    if (product.length) {
      const type = product?.[0]?.type;
      const current = item.subCategory?.[0]?.id;
      setActivekey(current);
      setShowPanel(current);
      setActive({
        type,
        id: product?.[0]?.id,
        name: product?.[0]?.name,
      });
    }
  };
  const getFirstProduct = (item: any) => {
    const getProduct = obj => {
      if (obj.subCategory?.length) {
        getProduct(obj.subCategory[0]);
      }
      if (obj.product?.length) {
        setActive(obj.product[0]);
      }
    };
    getProduct(item);
  };
  return (
    <div className={styles.baseProduct}>
      <Spin spinning={loading}>
        <Card
          tabBarExtraContent={
            <Space>
              <Button type="primary" onClick={() => {}}>
                订单查询
              </Button>
              <Input
                allowClear
                placeholder="产品名称"
                suffix={<SearchOutlined />}
                value={keyWord}
                onChange={e => setKeyWord(e.target.value)}
              />
            </Space>
          }
          tabList={data.map(item => ({
            tab: item.category,
            key: item.id.toString(),
          }))}
          activeTabKey={activeTab}
          onTabChange={tab => onTabChange(tab)}
        >
          <Collapse
            accordion
            activeKey={showPanel}
            onChange={key => setShowPanel(key)}
            destroyInactivePanel
          >
            {(
              data.find(item => item.id.toString() == activeTab)?.subCategory ??
              []
            ).map(item => {
              const products = getProduct(item, activekey == item.id);
              return (
                <Panel
                  disabled
                  showArrow={false}
                  header={
                    <div className={styles.panelHeader}>
                      <div className={styles.col1}>
                        <Button
                          type="link"
                          style={{
                            color: activekey == item.id ? '' : 'initial',
                          }}
                          onClick={() => {
                            getFirstProduct(item);
                            setActivekey(item.id);
                            setSubActiveKey(undefined);
                            setShowPanel(item.id);
                          }}
                        >
                          {item.category}
                        </Button>
                        <div className={styles.borderRight}></div>
                      </div>
                      {item.subCategory?.length ? (
                        <div className={styles.col2}>
                          {item.subCategory.map((sub, i: number) => (
                            <Button
                              key={i}
                              className={`${styles.item} ${
                                sub.product.find(pro => pro.id == active?.id)
                                  ? styles.active
                                  : ''
                              }`}
                              onClick={() => {
                                getFirstProduct(sub);
                                setActivekey(item.id);
                                setSubActiveKey(sub.id);
                                setShowPanel(item.id);
                              }}
                            >
                              {sub.category}
                            </Button>
                          ))}
                          <div className={styles.borderRight}></div>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className={styles.col3}>
                        {products
                          .filter(good => {
                            if (activekey == item.id) {
                              // 筛选出当前选中行，三级目录选中下的产品
                              if (
                                subActiveKey != undefined &&
                                good.parentId != subActiveKey
                              ) {
                                return false;
                              }
                            }
                            return true;
                          })
                          .map((pro, i: number) => (
                            <Button
                              key={i}
                              className={`${styles.item}  ${
                                active?.id != pro.id &&
                                keyWord &&
                                pro.name.indexOf(keyWord) > -1
                                  ? styles.searched
                                  : ''
                              }`}
                              type={
                                active?.id == pro.id ? 'primary' : 'default'
                              }
                              onClick={() => {
                                if (activekey != item.id) {
                                  setSubActiveKey(undefined);
                                }
                                setActivekey(item.id);
                                setShowPanel(item.id);
                                setActive({
                                  id: pro.id,
                                  name: pro.name,
                                  type: pro.type,
                                });
                              }}
                            >
                              {pro.name}
                            </Button>
                          ))}
                      </div>
                    </div>
                  }
                  key={item.id}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <strong>{active?.name}</strong>
                    <Button
                      type="link"
                      onClick={() => {
                        setShowPanel(undefined);
                      }}
                    >
                      收起
                      <UpOutlined />
                    </Button>
                  </div>
                  <Flow type={active?.type} />
                </Panel>
              );
            })}
            <Panel
              disabled
              showArrow={false}
              key={'777'}
              header={
                <div>
                  已选中：
                  <span style={{ color: '#1C242E' }}>
                    {active?.name ?? '-'}
                  </span>
                </div>
              }
            ></Panel>
          </Collapse>
        </Card>
        {active && (
          <Card style={{ textAlign: 'center', marginTop: 20 }}>
            <Button type="primary" onClick={() => {}}>
              去订购
            </Button>
          </Card>
        )}
      </Spin>
    </div>
  );
};
export default BaseProduct;
