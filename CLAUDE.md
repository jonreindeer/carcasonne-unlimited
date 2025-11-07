# Carcassonne Infinite Tile Viewer

## Project Overview
An infinite scrolling Carcassonne tile placement game built with TypeScript and HTML5 Canvas. Tiles are procedurally placed with edge matching (roads connect to roads, cities to cities, fields to fields).

## What We've Built

### Core Features
- **Individual tile images**: Using 88×88px individual tile images (25 tiles) with better edge quality
- **Edge type definitions**: All 25 tiles documented with NESW (North, East, South, West) edge types in `tile-definitions.json`
  - F = Grass/Field
  - R = Road
  - C = City
- **Tile matching algorithm**: Finds valid tiles with rotation (0°, 90°, 180°, 270°) that match adjacent tiles' edges
- **Rotation system**: Clockwise rotation correctly transforms edge positions
- **Canvas rendering**: Tiles rendered with proper rotation at 100×100 pixels
- **Random tile replacement**: Continuously selects random tiles and attempts to replace them with valid alternatives
  - Runs automatically after initial render (enabled by default)
  - Checks all 4 adjacent edges to find valid replacements
  - Control via `enableRandomReplacement` property or `stopRandomReplacement()` method
- **Debug logging**: Console logs show tile placement, edge requirements, rotation decisions, and replacement attempts

### File Structure
- `index.html` - Main webpage
- `game.ts` - TypeScript game logic
- `game.js` - Compiled JavaScript (generated via `make build`)
- `tile-definitions.json` - Complete tile edge definitions
- `carcasonne-tiles/individual/` - Individual tile images (0.jpg through 24.jpg, 88×88px each)
- `carcasonne-tiles/tiles-clean.png` - Processed sprite sheet (legacy, no longer used)
- `process_tiles.py` - Python script to extract clean tiles from original sprite sheet
- `Makefile` - Build commands (build, clean, run, watch)
- `pyproject.toml` / `uv.lock` - UV-managed Python dependencies (Pillow, numpy)

### Technical Details
- 8 tiles per row on screen
- Starting tile: Tile 24 (road cross) at position (0, 0)
- Grid system: HashMap for O(1) tile lookups by (x,y) coordinates
- Edge matching: Checks top and left neighbors, finds all valid tiles+rotations, randomly selects one

## Current State
- ✅ Full screen fills with matching tiles
- ✅ Tiles start with tile 24 at top-left
- ✅ Edge continuity working correctly
- ✅ Rotation working correctly (clockwise)
- ✅ Individual tile images with better edge quality (88×88px)
- ✅ Random tile replacement system working (enabled by default)

## TODOs

### High Priority
- [ ] **Fix scrolling**: Currently doesn't scroll properly - tiles should appear as user scrolls down
- [ ] **Auto-scroll**: Automatically scroll down to show new tiles being generated
- [ ] **Match tile frequencies**: Implement proper Carcassonne tile distribution (some tiles appear more frequently in the actual game)
- [ ] **Random pull mode**: Alternative placement mode where a random tile is drawn first, then a valid position is found (like real gameplay)

### Medium Priority
- [ ] **Animate possible fit pieces**: Show preview/animation of tiles being considered for placement
- [ ] **River expansion**: Add river tiles and river placement logic
- [ ] **Upsample tiles**: Increase resolution of tile images for better quality at larger sizes

### Low Priority
- [ ] **Infinite scroll up**: Support scrolling up as well as down
- [ ] **Tile statistics**: Show which tiles are used most frequently
- [ ] **Manual placement mode**: Allow user to click and place specific tiles
- [ ] **Undo/reset**: Ability to regenerate the grid

## Development Commands
```bash
make build    # Compile TypeScript to JavaScript
make clean    # Remove generated files
make run      # Build and start HTTP server on port 8000
make watch    # Auto-rebuild on file changes (requires fswatch)
```

## Edge Matching Example
```
Tile 9: [N:C, E:R, S:R, W:C]
  At 0°:   [N:C, E:R, S:R, W:C]
  At 90°:  [N:C, E:C, S:R, W:R]  (W→N, N→E, E→S, S→W)
  At 180°: [N:R, E:C, S:C, W:R]
  At 270°: [N:R, E:R, S:C, W:C]
```

## Cost Summary (as of last update)
- Total cost: $0.56
- Total duration: 24h 47m (wall time), 15m 9s (API time)
- Code changes: 864 lines added, 172 lines removed
