import React, {
  useState,
  MouseEventHandler,
  useRef,
  useCallback,
  Key,
  useEffect,
} from 'react';
import styles from './DragBox.less';

enum DirectionEnum {
  左上 = 'nw',
  左下 = 'sw',
  右上 = 'ne',
  右下 = 'se',
  上 = 'n',
  下 = 's',
  左 = 'w',
  右 = 'e',
  移动 = 'move',
}
interface Props {
  bounder?: {
    left: [number, number];
    top: [number, number];
    width: Key;
    height: Key;
  };
}
const DragBox: React.FC<Props> = props => {
  const dragRef = useRef<any>(null);
  const dragBoxRef = useRef<any>(null);
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(80);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const checkBounder = useCallback(
    (obj: {
      x0: number;
      y0: number;
      w0: number;
      h0: number;
      w1: number;
      h1: number;
      direction: string;
    }): false | { x: number; y: number; w: number; h: number } => {
      const { x0, y0, w0, h0, direction } = obj;
      if (props.bounder) {
        let x = x0,
          y = y0,
          w = w0,
          h = h0;
        const bounderLeft = props.bounder?.left?.[0];
        const bounderRight = props.bounder?.left?.[1];
        const bounderTop = props.bounder?.top?.[0];
        const bounderBottom = props.bounder?.top?.[1];
        const {
          width: w1,
          height: h1,
        } = dragBoxRef.current.getBoundingClientRect();
        if (x0 < bounderLeft) {
          x = bounderLeft;
          if (direction.indexOf(DirectionEnum.左) > -1) {
            w = w1;
          }
        }
        if (x0 > bounderRight - w0) {
          x = bounderRight - w1;
          if (direction.indexOf(DirectionEnum.右) > -1) {
            w = w1;
          }
        }
        if (y0 < bounderTop) {
          y = bounderTop;
          if (direction.indexOf(DirectionEnum.上) > -1) {
            h = h1;
          }
        }
        if (y0 > bounderBottom - h0) {
          y = bounderBottom - height;
          if (direction.indexOf(DirectionEnum.下) > -1) {
            h = h1;
          }
        }
        return { x, y, w, h };
      }
      return false;
    },
    [width, height],
  );
  const onMousemove = (
    e: React.MouseEvent<any>,
    direction: DirectionEnum,
    move: { x: number; y: number },
  ) => {
    e.preventDefault();
    const moveX = move.x;
    const moveY = move.y;
    let w = 0,
      h = 0,
      x = 0,
      y = 0;
    switch (direction) {
      case DirectionEnum.左上: {
        w = width - moveX;
        h = height - moveY;
        x = position.left + moveX;
        y = position.top + moveY;
        break;
      }
      case DirectionEnum.左下: {
        w = width - moveX;
        h = height + moveY;
        x = position.left + moveX;
        y = position.top;
        break;
      }
      case DirectionEnum.右上: {
        w = width + moveX;
        h = height - moveY;
        x = position.left;
        y = position.top + moveY;
        break;
      }
      case DirectionEnum.右下: {
        w = width + moveX;
        h = height + moveY;
        x = position.left;
        y = position.top;
        break;
      }
      case DirectionEnum.左: {
        w = width - moveX;
        h = height;
        x = position.left + moveX;
        y = position.top;
        break;
      }
      case DirectionEnum.右: {
        w = width + moveX;
        h = height;
        x = position.left;
        y = position.top;
        break;
      }
      case DirectionEnum.上: {
        w = width;
        h = height - moveY;
        x = position.left;
        y = position.top + moveY;
        break;
      }
      case DirectionEnum.下: {
        w = width;
        h = height + moveY;
        x = position.left;
        y = position.top;
        break;
      }
      case DirectionEnum.移动: {
        w = width;
        h = height;
        x = position.left + moveX;
        y = position.top + moveY;
        break;
      }
      default: {
        return;
      }
    }
    const res = checkBounder({
      x0: x,
      y0: y,
      w0: w,
      h0: h,
      w1: width,
      h1: height,
      direction,
    });
    if (res) {
      x = res.x;
      y = res.y;
      w = res.w;
      h = res.h;
    }
    setWidth(w);
    setHeight(h);
    setPosition({ left: x, top: y });
  };
  const onMouseDown = (e: React.MouseEvent<any>, direction: DirectionEnum) => {
    e.stopPropagation();
    const pageX = e.pageX;
    const pageY = e.pageY;
    dragRef.current.onmousemove = (e2: React.MouseEvent<any>) => {
      onMousemove(e2, direction, { x: e2.pageX - pageX, y: e2.pageY - pageY });
    };
    const release = (e2: React.MouseEvent<any>) => {
      dragRef.current.onmousemove = null;
      dragRef.current.onmouseup = null;
    };
    dragRef.current.onmouseup = release;
    dragRef.current.onmouseleave = release;
  };
  const getClipImg = () => {
    const c = document.createElement('canvas');
    c.width = Number(width);
    c.height = Number(height);
    const ctx = c.getContext('2d');
    const img = document.getElementById('target');
    ctx?.drawImage(
      img,
      -position.left + Number(props.bounder?.left?.[0]),
      -position.top + Number(props.bounder?.top?.[0]),
      props.bounder?.width,
      props.bounder?.height,
    );
    const clipTarget = document.getElementById('clipTarget');
    clipTarget?.setAttribute('src', c.toDataURL());
  };
  useEffect(() => {
    getClipImg();
  }, [position, width, height]);
  return (
    <div
      className={styles.dragWrapper}
      ref={dom => {
        if (dom && !dragRef.current) {
          dragRef.current = dom;
          const rect = dom.getBoundingClientRect();
          setPosition({
            left: (rect.width - width) / 2,
            top: (rect.height - height) / 2,
          });
        }
      }}
    >
      <div
        className={styles.mask}
        style={{ width: position.left, height: '100%', left: 0, top: 0 }}
      ></div>
      <div
        className={styles.mask}
        style={{
          width: `calc(100% - ${position.left + width}px)`,
          height: '100%',
          right: 0,
          top: 0,
        }}
      ></div>
      <div
        className={styles.mask}
        style={{ width, height: position.top, left: position.left, top: 0 }}
      ></div>
      <div
        className={styles.mask}
        style={{
          width,
          height: `calc(100% - ${height + position.top}px)`,
          bottom: 0,
          left: position.left,
        }}
      ></div>
      <div
        className={styles.dragBox}
        ref={dragBoxRef}
        style={{ width, height, ...position }}
        onMouseDown={e => onMouseDown(e, DirectionEnum.移动)}
      >
        <div
          className={`${styles.dot} ${styles['left-top-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.左上)}
        ></div>
        <div
          className={`${styles.dot} ${styles['left-bottom-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.左下)}
        ></div>
        <div
          className={`${styles.dot} ${styles['right-top-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.右上)}
        ></div>
        <div
          className={`${styles.dot} ${styles['right-bottom-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.右下)}
        ></div>
        <div
          className={`${styles.dot} ${styles['left-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.左)}
        ></div>
        <div
          className={`${styles.dot} ${styles['top-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.上)}
        ></div>
        <div
          className={`${styles.dot} ${styles['right-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.右)}
        ></div>
        <div
          className={`${styles.dot} ${styles['bottom-dot']}`}
          onMouseDown={e => onMouseDown(e, DirectionEnum.下)}
        ></div>
      </div>
    </div>
  );
};
export default DragBox;
