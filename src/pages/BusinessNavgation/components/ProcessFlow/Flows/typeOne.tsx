import React from 'react';
import styles from './index.less';
import TwoLine from '../arrowEdge/twoLine';
import Line from '../arrowEdge/line';
import BrokenLine from '../arrowEdge/brokenLine';
import Diamond from '../diamond';
import ControlBtn, { ControlBtnTypeEnum } from './controlBtn';

interface Props {
  type: number;
}
const FlowTypeOne: React.FC<Props> = props => {
  const width = 76;
  const height = 31;
  const screenW = props.type == 4 ? 900 : 1003;
  const screenH = 170;

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
      <span style={{ left: 105, top: 12 }} className={styles.label}>
        正式受理
      </span>
      <TwoLine
        width={84}
        height={108}
        style={{ left: width, top: 32, position: 'absolute' }}
      />
      <ControlBtn type={ControlBtnTypeEnum.业务订购} left={160} top={20} />
      <span style={{ left: 105, bottom: 35 }} className={styles.label}>
        预受理
      </span>
      <BrokenLine
        width={180}
        height={35}
        direction="topRight"
        style={{ left: 236, top: 35.5 }}
      />
      <ControlBtn type={ControlBtnTypeEnum.资源核查} left={160} bottom={20} />
      <span
        className={styles.label}
        style={{ color: '#3377FF', left: 170, bottom: 0 }}
      >
        （预订单）
      </span>
      <Line width={64} style={{ left: 160 + width, bottom: height }} />
      <ControlBtn type={ControlBtnTypeEnum.核查转订} left={300} bottom={20} />
      <BrokenLine
        width={40}
        height={35}
        direction="bottomRight"
        style={{ left: 376, top: screenH / 2 + height / 2 }}
      />
      <ControlBtn
        left={376}
        top={screenH / 2 - height / 2}
        className={styles.zfsp}
      >
        资费审批
      </ControlBtn>
      <Line width={60} style={{ left: 376 + width, top: screenH / 2 - 4 }} />
      <ControlBtn
        type={ControlBtnTypeEnum.业务签订}
        left={512}
        top={screenH / 2 - height / 2}
        className={styles.ywqd}
      />
      <span
        className={styles.label}
        style={{ color: '#3377FF', left: 450, bottom: 45 }}
      >
        （补充合同、付费关系、修改资费等）
      </span>
      <Line
        width={58}
        style={{ left: 512 + width, top: `calc(50% - ${4}px)` }}
      />
      <Diamond
        className={`${styles.flowBtn} ${styles.sp}`}
        width={width}
        height={40}
        style={{ left: 646, top: screenH / 2 - 20, zIndex: 1 }}
      >
        审批
      </Diamond>
      <span
        className={styles.label}
        style={{ left: 723, top: screenH / 2 - 22 }}
      >
        审批通过
      </span>
      <Line
        width={60}
        style={{ left: 646 + width, top: `calc(50% - ${4}px)` }}
      />
      <ControlBtn
        className={styles.qz}
        left={782}
        top={screenH / 2 - height / 2}
      >
        起租
      </ControlBtn>
      {props.type == 1 && (
        <>
          <TwoLine
            width={68}
            height={108}
            style={{ left: 860, top: 32, position: 'absolute' }}
          />
          <ControlBtn type={ControlBtnTypeEnum.业务变更} right={0} top={20} />
          <ControlBtn type={ControlBtnTypeEnum.拆机} right={0} bottom={20} />
          <Line
            width={44}
            style={{ left: 806 + width, top: screenH / 2 - 3 }}
          />
          <ControlBtn
            type={ControlBtnTypeEnum.停复机}
            right={0}
            bottom={screenH / 2 - height / 2}
          />
        </>
      )}
      {props.type == 2 && (
        <>
          <TwoLine
            width={68}
            height={108}
            style={{ left: 860, top: 32, position: 'absolute' }}
          />
          <ControlBtn type={ControlBtnTypeEnum.业务变更} right={0} top={20} />
          <ControlBtn type={ControlBtnTypeEnum.拆机} right={0} bottom={20} />
        </>
      )}
      {props.type == 3 && (
        <>
          <Line
            width={66}
            style={{ left: 784 + width, top: screenH / 2 - 3 }}
          />
          <ControlBtn
            type={ControlBtnTypeEnum.拆机}
            right={0}
            bottom={screenH / 2 - height / 2}
          />
        </>
      )}
      <div
        className={styles.combo}
        style={{ width: 780, height: 180, left: 88, top: 0 }}
      ></div>
      <div className={styles.tipBottom}>
        <span style={{ color: '#999999' }}>订购准备</span>
        <span style={{ color: '#0ABCF4' }}>订购流程</span>
        <span style={{ color: '#999999' }}>
          {props.type !== 4 && '订购变更'}
        </span>
      </div>
    </div>
  );
};
export default FlowTypeOne;
