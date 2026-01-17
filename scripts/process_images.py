import os
from PIL import Image

def create_variations(name, full_path):
    try:
        if not os.path.exists(full_path):
            print(f"Skipping {name}: {full_path} not found")
            return

        img = Image.open(full_path)
        width, height = img.size

        # Create Bust (256x256) - Crop center-top
        # Assuming character is centered.
        # Crop 512x512 -> 256x256. Let's take center, slightly upper.
        left = (width - 256) / 2
        top = (height - 256) / 3 # Higher up for bust
        right = (width + 256) / 2
        bottom = top + 256

        bust = img.crop((left, top, right, bottom))
        bust_path = full_path.replace("full.png", "bust.png")
        bust.save(bust_path)
        print(f"Created {bust_path}")

        # Create Icon (128x128) - Resize bust or full?
        # Usually icon is face. Let's resize the bust crop to 128x128
        icon = bust.resize((128, 128))
        icon_path = full_path.replace("full.png", "icon.png")
        icon.save(icon_path)
        print(f"Created {icon_path}")

    except Exception as e:
        print(f"Error processing {name}: {e}")

base_dir = r"c:\personalwork\git\gg-profile\public\assets\characters"
# Only Pikaru needs update for Full variations, but running for all is safe and ensures consistency if others changed slightly.
characters = ["pikaru", "neon", "minto"]

for char in characters:
    create_variations(char, os.path.join(base_dir, f"{char}-full.png"))
