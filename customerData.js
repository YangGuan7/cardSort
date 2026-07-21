const customerData = [
  // ===== 指定卡：優先分配 =====
  {
    id: "지윤",
    need: 8,
    fixedCards: ["燦", "旻", "旻", "辰", "城", "城", "菲", "玟"],
    preferences: []
  },
  {
    id: "yun",
    need: 4,
    fixedCards: ["燦", "菲", "玟", "寅",],
    preferences: []
  },
  {
    id: "ellie",
    need: 10,
    fixedCards: ["燦", "旻", "彬", "辰", "辰", "城", "菲", "玟", "寅", "寅"],
    preferences: []
  },
  {
    id: "Pinn",
    need: 4,
    fixedCards: ["旻", "城", "辰", "菲"],
    preferences: []
  },
  {
    id: "Rong",
    need: 12,
    fixedCards: ["城", "玟", "菲", "旻", "寅", "彬", "辰", "燦"],
    preferences: []
  },
  {
    id: "溫蒂",
    need: 4,
    fixedCards: ["辰", "菲", "燦", "玟"],
    preferences: []
  },

  // ===== 一般分配 =====
  {
    id: "Jennie Lin",
    need: 14,
    fixedCards: [],
    preferences: ["辰", "菲", "旻", "玟", "城", "寅", "彬", "燦"]
  },
  {
    id: "鵺羽🪶",
    need: 12,
    fixedCards: [],
    preferences: ["菲", "旻", "辰", "燦", "寅", "玟", "城", "彬"]
  },
  {
    id: "Miii",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "旻", "玟", "寅", "城", "辰", "彬", "燦"]
  },
  {
    id: "Winnie",
    need: 2,
    fixedCards: [],
    preferences: ["菲", "辰", "城", "玟", "旻", "寅", "燦", "彬"]
  },
  {
    id: "妤._.",
    need: 6,
    fixedCards: [],
    preferences: ["菲", "辰", "旻", "玟", "燦", "寅", "城", "彬"]
  },
  {
    id: "Maggie",
    need: 16,
    fixedCards: [],
    preferences: ["城", "菲", "玟", "旻", "辰", "寅", "燦", "彬"]
  },
  {
    id: "🐰🐰",
    need: 8,
    fixedCards: [],
    preferences: ["辰", "旻", "菲", "玟", "寅", "城", "燦", "彬"]
  },
  {
    id: "Hazelixx",
    need: 2,
    fixedCards: [],
    preferences: ["菲", "旻", "玟", "辰", "寅", "燦", "城", "彬"]
  },
  {
    id: "晏秀",
    need: 6,
    fixedCards: [],
    preferences: ["辰", "寅", "玟", "菲", "旻", "城", "彬", "燦"]
  },
  {
    id: "黃玉玟",
    need: 4,
    fixedCards: [],
    preferences: ["寅", "玟", "城", "旻", "辰", "菲", "燦", "彬"]
  },
  {
    id: "泡芙",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "辰", "寅", "城", "玟", "旻", "燦", "彬"]
  },
  {
    id: "VVVVVVVicky",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "旻", "玟", "寅", "城", "彬", "辰", "燦"]
  },
  {
    id: "羊",
    need: 28,
    fixedCards: [],
    preferences: ["辰", "菲", "旻", "燦", "玟", "寅", "城", "彬"]
  },
  {
    id: "蕃茄金針菇",
    need: 16,
    fixedCards: [],
    preferences: ["城", "旻", "菲", "辰", "玟", "寅", "燦", "彬"]
  },
  {
    id: "Bbama",
    need: 14,
    fixedCards: [],
    preferences: ["城", "菲", "旻", "玟", "辰", "寅", "燦", "彬"]
  },
  {
    id: "Lin Cheyu",
    need: 12,
    fixedCards: [],
    preferences: ["菲", "辰", "玟", "寅", "旻", "城", "燦", "彬"]
  },
  {
    id: "Yoyo",
    need: 2,
    fixedCards: [],
    preferences: ["菲", "辰", "寅", "旻", "城", "玟", "燦", "彬"]
  },
  {
    id: "Christine",
    need: 14,
    fixedCards: [],
    preferences: ["辰", "菲", "玟", "燦", "城", "寅", "彬", "旻"]
  },
  {
    id: "喵",
    need: 6,
    fixedCards: [],
    preferences: ["玟", "辰", "菲", "旻", "寅", "城", "彬", "燦"]
  },
  {
    id: "shao",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "辰", "玟", "寅", "燦", "彬", "旻", "城"]
  },
  {
    id: "Sophia Wang",
    need: 2,
    fixedCards: [],
    preferences: ["玟", "旻", "寅", "辰", "城", "菲", "燦", "彬"]
  },
  {
    id: "felicia",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "玟", "辰", "城", "寅", "旻", "燦", "彬"]
  },
  {
    id: "heehee",
    need: 4,
    fixedCards: [],
    preferences: ["旻", "玟", "寅", "菲", "辰", "城", "燦", "彬"]
  },
  {
    id: "Winnie Chew",
    need: 8,
    fixedCards: [],
    preferences: ["燦", "玟", "旻", "城", "菲", "辰", "寅", "彬"]
  },
  {
    id: "ChiaChia",
    need: 32,
    fixedCards: [],
    preferences: ["城", "玟", "旻", "辰", "菲", "寅", "燦", "彬"]
  },
  {
    id: "謝小雨",
    need: 18,
    fixedCards: [],
    preferences: ["城", "旻", "燦", "辰", "菲", "玟", "寅", "彬"]
  },
  {
    id: "Yuu",
    need: 10,
    fixedCards: [],
    preferences: ["菲", "旻", "辰", "城", "寅", "玟", "燦", "彬"]
  },
  {
    id: "hyj",
    need: 2,
    fixedCards: [],
    preferences: ["玟", "辰", "菲", "寅", "旻", "城", "燦", "彬"]
  },
  {
    id: "POTATO🥔",
    need: 4,
    fixedCards: [],
    preferences: ["辰", "城", "菲", "玟", "寅", "燦", "旻", "彬"]
  },
  {
    id: "Khyc Wxwc",
    need: 24,
    fixedCards: [],
    preferences: ["城", "菲", "辰", "玟", "寅", "旻", "燦", "彬"]
  },
  {
    id: "croissant",
    need: 2,
    fixedCards: [],
    preferences: ["旻", "玟", "寅", "辰", "菲", "城", "彬", "燦"]
  },
  {
    id: "金昇米",
    need: 6,
    fixedCards: [],
    preferences: ["玟", "城", "菲", "辰", "旻", "寅", "燦", "彬"]
  },
  {
    id: "俞",
    need: 6,
    fixedCards: [],
    preferences: ["城", "玟", "辰", "寅", "菲", "旻", "燦", "彬"]
  },
  {
    id: "Yu Hsi",
    need: 4,
    fixedCards: [],
    preferences: ["辰", "旻", "城", "菲", "玟", "寅", "燦", "彬"]
  },
  {
    id: "Niku🐰",
    need: 4,
    fixedCards: [],
    preferences: ["旻", "玟", "寅", "燦", "辰", "菲", "彬", "城"]
  },
  {
    id: "檸檬",
    need: 4,
    fixedCards: [],
    preferences: ["玟", "辰", "菲", "旻", "城", "燦", "寅", "彬"]
  },
  {
    id: "都布惠",
    need: 2,
    fixedCards: [],
    preferences: ["城", "菲", "旻", "玟", "寅", "辰", "燦", "彬"]
  },
  {
    id: "Lailai",
    need: 14,
    fixedCards: [],
    preferences: ["城", "旻", "菲", "辰", "燦", "寅", "玟", "彬"]
  },
  {
    id: "湯）",
    need: 4,
    fixedCards: [],
    preferences: ["辰", "燦", "菲", "旻", "寅", "城", "玟", "彬"]
  },
  {
    id: "🌧️",
    need: 2,
    fixedCards: [],
    preferences: ["寅", "菲", "玟", "城", "辰", "旻", "彬", "燦"]
  },
  {
    id: "羅茸幽",
    need: 4,
    fixedCards: [],
    preferences: ["寅", "菲", "旻", "玟", "城", "辰", "燦", "彬"]
  },
  {
    id: "丸",
    need: 6,
    fixedCards: [],
    preferences: ["菲", "辰", "玟", "旻", "城", "寅", "彬", "燦"]
  },
  {
    id: "黃柔斐",
    need: 14,
    fixedCards: [],
    preferences: ["寅", "菲", "玟", "辰", "旻", "城", "燦", "彬"]
  },
  {
    id: "竹筍",
    need: 6,
    fixedCards: [],
    preferences: ["辰", "菲", "旻", "城", "玟", "寅", "燦", "彬"]
  },
  {
    id: "巧沛",
    need: 22,
    fixedCards: [],
    preferences: ["菲", "旻", "城", "辰", "玟", "燦", "寅", "彬"]
  },
  {
    id: "Mimi",
    need: 2,
    fixedCards: [],
    preferences: ["旻", "辰", "菲", "燦", "城", "寅", "玟", "彬"]
  },
  {
    id: "黃子其",
    need: 2,
    fixedCards: [],
    preferences: ["菲", "辰", "寅", "玟", "燦", "城", "旻", "彬"]
  },
  {
    id: "蠅",
    need: 10,
    fixedCards: [],
    preferences: ["旻", "燦", "辰", "寅", "城", "菲", "玟", "彬"]
  },
  {
    id: "鄧名家",
    need: 10,
    fixedCards: [],
    preferences: ["寅", "燦", "菲", "辰", "旻", "城", "玟", "彬"]
  },
  {
    id: "함함",
    need: 10,
    fixedCards: [],
    preferences: ["辰", "菲", "寅", "玟", "旻", "城", "燦", "彬"]
  },
  {
    id: "Sun",
    need: 2,
    fixedCards: [],
    preferences: ["辰", "菲", "城", "玟", "寅", "旻", "燦", "彬"]
  },
  {
    id: "木",
    need: 20,
    fixedCards: [],
    preferences: ["城", "旻", "辰", "玟", "寅", "彬", "燦", "菲"]
  },
  {
    id: "Han Ni",
    need: 2,
    fixedCards: [],
    preferences: ["菲", "辰", "寅", "玟", "城", "彬", "旻", "燦"]
  },
  {
    id: "金聖米",
    need: 2,
    fixedCards: [],
    preferences: ["玟", "城", "旻", "菲", "辰", "寅", "彬", "燦"]
  },
  {
    id: "Lu Yu Hsuan",
    need: 8,
    fixedCards: [],
    preferences: ["菲", "辰", "城", "旻", "玟", "寅", "燦", "彬"]
  },
  {
    id: "泰奶",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "辰", "城", "寅", "燦", "旻", "玟", "彬"]
  },
  {
    id: "懵懵",
    need: 2,
    fixedCards: [],
    preferences: ["玟", "燦", "城", "旻", "彬", "菲", "寅", "辰"]
  },
  {
    id: "張熊",
    need: 8,
    fixedCards: [],
    preferences: ["玟", "旻", "寅", "菲", "城", "辰", "彬", "燦"]
  },
  {
    id: "Hannnni",
    need: 8,
    fixedCards: [],
    preferences: ["城", "寅", "旻", "菲", "辰", "玟", "燦", "彬"]
  },
  {
    id: "蛋",
    need: 8,
    fixedCards: [],
    preferences: ["城", "辰", "旻", "燦", "寅", "菲", "彬", "玟"]
  },
  {
    id: "윤은",
    need: 4,
    fixedCards: [],
    preferences: ["寅", "菲", "玟", "辰", "城", "燦", "旻", "彬"]
  },
  {
    id: "Phoebe",
    need: 4,
    fixedCards: [],
    preferences: ["燦", "菲", "玟", "寅", "旻", "城", "彬", "辰"]
  },
  {
    id: "許家潼",
    need: 2,
    fixedCards: [],
    preferences: ["菲", "彬", "寅", "城", "旻", "燦", "辰", "玟"]
  },
  {
    id: "簡",
    need: 4,
    fixedCards: [],
    preferences: ["菲", "旻", "寅", "城", "辰", "燦", "彬", "玟"]
  },
  {
    id: "lu",
    need: 8,
    fixedCards: [],
    preferences: ["彬", "菲", "辰", "城", "旻", "燦", "寅","玟"]
  },
  {
    id: "牛琦崴",
    need: 12,
    fixedCards: [],
    preferences: ["旻", "菲", "玟", "辰", "城", "寅", "燦", "彬"]
  },
  {
    id: "🍞☁️",
    need: 2,
    fixedCards: [],
    preferences: ["寅", "菲", "城", "辰", "玟", "旻", "彬", "燦"]
  },
  {
    id: "yyu",
    need: 6,
    fixedCards: [],
    preferences: ["菲", "辰", "城", "玟", "寅", "旻", "燦", "彬"]
  },
  {
    id: "灰",
    need: 6,
    fixedCards: [],
    preferences: ["燦", "旻", "玟", "寅", "辰", "菲", "彬", "城"]
  }
];