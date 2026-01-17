import os
import shutil

source_dir = r"c:\personalwork\git\gg-profile\public\images"
dest_root = r"c:\personalwork\git\gg-profile\public\assets"

mapping = {
    # Characters
    "pikaru-full.png": "characters",
    "pikaru-bust.png": "characters",
    "pikaru-icon.png": "characters",
    "pikaru-line.svg": "characters",
    "neon-full.png": "characters",
    "neon-bust.png": "characters",
    "neon-icon.png": "characters",
    "neon-line.svg": "characters",
    "minto-full.png": "characters",
    "minto-bust.png": "characters",
    "minto-icon.png": "characters",
    "minto-line.svg": "characters",

    # Backgrounds
    "hero-bg.png": "backgrounds",

    # Patterns
    "pattern-dots.svg": "patterns",
    "pattern-stars.svg": "patterns",
    "pattern-grid.svg": "patterns",

    # Decorations
    "sparkle-1.svg": "decorations",
    "sparkle-2.svg": "decorations",
    "star-1.svg": "decorations",
    "star-2.svg": "decorations",
    "heart.svg": "decorations",
    "gamepad.svg": "decorations",
    "keyboard.svg": "decorations",
    "headset.svg": "decorations",
    "controller-buttons.svg": "decorations",

    # Brand
    "logo.svg": "brand",
    "logo-icon.svg": "brand",
    "og-image.png": "brand"
}

for filename, category in mapping.items():
    src = os.path.join(source_dir, filename)
    dst = os.path.join(dest_root, category, filename)

    if os.path.exists(src):
        try:
            shutil.move(src, dst)
            print(f"Moved {filename} to {category}")
        except Exception as e:
            print(f"Error moving {filename}: {e}")
    else:
        print(f"Source not found: {filename}")
