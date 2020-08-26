import React, { useState, Key, useEffect } from 'react';
import { Collapse, Button, Space, Card, Input } from 'antd';
import { UpOutlined, SearchOutlined } from '@ant-design/icons';
import ProcessFlow from './ProcessFlow';
import { typeOne, typeTwo, typeFour, typeThree } from './ProcessFlow/type';
import { data } from './data';
import styles from '../index.less';
const { Panel } = Collapse;

interface Props {}
const BaseProduct: React.FC<Props> = props => {
  const [activeTab, setActiveTab] = useState<string | undefined>();
  const [activekey, setActivekey] = useState<string | undefined>();
  const [active, setActive] = useState<
    { id: string; name: string; type: number } | undefined
  >();
  useEffect(() => {
    if (data) {
      const first = data?.[0]?.id?.toString?.();
      console.log(first);
      first && onTabChange(data?.[0]?.id?.toString?.());
    }
  }, [data]);
  const [keyWord, setKeyWord] = useState<string | undefined>();
  const getProduct = item => {
    if (!item.subCategory) {
      return item.product ?? [];
    } else {
      return item.subCategory.reduce((prev, next) => {
        return prev.concat(next.product ?? []);
      }, []);
    }
  };
  const getProductRender = item => {
    // tslint:disable-next-line:no-console
    console.log('item:', item.subCategory);
    if (item.subCategory) {
      const res = item.subCategory.find(sub => sub.product);
      // tslint:disable-next-line:no-console
      console.log('res:', res);
      if (!res) {
        for (const sub of item.subCategory) {
          const result: any[] = getProductRender(sub);
          if (result.length) {
            return result;
          }
        }
      }
      // tslint:disable-next-line:no-console
      console.log('res2:', res);
      return item.subCategory.reduce((prev, next) => {
        return prev.concat(next.product ?? []);
      }, []);
    }
    return [];
  };
  const onTabChange = (tab: string) => {
    const item: any = data.find(item => item.id.toString() == tab);
    setActiveTab(tab);
    const product = getProductRender(item);
    // tslint:disable-next-line:no-console
    console.log(product);
    if (product.length) {
      const type = product?.[0]?.type;
      if (type != 4) {
        setActivekey(item.subCategory?.[0]?.id);
      }
      setActive({
        type,
        id: product?.[0]?.productId,
        name: product?.[0]?.name,
      });
    }
  };
  return (
    <div className={styles.baseProduct}>
      <Card
        tabBarExtraContent={
          <Space>
            <Button type="primary">订单查询</Button>
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
          activeKey={activekey}
          onChange={key => setActivekey(key)}
        >
          {(
            data.find(item => item.id.toString() == activeTab)?.subCategory ??
            []
          ).map(item => {
            const products = getProduct(item);
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
                          color:
                            active?.type == 4 || activekey == item.id
                              ? ''
                              : 'initial',
                        }}
                      >
                        {item.category}
                      </Button>
                      <div className={styles.borderRight}></div>
                    </div>
                    {item.subCategory ? (
                      <div className={styles.col2}>
                        {item.subCategory.map(sub => (
                          <Button
                            disabled
                            className={`${styles.item} ${
                              sub.product.find(
                                pro => pro.productId == active?.id,
                              )
                                ? styles.active
                                : ''
                            }`}
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
                      {products.map(pro => (
                        <Button
                          className={`${styles.item}  ${
                            active?.id != pro.productId &&
                            keyWord &&
                            pro.name.indexOf(keyWord) > -1
                              ? styles.searched
                              : ''
                          }`}
                          type={
                            active?.id == pro.productId ? 'primary' : 'default'
                          }
                          onClick={() => {
                            if (pro.type != 4) {
                              setActivekey(item.id);
                            }
                            setActive({
                              id: pro.productId,
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
                      setActivekey(undefined);
                      setActive(undefined);
                    }}
                    icon={<UpOutlined />}
                  >
                    收起
                  </Button>
                </div>
                <div className={styles.flow}>
                  {active?.type == 1 && <ProcessFlow data={typeOne} />}
                  {active?.type == 2 && <ProcessFlow data={typeTwo} />}
                  {active?.type == 3 && <ProcessFlow data={typeThree} />}
                  <div className={styles.tipBottom}>
                    <span style={{ color: '#999999' }}>订购准备</span>
                    <span style={{ color: '#0ABCF4' }}>订购流程</span>
                    <span style={{ color: '#999999' }}>
                      {active?.type !== 3 && '订购变更'}
                    </span>
                  </div>
                </div>
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
                <span style={{ color: '#1C242E' }}>{active?.name ?? '-'}</span>
              </div>
            }
          ></Panel>
        </Collapse>
      </Card>
      {active && (
        <Card style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="primary">去订购</Button>
        </Card>
      )}
    </div>
  );
};
export default BaseProduct;
