export const IMAGE_URLS = {
  ROG_GAMER_CARD: "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard",

  ROG_GAMER_CARD_GIF: "https://r2.web.moonshine.tw/msweb/roggamercard",
  ROG_NEO_GAMER_SM:
    "https://r2.web.moonshine.tw/opt/sm/msweb/rogneogamer/prototype/",
  ROG_NEO_GAMER_MD:
    "https://r2.web.moonshine.tw/opt/md/msweb/rogneogamer/prototype/",
  ROG_NEO_GAMER_LG:
    "https://r2.web.moonshine.tw/opt/lg/msweb/rogneogamer/prototype/",
  ROG_NEO_GAMER: "https://r2.web.moonshine.tw/msweb/rogneogamer/prototype/",
} as const;

// 如果需要，也可以加入其他常用的 helper 函數
export const getImageUrl = (base: keyof typeof IMAGE_URLS, path: string) => {
  return `${IMAGE_URLS[base]}${path}`;
};

// S1FWC01
// S1FWC02
// S1FWC03
// S1FWC04
// S2FWC01
// S2FWC02
// S2FWC03
// S2FWC04
// S3FWC01
// S3FWC02
// S3FWC03
// S3FWC04
// S1MWC01
// S1MWC02
// S1MWC03
// S1MWC04
// S2MWC01
// S2MWC02
// S2MWC03
// S2MWC04
// S3MWC01
// S3MWC02
// S3MWC03
// S3MWC04
// S1FBC01
// S1FBC02
// S1FBC03
// S1FBC04
// S2FBC01
// S2FBC02
// S2FBC03
// S2FBC04
// S3FBC01
// S3FBC02
// S3FBC03
// S3FBC04
// S1MBC01
// S1MBC02
// S1MBC03
// S1MBC04
// S2MBC01
// S2MBC02
// S2MBC03
// S2MBC04
// S3MBC01
// S3MBC02
// S3MBC03
// S3MBC04
export const HOME_DATA = [
  // Group 1 (C01)
  { id: "S1FW1", img: "S1FWC01.png" },
  { id: "S1MB1", img: "S1MBC01.png" },
  { id: "S2FW1", img: "S2FWC01.png" },
  { id: "S2MB1", img: "S2MBC01.png" },
  { id: "S3FW1", img: "S3FWC01.png" },
  { id: "S3MB1", img: "S3MBC01.png" },

  // Group 2 (C02)
  { id: "S1FB2", img: "S1FBC02.png" },
  { id: "S1MW2", img: "S1MWC02.png" },
  { id: "S2FB2", img: "S2FBC02.png" },
  { id: "S2MW2", img: "S2MWC02.png" },
  { id: "S3FB2", img: "S3FBC02.png" },
  { id: "S3MW2", img: "S3MWC02.png" },

  // Group 3 (C03)
  { id: "S1FW3", img: "S1FWC03.png" },
  { id: "S1MB3", img: "S1MBC03.png" },
  { id: "S2FW3", img: "S2FWC03.png" },
  { id: "S2MB3", img: "S2MBC03.png" },
  { id: "S3FW3", img: "S3FWC03.png" },
  { id: "S3MB3", img: "S3MBC03.png" },

  // Group 4 (C04)
  { id: "S1FB4", img: "S1FBC04.png" },
  { id: "S1MW4", img: "S1MWC04.png" },
  { id: "S2FB4", img: "S2FBC04.png" },
  { id: "S2MW4", img: "S2MWC04.png" },
  { id: "S3FB4", img: "S3FBC04.png" },
  { id: "S3MW4", img: "S3MWC04.png" },
];

export const SERIES_DATA = [
  {
    id: "1",
    name: "Modding Hacker",
    description:
      "Tailored for tech enthusiasts and DIY fans, unleash your creativity and showcase your unique personality!",
    img: "SS1.png",
  },
  {
    id: "2",
    name: "Extreme Speedster ​",
    description:
      "Designed for challengers seeking peak performance, embodying the fusion of professional expertise and cutting-edge technology!​",
    img: "SS2.png",
  },
  {
    id: "3",
    name: "ACG Fanatic​",
    description:
      "Dive into the spirit of the ACG world and infuse your passion into your player identity with vibrant, soulful style!",
    img: "SS3.png",
  },
];

export const ASSET_DATA = [
  { id: "1", name: "S1A1", title: "Modding Lab" },
  { id: "2", name: "S1A2", title: "Trendy Creation Lab" },
  { id: "3", name: "S2A1", title: "Racing Speedsters" },
  { id: "4", name: "S2A2", title: "Sports Collectibles" },
  { id: "5", name: "S3A1", title: "Anime Collectibles" },
  { id: "6", name: "S3A2", title: "Space Mecha" },
];
