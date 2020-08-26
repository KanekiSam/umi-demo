import React, { useState, useEffect } from 'react';
import { Steps, Card, Spin } from 'antd';
import BaseInfo from './BaseInfo';
import PosterElement from './PosterElement';

const { Step } = Steps;
export default () => {
  const [current, setCurrent] = useState(2);
  const [step1Data, setStep1Data] = useState({});
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const getNumber = (num?: string) => {
    if (!num) {
      return;
    }
    return typeof +num == 'number' ? +num : undefined;
  };

  return (
    <Card>
      <Spin spinning={loading}>
        <Steps current={current} style={{ marginBottom: 15, maxWidth: 620 }}>
          <Step title="海报基本信息编辑" />
          <Step title="海报界面元素及内容编辑" />
        </Steps>
        <div style={{ display: current === 1 ? '' : 'none' }}>
          <BaseInfo
            initailData={step1Data}
            nextStep={values => {
              setCurrent(2);
              setStep1Data(values);
            }}
          />
        </div>
        <div style={{ display: current === 2 ? '' : 'none' }}>
          <PosterElement
            initialData={formData}
            step1Data={step1Data}
            prevStep={() => {
              setCurrent(1);
            }}
          />
        </div>
      </Spin>
    </Card>
  );
};
