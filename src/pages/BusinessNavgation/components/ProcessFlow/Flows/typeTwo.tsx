import React from 'react';
import styles from './index.less';
import ControlBtn, { ControlBtnTypeEnum } from './controlBtn';
import Line from '../arrowEdge/line';
import Diamond from '../diamond';
import TwoLine from '../arrowEdge/twoLine';

interface Props {
  type: number;
}
const FlowTypeTwo: React.FC<Props> = props => {
  const width = 76;
  const height = 31;
  const screenW = (width + 60) * (props.type == 7 ? 6 : 7) - 60;
  const screenH = 150;
  return (
    <div
      style={{ width: screenW, height: screenH }}
      className={styles.flowWrapper}
    >
      <ControlBtn
        type={ControlBtnTypeEnum.客户创建}
        left={0}
        top={screenH / 2 - height / 2}
      />
      <Line width={60} style={{ left: width, top: screenH / 2 - 4 }} />
      <ControlBtn
        type={ControlBtnTypeEnum.业务订购}
        left={width + 60}
        top={screenH / 2 - height / 2}
      />
      <Line width={60} style={{ left: width * 2 + 60, top: screenH / 2 - 4 }} />
      <ControlBtn
        left={(width + 60) * 2}
        top={screenH / 2 - height / 2}
        className={styles.zfsp}
      >
        资费审批
      </ControlBtn>
      <Line
        width={60}
        style={{ left: width * 3 + 60 * 2, top: screenH / 2 - 4 }}
      />
      <ControlBtn
        type={ControlBtnTypeEnum.业务签订}
        left={(width + 60) * 3}
        top={screenH / 2 - height / 2}
        className={styles.ywqd}
      />
      <span
        className={styles.label}
        style={{
          color: '#3377FF',
          left: (width + 60) * 3 - 60,
          top: screenH / 2 + height / 2 + 10,
        }}
      >
        （补充合同、付费关系、修改资费等）
      </span>
      <Line
        width={58}
        style={{ left: (width + 60) * 4 - 60, top: `calc(50% - ${4}px)` }}
      />
      <Diamond
        className={`${styles.flowBtn} ${styles.sp}`}
        width={width}
        height={40}
        style={{ left: (width + 60) * 4, top: screenH / 2 - 20, zIndex: 1 }}
      >
        审批
      </Diamond>
      <span
        className={styles.label}
        style={{ left: (width + 60) * 5 - 60, top: screenH / 2 - 22 }}
      >
        审批通过
      </span>
      <Line
        width={60}
        style={{
          left: (width + 60) * 5 - 60,
          top: `calc(50% - ${4}px)`,
        }}
      />
      <ControlBtn
        className={styles.qz}
        left={(width + 60) * 5}
        top={screenH / 2 - height / 2}
      >
        起租
      </ControlBtn>
      {props.type == 5 && (
        <>
          <TwoLine
            width={60}
            height={88}
            style={{
              left: (width + 60) * 6 - 60,
              top: 32,
              position: 'absolute',
            }}
          />
          <ControlBtn
            type={ControlBtnTypeEnum.业务变更}
            left={(width + 60) * 6}
            top={20}
          />
          <ControlBtn
            type={ControlBtnTypeEnum.拆机}
            left={(width + 60) * 6}
            bottom={20}
          />
        </>
      )}
      {props.type == 8 && (
        <>
          <Line
            width={60}
            style={{ left: (width + 60) * 6 - 60, top: screenH / 2 - 4 }}
          />
          <ControlBtn
            type={ControlBtnTypeEnum.拆机}
            left={(width + 60) * 6}
            bottom={screenH / 2 - height / 2}
          />
        </>
      )}
      <div
        className={styles.combo}
        style={{ width: 680, height: 160, left: 88, top: 0 }}
      ></div>
      <div className={styles.tipBottom}>
        <span style={{ color: '#999999' }}>订购准备</span>
        <span style={{ color: '#0ABCF4' }}>订购流程</span>
        <span style={{ color: '#999999' }}>
          {props.type != 7 && '订购变更'}
        </span>
      </div>
    </div>
  );
};
export default FlowTypeTwo;
