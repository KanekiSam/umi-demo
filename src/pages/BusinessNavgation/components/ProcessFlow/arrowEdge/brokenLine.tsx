import React, { CSSProperties } from 'react';

interface Props {
  width: number;
  height: number;
  direction: 'topRight' | 'bottomRight';
  style?: CSSProperties;
}
const BrokenLine: React.FC<Props> = (props) => {
  const { width, height, style, direction } = props;
  const arrow = { x: 8, y: 4 };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={{ width, height, position: 'absolute', ...style }}
    >
      {direction == 'topRight' && (
        <path
          d={`M 1 1 L ${width - arrow.y} ${1} L${width - arrow.y} ${height} L ${width} ${
            height - arrow.x
          } M ${width - arrow.y} ${height} L ${width - arrow.y * 2} ${height - arrow.x}`}
          stroke="#3377FF"
          fill="none"
        />
      )}
      {direction == 'bottomRight' && (
        <path
          d={`M 0 ${height - 1} L ${width - arrow.y} ${height - 1} L${
            width - arrow.y
          } ${0} L ${width} ${arrow.x} M ${width - arrow.y} ${0} L ${width - arrow.y * 2} ${
            arrow.x
          }`}
          stroke="#3377FF"
          fill="none"
        />
      )}
    </svg>
  );
};
export default BrokenLine;
