export const data = [
  {
    id: 1,
    category: '基础通信类',
    parentId: 0,
    isLeaf: 1,
    subCategory: [
      {
        id: 5,
        category: '基础数据类',
        parentId: 1,
        isLeaf: 1,
        subCategory: [
          {
            id: 11,
            category: '光纤出租',
            parentId: 5,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 1,
                name: '光纤出租（全国）',
                type: 6,
              },
              {
                id: 2,
                name: '光纤出租（代收费或落地管理）（全国）',
                type: 7,
              },
            ],
          },
          {
            id: 12,
            category: 'MPLS-VPN',
            parentId: 5,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 3,
                name: 'MPLS-VPN（全国）',
                type: 8,
              },
              {
                id: 4,
                name: 'MPLS VPN（代收费或落地管理）',
                type: 5,
              },
            ],
          },
          {
            id: 13,
            category: '以太网专线',
            parentId: 5,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 5,
                name: '以太网专线（全国）',
                type: 1,
              },
              {
                id: 6,
                name: '以太网专线（代收费或落地管理）（全国）',
                type: 1,
              },
            ],
          },
          {
            id: 14,
            category: 'SDH',
            parentId: 5,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 7,
                name: 'SDH专线商品（全国）',
                type: 1,
              },
              {
                id: 8,
                name: 'SDH专线（代收费或落地管理）（全国）',
                type: 1,
              },
            ],
          },
        ],
      },
      {
        id: 6,
        category: '互联网接入类',
        parentId: 1,
        isLeaf: 1,
        subCategory: [
          {
            id: 15,
            category: '互联网专线',
            parentId: 6,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 9,
                name: '互联网专线（全国）',
                type: 1,
              },
              {
                id: 10,
                name: '互联网专线（代收费或落地管理）（全国）',
                type: 1,
              },
            ],
          },
        ],
      },
      {
        id: 7,
        category: '智能网络类',
        parentId: 1,
        isLeaf: 1,
        subCategory: [
          {
            id: 16,
            category: '云联网类',
            parentId: 7,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 12,
                name: '云联网云接入（全国）',
                type: 3,
              },
              {
                id: 31,
                name: '云联网专线接入（全国）',
                type: 3,
              },
              {
                id: 32,
                name: 'SDWAN（全国）',
                type: 2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    category: '物联网产品',
    parentId: 0,
    isLeaf: 1,
    subCategory: [
      {
        id: 8,
        category: '物联网行业产品',
        parentId: 2,
        isLeaf: 0,
        subCategory: [],
        product: [
          {
            id: 11,
            name: '智能独立式烟感（全国）',
            type: 2,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    category: '大数据类',
    parentId: 0,
    isLeaf: 1,
    subCategory: [
      {
        id: 9,
        category: '数据产品/应用类',
        parentId: 3,
        isLeaf: 0,
        subCategory: [],
        product: [
          {
            id: 15,
            name: '数盾风控产品',
            type: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    category: '云计算类',
    parentId: 0,
    isLeaf: 1,
    subCategory: [
      {
        id: 10,
        category: '公有云类',
        parentId: 4,
        isLeaf: 1,
        subCategory: [
          {
            id: 17,
            category: '应用类（全国）',
            parentId: 10,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 16,
                name: '阿里云应用（全国）',
                type: 4,
              },
              {
                id: 19,
                name: '腾讯云应用（全国）',
                type: 4,
              },
            ],
          },
          {
            id: 18,
            category: '数据库类（全国）',
            parentId: 10,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 17,
                name: '阿里云数据库（全国）',
                type: 4,
              },
              {
                id: 20,
                name: '腾讯云数据库（全国）',
                type: 4,
              },
            ],
          },
          {
            id: 19,
            category: '计算类（全国）',
            parentId: 10,
            isLeaf: 0,
            subCategory: [],
            product: [
              {
                id: 18,
                name: '阿里云服务器（全国）',
                type: 4,
              },
              {
                id: 21,
                name: '腾讯云服务器（全国）',
                type: 4,
              },
            ],
          },
        ],
      },
    ],
  },
];
