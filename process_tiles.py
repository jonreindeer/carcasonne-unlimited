from PIL import Image

# Load the original image
img = Image.open('carcasonne-tiles/carcasonne-tiles.jpg')
width, height = img.size
print(f"Original image size: {width}x{height}")

# We have a 5x5 grid of tiles
# Looking at the image, we need to manually identify where the actual tile content is
# by excluding the white borders and black text

# Approximate layout: tiles appear to be around 100x100 with borders/spacing
# Total width: 545, Total height: 600
# This suggests: 545/5 = 109 per column, 600/5 = 120 per row

cols = 5
rows = 5

# Let's be more aggressive and look for the actual tile boundaries
# by examining the image more carefully

# Strategy: Extract larger regions and crop more aggressively
# Tiles appear to start after some margin and have white space around them

# Looking at the structure, each "cell" is 109x120
# But the actual tile content needs tighter cropping

cell_width = width / cols
cell_height = height / rows

print(f"Cell size: {cell_width}x{cell_height}")

# We need to crop more from the borders
# Let's manually tune these values by looking at where tiles actually are
# Tiles seem to have about 2-3 pixels of white border on all sides
# and the number labels are at the bottom

# Adjusted crop margins (in pixels from each edge of the cell)
# Being more aggressive to remove all white borders
left_margin = 8
right_margin = 8
top_margin = 8
bottom_margin = 22  # More space at bottom for the number labels

tiles = []
for row in range(rows):
    for col in range(cols):
        # Calculate cell boundaries
        x1 = int(col * cell_width)
        y1 = int(row * cell_height)
        x2 = int((col + 1) * cell_width)
        y2 = int((row + 1) * cell_height)

        # Apply margins to get actual tile content
        tile_x1 = x1 + left_margin
        tile_y1 = y1 + top_margin
        tile_x2 = x2 - right_margin
        tile_y2 = y2 - bottom_margin

        # Extract tile
        tile = img.crop((tile_x1, tile_y1, tile_x2, tile_y2))
        tiles.append(tile)

        print(f"Tile {row},{col}: extracted from ({tile_x1},{tile_y1}) to ({tile_x2},{tile_y2}) = {tile.width}x{tile.height}")

# All tiles should now be the same size
# Find dimensions
tile_width = tiles[0].width
tile_height = tiles[0].height

print(f"\nTile size: {tile_width}x{tile_height}")

# Create new image with all tiles
new_width = tile_width * cols
new_height = tile_height * rows
new_img = Image.new('RGB', (new_width, new_height))

# Paste tiles
for idx, tile in enumerate(tiles):
    row = idx // cols
    col = idx % cols
    x = col * tile_width
    y = row * tile_height
    new_img.paste(tile, (x, y))

# Save
new_img.save('carcasonne-tiles/tiles-clean.png')
print(f"\nSaved clean tiles as tiles-clean.png ({new_width}x{new_height})")
print(f"Each tile is {tile_width}x{tile_height} pixels")
