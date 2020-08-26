export const data = [
  {
    category: '基础通信类',
    id: 1,
    subCategory: [
      {
        category: '基础数据类',
        id: 5,
        subCategory: [
          {
            category: '光纤出租',
            id: 8,
            product: [
              { name: '光纤出租（全国）', productId: '1', type: 1 },
              { name: '光纤出租（代收费或落地管理）（全国）', productId: '2', type: 1 },
            ],
          },
          {
            category: 'MPLS-VPN',
            id: 9,
            product: [
              { name: 'MPLS-VPN（全国）', productId: '3', type: 1 },
              { name: 'MPLS-VPN（代收费或落地管理）', productId: '4', type: 1 },
            ],
          },
          {
            category: '以太网专线',
            id: 10,
            product: [
              { name: '以太网专线（全国）', productId: '5', type: 1 },
              { name: '以太网专线（代收费或落地管理）（全国）', productId: '6', type: 1 },
            ],
          },
          {
            category: 'SDH',
            id: 11,
            product: [
              { name: 'SDH专线商品（全国）', productId: '7', type: 1 },
              { name: 'SDH专线（代收费或落地管理）（全国）', productId: '8', type: 1 },
            ],
          },
        ],
      },
      {
        category: '互联网接入类',
        id: 6,
        subCategory: [
          {
            category: '互联网专线',
            id: 12,
            product: [
              { name: '互联网专线（全国）', productId: '9', type: 1 },
              { name: '互联网专线（代收费或落地管理）（全国）', productId: '10', type: 1 },
            ],
          },
        ],
      },
      {
        category: '智能网络类',
        id: 7,
        subCategory: [
          {
            category: '云联网类',
            id: 13,
            product: [
              { name: '云联网云接入（全国）', productId: '11', type: 3 },
              { name: '云联网云专线接入（全国）', productId: '12', type: 3 },
              { name: 'SDWAN（全国）', productId: '13', type: 2 },
            ],
          },
        ],
      },
    ],
  },
  {
    category: '物联网产品',
    id: 2,
    subCategory: [
      {
        category: '物联网行业产品',
        id: 14,
        product: [{ name: '智能独立式烟感全国（全国）', productId: '14', type: 2 }],
      },
    ],
  },
  {
    category: '大数据类',
    id: 3,
    subCategory: [
      {
        category: '数据产品/应用类',
        id: 15,
        product: [{ name: '数盾风控产品', productId: '21', type: 2 }],
      },
    ],
  },
  {
    category: '云计算类',
    id: 4,
    subCategory: [
      {
        category: '公有云类',
        id: 16,
        subCategory: [
          {
            category: '应用类（全国）',
            id: 17,
            product: [
              { name: '阿里云应用（全国）', productId: '15', type: 4 },
              { name: '腾讯云应用（全国）', productId: '16', type: 4 },
            ],
          },
          {
            category: '数据库类（全国）',
            id: 18,
            product: [
              { name: '阿里云数据库（全国）', productId: '17', type: 4 },
              { name: '腾讯云数据库（全国）', productId: '18', type: 4 },
            ],
          },
          {
            category: '计算类（全国）',
            id: 19,
            product: [
              { name: '阿里云服务器（全国）', productId: '19', type: 4 },
              { name: '腾讯云服务器（全国）', productId: '20', type: 4 },
            ],
          },
        ],
      },
    ],
  },
];
