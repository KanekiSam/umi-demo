import React, { CSSProperties, useRef, useState, useEffect } from 'react';
import styles from './index.less';

interface Props {
  width: number;
  style?: CSSProperties;
}
const FontRunner: React.FC<Props> = props => {
  const contentRef = useRef<any>(null);
  const [duration, setDuration] = useState('');
  useEffect(() => {
    const dom = contentRef.current;
    if (dom) {
      const { width } = dom.getBoundingClientRect();
      if (width > props.width) {
        setDuration(width / 24 + 's');
      } else {
        setDuration('');
      }
    } else {
      setDuration('');
    }
  }, [props.children]);

  return (
    <div
      style={{ width: props.width, ...props.style }}
      id="wrapper"
      className={styles.wrapper}
    >
      <div
        className={styles.textContent}
        ref={contentRef}
        style={
          duration
            ? {
                animationDuration: duration,
                animationDelay: `0s, ${duration}`,
              }
            : {}
        }
      >
        {props.children}
      </div>
    </div>
  );
};
export default FontRunner;
