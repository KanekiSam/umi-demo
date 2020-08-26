export const typeOne = {
  nodes: [
    { id: '1', label: '客户创建' },
    { id: '2', label: '业务订购', comboId: 'A' },
    { id: '3', label: '资源核查', comboId: 'A' },
    { id: '4', label: '核查转订', comboId: 'A' },
    {
      id: '5',
      label: '资费审批',
      comboId: 'A',
      style: {
        lineDash: [5],
        fill: '#F2F2F2',
        stroke: '#D8D8D8',
        height: 36,
        cursor: false,
      },
      labelCfg: {
        style: {
          cursor: false,
          fontSize: 20,
        },
      },
    },
    {
      id: '6',
      label: '业务签订',
      comboId: 'A',
      style: { lineDash: [5], height: 36 },
    },
    {
      id: '7',
      label: '审批',
      comboId: 'A',
      type: 'diamond',
      style: { fill: '#F2F2F2', stroke: '#fff', height: 36, cursor: false },
      labelCfg: {
        style: {
          cursor: false,
          fontSize: 20,
        },
      },
    },
    {
      id: '8',
      label: '起租',
      comboId: 'A',
      style: { fill: '#F2F2F2', stroke: '#fff', height: 36, cursor: false },
      labelCfg: {
        style: {
          cursor: false,
          fontSize: 20,
        },
      },
    },
    { id: '9', label: '业务变更' },
    { id: '10', label: '停复机' },
    { id: '11', label: '拆机' },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      sourceEntity: '正式受理',
      type: 'special-line',
    },
    {
      source: '1',
      target: '3',
      sourceEntity: '预受理',
      targetEntity: '（预订单）',
    },
    { source: '2', target: '5' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    {
      source: '5',
      target: '6',
      targetEntityL: '（补充合同、付费关系、修改资费等）',
    },
    { source: '6', target: '7' },
    { source: '7', target: '8', centerEntity: '审批通过' },
    { source: '8', target: '9' },
    { source: '8', target: '10' },
    { source: '8', target: '11' },
  ],
  combos: [
    {
      id: 'A',
      // label: 'combo A',
    },
  ],
};
export const typeTwo = {
  nodes: [
    { id: '1', label: '客户创建' },
    { id: '2', label: '业务订购', comboId: 'A' },
    { id: '3', label: '资源核查', comboId: 'A' },
    { id: '4', label: '核查转订', comboId: 'A' },
    {
      id: '5',
      label: '资费审批',
      comboId: 'A',
      style: {
        lineDash: [5],
        fill: '#F2F2F2',
        stroke: '#D8D8D8',
        height: 36,
        cursor: false,
      },
      labelCfg: {
        style: {
          cursor: false,
          fontSize: 20,
        },
      },
    },
    {
      id: '6',
      label: '业务签订',
      comboId: 'A',
      style: { lineDash: [5], height: 36 },
    },
    {
      id: '7',
      label: '审批',
      comboId: 'A',
      type: 'diamond',
      style: { fill: '#F2F2F2', stroke: '#fff', height: 36,cursor: false, },
      labelCfg: {
        style: {
          cursor: false,
          fontSize: 20,
        },
      },
    },
    {
      id: '8',
      label: '起租',
      comboId: 'A',
      labelCfg: {
        style: {
          cursor: false,
          fontSize: 20,
        },
      },
    },
    { id: '9', label: '业务变更' },
    { id: '10', label: '拆机' },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      sourceEntity: '正式受理',
      type: 'special-line',
    },
    {
      source: '1',
      target: '3',
      sourceEntity: '预受理',
      targetEntity: '（预订单）',
    },
    { source: '2', target: '5' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    {
      source: '5',
      target: '6',
      targetEntityL: '（补充合同、付费关系、修改资费等）',
    },
    { source: '6', target: '7' },
    { source: '7', target: '8', centerEntity: '审批通过' },
    { source: '8', target: '9' },
    { source: '8', target: '10' },
  ],
  combos: [
    {
      id: 'A',
      // label: 'combo A',
    },
  ],
};
export const typeThree = {
  nodes: [
    { id: '1', label: '客户创建' },
    { id: '2', label: '业务订购', comboId: 'A' },
    { id: '3', label: '资源核查', comboId: 'A' },
    { id: '4', label: '核查转订', comboId: 'A' },
    {
      id: '5',
      label: '资费审批',
      comboId: 'A',
      style: {
        lineDash: [5],
        fill: '#F2F2F2',
        stroke: '#D8D8D8',
        height: 36,
      },
    },
    {
      id: '6',
      label: '业务签订',
      comboId: 'A',
      style: { lineDash: [5], height: 36 },
    },
    {
      id: '7',
      label: '审批',
      comboId: 'A',
      type: 'diamond',
      style: { fill: '#F2F2F2', stroke: '#fff', height: 36 },
    },
    { id: '8', label: '起租', comboId: 'A' },
    { id: '9', label: '拆机' },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      sourceEntity: '正式受理',
      type: 'special-line',
    },
    {
      source: '1',
      target: '3',
      sourceEntity: '预受理',
      targetEntity: '（预订单）',
    },
    { source: '2', target: '5' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    {
      source: '5',
      target: '6',
      targetEntityL: '（补充合同、付费关系、修改资费等）',
    },
    { source: '6', target: '7' },
    { source: '7', target: '8', centerEntity: '审批通过' },
    { source: '8', target: '9' },
  ],
  combos: [
    {
      id: 'A',
      // label: 'combo A',
    },
  ],
};
export const typeFour = {
  nodes: [
    { id: '1', label: '客户创建' },
    { id: '2', label: '业务订购', comboId: 'A' },
    { id: '3', label: '资源核查', comboId: 'A' },
    { id: '4', label: '核查转订', comboId: 'A' },
    {
      id: '5',
      label: '资费审批',
      comboId: 'A',
      style: {
        lineDash: [5],
        fill: '#F2F2F2',
        stroke: '#D8D8D8',
        height: 36,
      },
    },
    {
      id: '6',
      label: '业务签订',
      comboId: 'A',
      style: { lineDash: [5], height: 36 },
    },
    {
      id: '7',
      label: '审批',
      comboId: 'A',
      type: 'diamond',
      style: { fill: '#F2F2F2', stroke: '#fff', height: 36 },
    },
    { id: '8', label: '起租', comboId: 'A' },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      sourceEntity: '正式受理',
      type: 'special-line',
    },
    {
      source: '1',
      target: '3',
      sourceEntity: '预受理',
      targetEntity: '（预订单）',
    },
    { source: '2', target: '5' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    {
      source: '5',
      target: '6',
      targetEntityL: '（补充合同、付费关系、修改资费等）',
    },
    { source: '6', target: '7' },
    { source: '7', target: '8', centerEntity: '审批通过' },
  ],
  combos: [
    {
      id: 'A',
      // label: 'combo A',
      padding: 10,
      style: { fill: '#4682B4' },
    },
  ],
};
