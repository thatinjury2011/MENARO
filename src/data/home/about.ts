// 对应 src/components/home/About.astro
export const about = {
  zh: {
    title: "关于MENARO",
    blurb:
      "MENARO 是瓷砖铺贴系统解决方案专家，融合意大利技术，提供高端、环保、可靠的产品，服务全球专业项目。",
    cta: "了解我们",
  },
  en: {
    title: "About MENARO",
    blurb:
      "MENARO specializes in tile installation systems — combining Italian technology with premium, environmentally responsible products for professional projects worldwide.",
    cta: "Learn More",
  },
};

/** 标题两侧的装饰水印：纯装饰、不随语言变，故不进 locale 结构 */
export const aboutWatermarks = { left: "ABOUT", right: "US" };
