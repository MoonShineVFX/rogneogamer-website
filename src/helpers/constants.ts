export const IMAGE_URLS = {
  ROG_GAMER_CARD: "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard",
  ROG_NEO_GAMER:
    "https://r2.web.moonshine.tw/opt/md/msweb/rogneogamer/prototype/",
  ROG_GAMER_CARD_GIF: "https://r2.web.moonshine.tw/msweb/roggamercard",
} as const;

// 如果需要，也可以加入其他常用的 helper 函數
export const getImageUrl = (base: keyof typeof IMAGE_URLS, path: string) => {
  return `${IMAGE_URLS[base]}${path}`;
};
