"""浏览器标签页图标（favicon）派生脚本。

来源：`Pc图片及图标/浏览器icon.png`（设计导出，1254×1254，透明底 + 圆角绿底 M 标）
产物（`public/`，均为站点根路径可访问）：

- `favicon.ico`        16 / 32 / 48 多尺寸，老浏览器与 `/favicon.ico` 默认请求
- `favicon-32.png`     现代浏览器优先用这张 PNG
- `apple-touch-icon.png` 180×180，iOS 主屏（实心底色，透明在 iOS 上会渲染成黑）

运行：`python scripts/build-favicon.py`
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "Pc图片及图标" / "浏览器icon.png"
OUT = ROOT / "public"

# 图标底板绿（取自导出稿主体色）
BADGE = (1, 66, 50, 255)


def trimmed_square(img: Image.Image) -> Image.Image:
    """按 alpha≥40 的实心区域裁成正方形（导出稿四周有透明留白，且边带噪点）。"""
    alpha = np.asarray(img)[:, :, 3]
    ys, xs = np.where(alpha >= 40)
    side = int(max(xs.max() - xs.min(), ys.max() - ys.min())) + 1
    cx = int((xs.min() + xs.max()) // 2)
    cy = int((ys.min() + ys.max()) // 2)
    half = side // 2
    return img.crop((cx - half, cy - half, cx - half + side, cy - half + side))


def main() -> None:
    mark = trimmed_square(Image.open(SRC).convert("RGBA"))

    mark.save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    mark.resize((32, 32), Image.LANCZOS).save(OUT / "favicon-32.png")

    tile = Image.new("RGBA", (180, 180), BADGE)
    art = mark.resize((180, 180), Image.LANCZOS)
    tile.paste(art, (0, 0), art)
    tile.convert("RGB").save(OUT / "apple-touch-icon.png")

    for name in ("favicon.ico", "favicon-32.png", "apple-touch-icon.png"):
        path = OUT / name
        print(f"{name:22} {path.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
