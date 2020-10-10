import React, { CSSProperties } from 'react';

interface Props {
  width: number;
  height: number;
  style?: CSSProperties;
  className?: any;
}
const Diamond: React.FC<Props> = (props) => {
  const { width, height, style } = props;
  return (
    <div style={style} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{
          width,
          height,
        }}
      >
        <path
          d={`M 0 ${height / 2} L ${width / 2} ${0} L${width} ${height / 2} L ${
            width / 2
          } ${height} Z`}
          fill="#F2F2F2"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          width,
          height,
          left: 0,
          top: 0,
          textAlign: 'center',
          lineHeight: height + 'px',
          zIndex: 2,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
export default Diamond;
