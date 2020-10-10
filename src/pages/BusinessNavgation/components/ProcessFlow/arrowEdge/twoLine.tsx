import React, { CSSProperties } from 'react';

interface Props {
  width: number;
  height: number;
  style?: CSSProperties;
}
const TwoLine: React.FC<Props> = (props) => {
  const { width, height, style } = props;
  const arrow = { x: 8, y: 4 };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ width, height, ...style }}>
      <path
        d={`M 0 ${height / 2} L 24 ${height / 2} L 24 4 L ${width} ${arrow.y} L ${
          width - arrow.x
        } 0 M ${width} ${arrow.y} L ${width - arrow.x} ${arrow.y * 2} M 24 ${height / 2} L 24 ${
          height - arrow.y
        } L ${width} ${height - arrow.y} L ${width - arrow.x} ${height - arrow.y * 2} M ${width} ${
          height - arrow.y
        } L ${width - arrow.x} ${height}`}
        stroke="#3377FF"
        fill="none"
      />
    </svg>
  );
};
export default TwoLine;
