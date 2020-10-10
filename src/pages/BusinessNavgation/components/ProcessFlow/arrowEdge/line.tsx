import React, { CSSProperties } from 'react';

interface Props {
  width: number;
  style?: CSSProperties;
}
const Line: React.FC<Props> = (props) => {
  const { width, style } = props;
  const arrow = { x: 8, y: 4 };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={{ width, height: arrow.y * 2, position: 'absolute', ...style }}
    >
      <path
        d={`M 0 ${arrow.y} L ${width} ${arrow.y} L${width - arrow.x} 0 M ${width} ${arrow.y} L ${
          width - arrow.x
        } ${arrow.y * 2}`}
        stroke="#3377FF"
        fill="none"
      />
    </svg>
  );
};
export default Line;
