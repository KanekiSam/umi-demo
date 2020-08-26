import React, { useRef, Key } from 'react';
import { useDrop } from 'react-dnd';
import { useDebounceFn } from '@umijs/hooks';
import { ItemTypes, PosterElementEnum } from './PosterElement';
import styles from './index.less';
import { message, Empty } from 'antd';
import { FormInstance } from 'antd/lib/form';
import TransformBorder from './TransformBorder';

enum DirectionEnum {
  左上 = 'nw',
  左下 = 'sw',
  右上 = 'ne',
  右下 = 'se',
  上 = 'n',
  下 = 's',
  左 = 'w',
  右 = 'e',
}
interface Props {
  data: any[];
  setData: Function;
  activeId: Key;
  setActiveId: Function;
  form: FormInstance;
}
const transformBuffer = 10;
const DropItem: React.FC<Props> = ({
  data,
  setData,
  activeId,
  setActiveId,
  form,
}) => {
  const ref = useRef(null);
  const checkBounder = ({ x, y, w, h }) => {
    const bounder = ref.current.getBoundingClientRect();
    let left = x < 0 ? 0 : x;
    left = left > bounder.width - w ? bounder.width - w - 2 : left;
    let top = y < 0 ? 0 : y;
    top = top > bounder.height - h ? bounder.height - h - 2 : top;
    return { left, top };
  };
  const [_, drop] = useDrop({
    accept: ItemTypes.COMP,
    collect: monitor => {
      // console.log('drop', monitor);
    },
    hover: (item, monitor) => {
      // const { x, y } = monitor.getSourceClientOffset() || { x: 0, y: 0 };
      // const bounder = ref.current.getBoundingClientRect();
    },
    drop: (item, monitor) => {
      if (data.find(d => d.posterComponentId == item.posterComponentId)) {
        message.warning('已经创建该元素');
        return;
      }
      const initWidth = 80;
      const initHeight = 80;
      const position = monitor.getSourceClientOffset();
      const bounder = ref.current.getBoundingClientRect();
      const x = position?.x - bounder.x;
      const y = position?.y - bounder.y;
      const { left, top } = checkBounder({ x, y, w: initWidth, h: initHeight });
      setData([
        ...data,
        { ...item, left, top, width: initWidth, height: initHeight },
      ]);
    },
  });
  const { run } = useDebounceFn(({ disX, disY }, { pageX, pageY }, item) => {
    const x = pageX - disX + item.left;
    const y = pageY - disY + item.top;
    const { left, top } = checkBounder({
      x,
      y,
      w: item.width,
      h: item.height,
    });
    setData(
      data.map(d => {
        if (d.posterComponentId == item.posterComponentId) {
          return {
            ...item,
            left,
            top,
          };
        }
        return d;
      }),
    );
  }, 1);
  const { run: transform } = useDebounceFn(
    ({ disX, disY }, { pageX, pageY }, item, direction) => {
      let width, height, x, y;
      const moveX = pageX - disX;
      const moveY = pageY - disY;
      switch (direction) {
        case DirectionEnum.左上: {
          width = item.width - moveX;
          height = item.height - moveY;
          x = item.left + moveX;
          y = item.top + moveY;
          break;
        }
        case DirectionEnum.左下: {
          width = item.width - moveX;
          height = item.height + moveY;
          x = item.left + moveX;
          y = item.top;
          break;
        }
        case DirectionEnum.右上: {
          width = item.width + moveX;
          height = item.height - moveY;
          x = item.left;
          y = item.top + moveY;
          break;
        }
        case DirectionEnum.右下: {
          width = item.width + moveX;
          height = item.height + moveY;
          x = item.left;
          y = item.top;
          break;
        }
        case DirectionEnum.左: {
          width = item.width - moveX;
          height = item.height;
          x = item.left + moveX;
          y = item.top;
          break;
        }
        case DirectionEnum.右: {
          width = item.width + moveX;
          height = item.height;
          x = item.left;
          y = item.top;
          break;
        }
        case DirectionEnum.上: {
          width = item.width;
          height = item.height - moveY;
          x = item.left;
          y = item.top + moveY;
          break;
        }
        case DirectionEnum.下: {
          width = item.width;
          height = item.height + moveY;
          x = item.left;
          y = item.top;
          break;
        }
        default: {
          return;
        }
      }
      const { left, top } = checkBounder({ x, y, w: width, h: height });
      setData(
        data.map(d => {
          if (d.posterComponentId == item.posterComponentId) {
            return {
              ...item,
              left,
              top,
              width,
              height,
            };
          }
          return d;
        }),
      );
    },
    0,
  );
  drop(ref);
  const onMouseDown = (e: any, item) => {
    e.preventDefault();
    if (item.posterComponentId != activeId) {
      return;
    }
    const disX = e.pageX;
    const disY = e.pageY;
    const bounder = ref.current.getBoundingClientRect();
    const offsetx = disX - item.left - bounder.x;
    const offsety = disY - item.top - bounder.y;
    let direction;
    if (offsetx >= 0 && offsetx < transformBuffer) {
      if (offsety >= 0 && offsety < transformBuffer) {
        direction = DirectionEnum.左上;
      } else if (
        offsety <= item.height &&
        offsety > item.height - transformBuffer
      ) {
        direction = DirectionEnum.左下;
      } else {
        direction = DirectionEnum.左;
      }
    } else if (
      offsetx <= item.width &&
      offsetx > item.width - transformBuffer
    ) {
      if (offsety >= 0 && offsety < transformBuffer) {
        direction = DirectionEnum.右上;
      } else if (
        offsety <= item.height &&
        offsety > item.height - transformBuffer
      ) {
        direction = DirectionEnum.右下;
      } else {
        direction = DirectionEnum.右;
      }
    } else if (
      offsetx > transformBuffer &&
      offsetx < item.width - transformBuffer
    ) {
      if (offsety >= 0 && offsety < transformBuffer) {
        direction = DirectionEnum.上;
      } else if (
        offsety <= item.height &&
        offsety > item.height - transformBuffer
      ) {
        direction = DirectionEnum.下;
      }
    }
    if (direction) {
      ref.current.style.cursor = `${direction}-resize`;
      e.target.style.cursor = `${direction}-resize`;
      ref.current.onmousemove = e2 => {
        e2.preventDefault();
        e.stopPropagation();
        transform(
          { disX, disY },
          { pageX: e2.pageX, pageY: e2.pageY },
          item,
          direction,
        );
      };
    } else {
      ref.current.style.cursor = 'move';
      e.target.style.cursor = 'move';
      ref.current.onmousemove = e2 => {
        e2.preventDefault();
        e.stopPropagation();
        run({ disX, disY }, { pageX: e2.pageX, pageY: e2.pageY }, item);
      };
    }
    const release = e2 => {
      e2.target.onmousemove = null;
      e2.target.onmouseup = null;
      ref.current.onmousemove = null;
      ref.current.onmouseup = null;
      e2.target.style.cursor = 'auto';
      ref.current.style.cursor = 'auto';
    };
    e.target.onmouseup = release;
    ref.current.onmouseup = release;
    ref.current.onmouseleave = release;
  };
  const formData = form.getFieldsValue() || {};
  const posterElement = formData.posterElement || [];
  return (
    <div
      className={styles.previewLeft}
      ref={ref}
      id="targetRef"
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${formData.backgroundImage})`,
      }}
      onClick={e => {
        setActiveId(undefined);
      }}
    >
      {data.map((item, i) => {
        const element = posterElement.find(
          ele => ele.posterComponentId == item.posterComponentId,
        )?.compValue;
        return (
          <div
            key={i}
            className={`${styles.dropItem}`}
            style={{
              left: item.left,
              top: item.top,
              width: item.width,
              height: item.height,
              position: 'absolute',
            }}
            onMouseDown={e => {
              onMouseDown(e, item);
            }}
            onClick={e => {
              e.stopPropagation();
              setActiveId(item.posterComponentId);
            }}
          >
            <TransformBorder active={item.posterComponentId == activeId} />
            {[
              PosterElementEnum.二维码,
              PosterElementEnum.图片,
              PosterElementEnum.客户头像,
            ].indexOf(+item.posterComponentId) > -1 &&
              (element?.picUrl ? (
                <img
                  alt=""
                  style={{ width: '100%', height: '100%' }}
                  src={element?.picUrl}
                />
              ) : (
                <Empty
                  description="暂无图片"
                  image={
                    <img style={{ width: 40, height: 40 }} src="" alt="" />
                  }
                />
              ))}
            {[
              PosterElementEnum.个性签名,
              PosterElementEnum.姓名,
              PosterElementEnum.客户名称,
              PosterElementEnum.手机,
              PosterElementEnum.自定义文字,
              PosterElementEnum.邮箱,
            ].indexOf(+item.posterComponentId) > -1 && (
              <div
                style={{
                  color: element?.fontColor,
                  fontSize: element?.fontSize ? +element?.fontSize : 12,
                  fontFamily: element?.fontFamiliy
                    ? `"${element?.fontFamiliy}"`
                    : 'initial',
                  textAlign: element?.align == 2 ? 'right' : 'left',
                }}
              >
                {element?.textContent ??
                  PosterElementEnum[item.posterComponentId]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default DropItem;
