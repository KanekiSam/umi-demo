import React, { useState } from 'react';
import { Modal } from 'antd';

interface Props {
  url: string;
  onClick: Function;
}
const PreviewModal: React.FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <span
        onClick={async () => {
          const res = await props.onClick();
          if (res) {
            setVisible(true);
          }
        }}
      >
        {props.children}
      </span>
      <Modal
        width={423}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <img
          src={props.url}
          style={{ width: 375, height: 667, marginTop: 20 }}
        />
      </Modal>
    </>
  );
};
export default PreviewModal;
