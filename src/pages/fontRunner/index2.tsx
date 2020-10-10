import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import styles from './index.less';
import { Space, Button } from 'antd';

enum DirectionEnum {
  左,
  上,
}
interface Props {
  width: number;
  style?: CSSProperties;
}
const fontRunner2: React.FC<Props> = props => {
  const [direction, setDirection] = useState<any>(DirectionEnum.左);
  const timer = useRef<any>(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const contentRef = useRef<any>(null);
  useEffect(() => {
    // 当监听到文字变化时，一定要先清掉定时器，如果文字较短的话就不会再启动

    if (timer.current) {
      clearInterval(timer.current);
    }
    const contentDom = contentRef.current;
    if (contentDom) {
      const obj = contentDom.getBoundingClientRect();
      // 判断文字框长度
      if (direction == DirectionEnum.左) {
        if (obj.width > props.width) {
          timer.current = setInterval(() => {
            // 注意state是负数，当数字移动到最后的时候，下一次从父元素的宽度开始，看起来就是一直在向左移动
            // 文字框的宽度要时时获取
            // setLeft要从回调里面获取，不然不能时时更新

            setLeft(state =>
              -state >= contentDom.getBoundingClientRect().width
                ? props.width
                : state - 1,
            );
          }, 30);
        }
      } else if (direction == DirectionEnum.上) {
        if (obj.height > 40) {
          timer.current = setInterval(() => {
            setTop(state => {
              if ((state - 1) % 40 == 0) {
                setTimeout(() => {
                  setTop(state1 =>
                    -state1 >= contentDom.getBoundingClientRect().height
                      ? 40
                      : state1 - 1,
                  );
                }, 500);
                return state;
              } else {
                return -state >= contentDom.getBoundingClientRect().height
                  ? 40
                  : state - 1;
              }
            });
          }, 30);
        }
      } else {
        setLeft(0);
        setTop(0);
      }
    }
  }, [props.children, direction]);
  useEffect(() => {
    // 注销时，清空定时器

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);
  return (
    <>
      <div
        className={styles.noticeCompWrapper}
        style={{ width: props.width, ...props.style, marginBottom: 10 }}
      >
        <div
          ref={contentRef}
          className={styles.noticeContent}
          style={{
            left,
            top,
            whiteSpace: direction == DirectionEnum.左 ? 'nowrap' : 'initial',
          }}
        >
          {props.children}
        </div>
      </div>
      <Space>
        <Button
          onClick={() => {
            setDirection(DirectionEnum.左);
            setTop(0);
          }}
        >
          向左
        </Button>
        <Button
          onClick={() => {
            setDirection(DirectionEnum.上);
            setLeft(0);
          }}
        >
          向上
        </Button>
      </Space>
    </>
  );
};
export default fontRunner2;
