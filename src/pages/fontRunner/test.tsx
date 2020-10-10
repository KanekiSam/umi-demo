import React, { useState } from 'react';
import FontRunner from '.';
import FontRunner2 from './index2';
import { Card, Input, Space } from 'antd';

interface Props {}
const Test: React.FC<Props> = props => {
  const [value, setValue] = useState<string | undefined>(
    '我是消息啊，我是消息啊，我就是一个消息。',
  );
  return (
    <Card>
      <Space direction={'vertical'}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <FontRunner width={120} style={{ border: '1px solid #efefef' }}>
          {value}
        </FontRunner>
        <FontRunner2 width={120} style={{ border: '1px solid #efefef' }}>
          {value}
        </FontRunner2>
      </Space>
    </Card>
  );
};
export default Test;
