import React from 'react';
import styles from './index.less';
import ControlBtn, { ControlBtnTypeEnum } from './controlBtn';
import Line from '../arrowEdge/line';
import Diamond from '../diamond';

interface Props {
  type: number;
}
const FlowTypeThree: React.FC<Props> = props => {
  const width = 76;
  const height = 31;
  const arrowWidth = 80;
  const firstLeft = 20;
  const screenW = width * 4 + arrowWidth * 3 + firstLeft * 2;
  const screenH = 150;
  return (
    <div
      style={{ width: screenW, height: screenH }}
      className={styles.flowWrapper}
    >
      <ControlBtn
        className={styles.qz}
        left={firstLeft}
        top={screenH / 2 - height / 2}
      >
        电商平台
      </ControlBtn>
      <Line
        width={arrowWidth}
        style={{ left: width + firstLeft, top: screenH / 2 - 4 }}
      />
      <ControlBtn
        type={ControlBtnTypeEnum.业务签订}
        left={width + arrowWidth + firstLeft}
        top={screenH / 2 - height / 2}
        className={styles.ywqd}
      />
      <span
        className={styles.label}
        style={{
          color: '#3377FF',
          left: width + arrowWidth + firstLeft - 60,
          top: screenH / 2 + height / 2 + 10,
        }}
      >
        （补充合同、付费关系、修改资费等）
      </span>
      <Line
        width={arrowWidth}
        style={{
          left: width * 2 + arrowWidth + firstLeft,
          top: screenH / 2 - 4,
        }}
      />
      <Diamond
        className={`${styles.flowBtn} ${styles.sp}`}
        width={width}
        height={40}
        style={{
          left: (width + arrowWidth) * 2 + firstLeft,
          top: screenH / 2 - 20,
          zIndex: 1,
        }}
      >
        审批
      </Diamond>
      <span
        className={styles.label}
        style={{ left: (width + arrowWidth) * 3 - 50, top: screenH / 2 - 22 }}
      >
        审批通过
      </span>
      <Line
        width={arrowWidth}
        style={{
          left: (width + arrowWidth) * 3 - arrowWidth + firstLeft,
          top: `calc(50% - ${4}px)`,
        }}
      />
      <ControlBtn
        className={styles.qz}
        left={(width + arrowWidth) * 3 + firstLeft}
        top={screenH / 2 - height / 2}
      >
        起租
      </ControlBtn>
      <div
        className={styles.combo}
        style={{ width: screenW, height: screenH, left: 0, top: 0 }}
      ></div>
      <div className={styles.tipBottom}>
        <span></span>
        <span style={{ color: '#0ABCF4' }}>订购流程</span>
        <span></span>
      </div>
    </div>
  );
};
export default FlowTypeThree;
