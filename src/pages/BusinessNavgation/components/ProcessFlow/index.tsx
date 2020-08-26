import React, { useEffect, useRef, CSSProperties } from 'react';
import G6 from '@antv/g6';
import ReactDOM from 'react-dom';
import { message } from 'antd';

interface Props {
  data: any;
  style?: CSSProperties;
}
const ProcessFlow: React.FC<Props> = props => {
  const ref = React.useRef<any>(null);
  const drewText = (cfg, group, shape) => {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    var point = G6.Util.getLabelPosition(shape, 0, 10, 4, true);
    if (cfg.sourceEntity) {
      var center = shape.getPoint(0.6);
      var shapeContainer = group.addGroup();
      group.addShape('text', {
        attrs: {
          text: cfg.sourceEntity,
          x: center.x,
          y: center.y - 10,
          rotate: point.rotate,
          fill: '#333333',
          fontSize: 14,
        },
      });
    }
    if (cfg.targetEntity || cfg.targetEntityL) {
      const text = cfg.targetEntity || cfg.targetEntityL;
      const x = cfg.targetEntity ? endPoint.x + 10 : endPoint.x - 60;
      group.addShape('text', {
        attrs: {
          text,
          x,
          y: endPoint.y + 40,
          rotate: point.rotate,
          fill: '#3377FF',
          fontSize: 14,
        },
      });
    }
    if (cfg.centerEntity) {
      var center = shape.getPoint(0.2);
      group.addShape('text', {
        attrs: {
          text: cfg.centerEntity,
          x: center.x,
          y: center.y - 10,
          rotate: point.rotate,
          fill: '#333333',
          fontSize: 14,
        },
      });
    }
  };
  let graph: any;
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        fitView: true,
        width: ref.current?.scrollWidth ?? 800,
        height: ref.current?.scrollHeight ?? 400,
        modes: {
          default: [],
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          sortByCombo: false,
        },
        defaultNode: {
          type: 'rect',
          labelCfg: {
            style: {
              fill: '#3377FF',
              fontSize: 20,
              cursor: 'pointer',
            },
          },
          style: {
            stroke: '#3377FF',
            width: 120,
            height: 40,
            cursor: 'pointer',
          },
        },
        defaultEdge: {
          type: 'flow-line',
          style: {
            stroke: '#3377FF',
            endArrow: true,
          },
        },
        defaultCombo: {
          type: 'rect',
          style: {
            stroke: '#00AFE6',
            fill: 'rgba(0,175,230,0.04)',
            lineDash: [10],
          },
        },
      });
    }
    G6.registerEdge('special-line', {
      draw(cfg: any, group: any) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const { style } = cfg;
        const shape = group.addShape('path', {
          attrs: {
            stroke: style.stroke,
            endArrow: style.endArrow,
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', (startPoint.x + endPoint.x) / 3.15, startPoint.y],
              ['L', (startPoint.x + endPoint.x) / 3.15, endPoint.y],
              ['L', endPoint.x, endPoint.y],
            ],
          },
        });
        drewText(cfg, group, shape);
        return shape;
      },
    });
    G6.registerEdge('flow-line', {
      draw(cfg: any, group: any) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;

        const { style } = cfg;
        const shape = group.addShape('path', {
          attrs: {
            stroke: style.stroke,
            endArrow: style.endArrow,
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', (startPoint.x + endPoint.x) / 2, startPoint.y],
              ['L', (startPoint.x + endPoint.x) / 2, endPoint.y],
              ['L', endPoint.x, endPoint.y],
            ],
          },
        });
        drewText(cfg, group, shape);
        return shape;
      },
    });
    graph.on('node:click', evt => {
      const node = evt.item;
      const model = node.getModel();
      message.warning(model.label);
    });
    graph.data(props.data);
    graph.render();
    return () => {
      if (graph) {
        graph.destroy();
      }
    };
  }, []);
  return <div ref={ref} style={{ height: 300, ...props.style }}></div>;
};
export default ProcessFlow;
