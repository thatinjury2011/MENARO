"""生成默认社交分享图（og:image）1200×630。

产物：`public/og-default.png`，被 `src/layouts/Base.astro` 的 og:image / twitter:image 引用。
品牌绿卡：深绿渐变底 + 白色横版 logo + 英文标语 + 域名。

运行：`python scripts/build-og-image.py`
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "public" / "brand" / "logo-white.png"
OUT = ROOT / "public" / "og-default.png"

W, H = 1200, 630
TOP = (8, 60, 48)  # #083c30
BOTTOM = (3, 38, 30)  # #03261e
GOLD = (180, 150, 91)  # #b4965b
WHITE = (255, 255, 255)

TAGLINE = "Building materials manufacturing & global supply"
DOMAIN = "www.menarobm.com"

LATIN_FONTS = [
    "C:/Windows/Fonts/segoeuil.ttf",
    "C:/Windows/Fonts/segoeui.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def font(size: int) -> ImageFont.FreeTypeFont:
    for path in LATIN_FONTS:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size)


def gradient() -> Image.Image:
    img = Image.new("RGB", (W, H), TOP)
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        draw.line(
            [(0, y), (W, y)],
            fill=tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3)),
        )
    return img


def main() -> None:
    img = gradient().convert("RGBA")
    draw = ImageDraw.Draw(img)

    logo = Image.open(LOGO).convert("RGBA")
    logo_h = 112
    logo_w = round(logo.width * logo_h / logo.height)
    logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
    img.alpha_composite(logo, ((W - logo_w) // 2, 190))

    # 金色分隔线
    line_w, line_y = 64, 352
    draw.rectangle([(W - line_w) // 2, line_y, (W + line_w) // 2, line_y + 3], fill=GOLD)

    tag_font = font(34)
    tag_box = draw.textbbox((0, 0), TAGLINE, font=tag_font)
    draw.text(((W - (tag_box[2] - tag_box[0])) / 2, 392), TAGLINE, font=tag_font, fill=(255, 255, 255, 214))

    dom_font = font(24)
    dom_box = draw.textbbox((0, 0), DOMAIN, font=dom_font)
    draw.text(
        ((W - (dom_box[2] - dom_box[0])) / 2, 460),
        DOMAIN,
        font=dom_font,
        fill=(255, 255, 255, 138),
    )

    img.convert("RGB").save(OUT, optimize=True)
    print(f"og-default.png {OUT.stat().st_size / 1024:.1f} KB  {W}x{H}")


if __name__ == "__main__":
    main()
