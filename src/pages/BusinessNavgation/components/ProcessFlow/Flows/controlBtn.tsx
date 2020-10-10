import React from 'react';
import styles from './index.less';
const { DDZX_URL, ZQZT_URL } = { DDZX_URL: '', ZQZT_URL: '' };

export enum ControlBtnTypeEnum {
  客户创建,
  业务签订,
  业务订购,
  业务变更,
  停复机,
  拆机,
  资源核查,
  核查转订,
}
const baseUrl =
  DDZX_URL + 'api/v1/sys/usercenter/operationPlatformLogin?resources=';
const linkUrls = {
  [ControlBtnTypeEnum.业务订购]:
    baseUrl + '/iframe/mall/accept/toorder?serviceTypeCode=1001',
  [ControlBtnTypeEnum.业务变更]:
    baseUrl + '/iframe/mall/accept/tochange?serviceTypeCode=1002',
  [ControlBtnTypeEnum.停复机]:
    baseUrl + '/iframe/mall/accept/tochange?serviceTypeCode=1003',
  [ControlBtnTypeEnum.拆机]:
    baseUrl + '/iframe/mall/accept/tochange?serviceTypeCode=1005',
  [ControlBtnTypeEnum.资源核查]:
    baseUrl + '/iframe/mall/accept/toorder?serviceTypeCode=1012',
  [ControlBtnTypeEnum.核查转订]: baseUrl + '/iframe/query/orders/toTurnQuery',
  [ControlBtnTypeEnum.业务签订]: baseUrl + '/iframe/orderDeal/taskDeal/toQuery',
  [ControlBtnTypeEnum.客户创建]:
    ZQZT_URL +
    '/portal-web/checkLogin.do?menuCode=CUST_MENU_2116&type=add&custClassType=2&inMethod=G',
};
interface Props {
  type?: ControlBtnTypeEnum;
  className?: string;
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
}
const ControlBtn: React.FC<Props> = props => {
  const width = 76;
  const height = 31;
  return (
    <>
      <div
        className={`${styles.flowBtn} ${props.className || ''}`}
        style={{
          left: props.left,
          top: props.top,
          bottom: props.bottom,
          right: props.right,
          width,
          height,
        }}
        onClick={() => {
          if (props.type && linkUrls[props.type]) {
            window.open(linkUrls[props.type]);
          }
        }}
      >
        {props.children ||
          (props.type != undefined && ControlBtnTypeEnum[props.type])}
      </div>
    </>
  );
};
export default ControlBtn;
