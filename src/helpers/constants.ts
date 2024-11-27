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

// image_S1FWC01
// image_S1FWC02
// image_S1FWC03
// image_S1FWC04
// image_S2FWC01
// image_S2FWC02
// image_S2FWC03
// image_S2FWC04
// image_S3FWC01
// image_S3FWC02
// image_S3FWC03
// image_S3FWC04
// image_S1MWC01
// image_S1MWC02
// image_S1MWC03
// image_S1MWC04
// image_S2MWC01
// image_S2MWC02
// image_S2MWC03
// image_S2MWC04
// image_S3MWC01
// image_S3MWC02
// image_S3MWC03
// image_S3MWC04
// image_S1FBC01
// image_S1FBC02
// image_S1FBC03
// image_S1FBC04
// image_S2FBC01
// image_S2FBC02
// image_S2FBC03
// image_S2FBC04
// image_S3FBC01
// image_S3FBC02
// image_S3FBC03
// image_S3FBC04
// image_S1MBC01
// image_S1MBC02
// image_S1MBC03
// image_S1MBC04
// image_S2MBC01
// image_S2MBC02
// image_S2MBC03
// image_S2MBC04
// image_S3MBC01
// image_S3MBC02
// image_S3MBC03
// image_S3MBC04
export const HOME_DATA = [
  // Series 1 Female White
  { id: "S1FW1", img: "image_S1FWC01.png" },
  { id: "S1FW2", img: "image_S1FWC02.png" },
  { id: "S1FW3", img: "image_S1FWC03.png" },
  { id: "S1FW4", img: "image_S1FWC04.png" },

  // Series 2 Female White
  { id: "S2FW1", img: "image_S2FWC01.png" },
  { id: "S2FW2", img: "image_S2FWC02.png" },
  { id: "S2FW3", img: "image_S2FWC03.png" },
  { id: "S2FW4", img: "image_S2FWC04.png" },

  // Series 3 Female White
  { id: "S3FW1", img: "image_S3FWC01.png" },
  { id: "S3FW2", img: "image_S3FWC02.png" },
  { id: "S3FW3", img: "image_S3FWC03.png" },
  { id: "S3FW4", img: "image_S3FWC04.png" },

  // Series 1 Male White
  { id: "S1MW1", img: "image_S1MWC01.png" },
  { id: "S1MW2", img: "image_S1MWC02.png" },
  { id: "S1MW3", img: "image_S1MWC03.png" },
  { id: "S1MW4", img: "image_S1MWC04.png" },

  // Series 2 Male White
  { id: "S2MW1", img: "image_S2MWC01.png" },
  { id: "S2MW2", img: "image_S2MWC02.png" },
  { id: "S2MW3", img: "image_S2MWC03.png" },
  { id: "S2MW4", img: "image_S2MWC04.png" },

  // Series 3 Male White
  { id: "S3MW1", img: "image_S3MWC01.png" },
  { id: "S3MW2", img: "image_S3MWC02.png" },
  { id: "S3MW3", img: "image_S3MWC03.png" },
  { id: "S3MW4", img: "image_S3MWC04.png" },

  // Series 1 Female Black
  { id: "S1FB1", img: "image_S1FBC01.png" },
  { id: "S1FB2", img: "image_S1FBC02.png" },
  { id: "S1FB3", img: "image_S1FBC03.png" },
  { id: "S1FB4", img: "image_S1FBC04.png" },

  // Series 2 Female Black
  { id: "S2FB1", img: "image_S2FBC01.png" },
  { id: "S2FB2", img: "image_S2FBC02.png" },
  { id: "S2FB3", img: "image_S2FBC03.png" },
  { id: "S2FB4", img: "image_S2FBC04.png" },

  // Series 3 Female Black
  { id: "S3FB1", img: "image_S3FBC01.png" },
  { id: "S3FB2", img: "image_S3FBC02.png" },
  { id: "S3FB3", img: "image_S3FBC03.png" },
  { id: "S3FB4", img: "image_S3FBC04.png" },

  // Series 1 Male Black
  { id: "S1MB1", img: "image_S1MBC01.png" },
  { id: "S1MB2", img: "image_S1MBC02.png" },
  { id: "S1MB3", img: "image_S1MBC03.png" },
  { id: "S1MB4", img: "image_S1MBC04.png" },

  // Series 2 Male Black
  { id: "S2MB1", img: "image_S2MBC01.png" },
  { id: "S2MB2", img: "image_S2MBC02.png" },
  { id: "S2MB3", img: "image_S2MBC03.png" },
  { id: "S2MB4", img: "image_S2MBC04.png" },

  // Series 3 Male Black
  { id: "S3MB1", img: "image_S3MBC01.png" },
  { id: "S3MB2", img: "image_S3MBC02.png" },
  { id: "S3MB3", img: "image_S3MBC03.png" },
  { id: "S3MB4", img: "image_S3MBC04.png" },
];
