// 北京美食地图 - 餐厅数据
// 每家餐厅: name(名称), lat/lng(坐标), desc(简介), tags(标签), images(图片数组), link(原文链接), price(人均), address(地址)
// 坐标用北京中心区域，待补充餐厅后逐个定位

const restaurantCategories = [
  { id: "pretty", name: "漂亮饭", icon: "✨", desc: "颜值与氛围并存的精致餐厅" },
  { id: "tasty", name: "美味饭", icon: "🍜", desc: "口味出众、值得专程去吃的美味" }
];

const restaurants = [
  {
    name: "Tavola Italian Dining",
    category: "pretty",
    lat: 39.9242,
    lng: 116.4717,
    address: "官舍北区二层（亮马桥）",
    price: "¥400/人",
    desc: "黑珍珠老钱风意餐卷王。双主厨地中海菜，约会氛围拉满。\n· 羊奶芝士包裹的羊肉饺子\n· 安格斯西冷牛排配意大利黑醋\n· 西班牙pil-pil酱汁银鳕鱼\n· 果木炭烤布拉塔披萨",
    tags: ["黑珍珠", "意餐", "氛围感", "约会"],
    images: [
      "images/restaurant-1/img-02.jpg",
      "images/restaurant-1/img-03.jpg",
      "images/restaurant-1/img-07.jpg",
      "images/restaurant-1/img-08.jpg",
      "images/restaurant-1/img-09.jpg",
      "images/restaurant-1/img-10.jpg",
      "images/restaurant-1/img-12.jpg",
      "images/restaurant-1/img-14.jpg"
    ],
    link: "https://www.xiaohongshu.com/discovery/item/68ef8abc000000000300e7a0"
  },
  {
    name: "庭院江南菜（北沙滩店）",
    category: "tasty",
    lat: 40.0001,
    lng: 116.3620,
    address: "北沙滩（海淀区学院路）",
    price: "人均适中",
    desc: "北京榜上有名的江浙菜，江南水乡庭院风格，布景雅致，卡座私密性强。主打江浙菜+烤鸭。\n· 非遗糖葱烤鸭 — 甜、咸、脆口感超丰富\n· 手打年糕红烧肉 — 年糕软糯，汤汁拌饭绝了\n· 小炒肉 — 微辣，肉大片焦香，含脆饼吸汁\n· 离店还送冰糖葫芦，体验感很棒",
    tags: ["江浙菜", "烤鸭", "庭院风", "私密"],
    images: [
      "images/restaurant-2/img-01.jpg",
      "images/restaurant-2/img-03.jpg",
      "images/restaurant-2/img-04.jpg",
      "images/restaurant-2/img-05.jpg",
      "images/restaurant-2/img-06.jpg",
      "images/restaurant-2/img-07.jpg",
      "images/restaurant-2/img-08.jpg",
      "images/restaurant-2/img-09.jpg",
      "images/restaurant-2/img-10.jpg",
      "images/restaurant-2/img-11.jpg",
      "images/restaurant-2/img-12.jpg"
    ],
    link: "https://www.xiaohongshu.com/discovery/item/693b9f42000000000d03c641"
  },
  {
    name: "和木THE HOME·胡同",
    category: "pretty",
    lat: 39.8920,
    lng: 116.3820,
    address: "樱桃斜街（前门）",
    price: "高端私厨（预订制）",
    desc: "承袭胡同肌理，融合当代空间美学的焕新之作——「和木胡同·境」。老宅焕新，一座真正「会呼吸」的庭院餐厅。\n· 青砖灰瓦间的现代美学空间\n· 落地窗倒映胡同疏影\n· 银器与陶艺碰撞高级感\n· 私密庭院，最具北京胡同人文气息\n· 高端精致中餐，适合商务宴请与活动场地",
    tags: ["高端中餐", "胡同", "庭院", "商务宴请"],
    images: [
      "images/restaurant-3/img-01.jpg",
      "images/restaurant-3/img-02.jpg",
      "images/restaurant-3/img-03.jpg",
      "images/restaurant-3/img-04.jpg",
      "images/restaurant-3/img-05.jpg",
      "images/restaurant-3/img-06.jpg",
      "images/restaurant-3/img-07.jpg",
      "images/restaurant-3/img-08.jpg",
      "images/restaurant-3/img-09.jpg",
      "images/restaurant-3/img-10.jpg",
      "images/restaurant-3/img-11.jpg",
      "images/restaurant-3/img-12.jpg"
    ],
    link: "https://www.xiaohongshu.com/discovery/item/6900489b0000000003036984"
  },
  {
    name: "亮马河黑珍珠法餐",
    category: "pretty",
    lat: 39.9455,
    lng: 116.4510,
    address: "亮马河（三里屯街道）",
    price: "高端Fine Dining（黑珍珠）",
    desc: "亮马河边的小众法餐，灯光氛围感十足，适合约会。个人认为北京Top3的Fine Dining，值得反复去。定制菜单很有创意，可以印上自己的名字。\n· 帝王蟹配拉维亚鱼子酱\n· 卤水鹅肝批\n· 油封一日干东星斑\n· 澳洲M9和牛费列罗\n· 甜品阳光玫瑰薄片等",
    tags: ["法餐", "黑珍珠", "约会", "Fine Dining"],
    images: [
      "images/restaurant-4/img-01.jpg",
      "images/restaurant-4/img-02.jpg",
      "images/restaurant-4/img-03.jpg",
      "images/restaurant-4/img-04.jpg",
      "images/restaurant-4/img-05.jpg",
      "images/restaurant-4/img-06.jpg",
      "images/restaurant-4/img-07.jpg",
      "images/restaurant-4/img-08.jpg",
      "images/restaurant-4/img-09.jpg",
      "images/restaurant-4/img-10.jpg"
    ],
    link: "https://www.xiaohongshu.com/discovery/item/69031853000000000301e7fc"
  }
];
