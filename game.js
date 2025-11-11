// Edge types for Carcassonne tiles
var EdgeType;
(function (EdgeType) {
    EdgeType["FIELD"] = "F";
    EdgeType["ROAD"] = "R";
    EdgeType["CITY"] = "C";
})(EdgeType || (EdgeType = {}));
// Define all tile types with individual tile images
// Edge format: [North, East, South, West]
const TILE_DEFINITIONS = [
    { id: '0', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/individual/0.jpg' }, // Monastery in field
    { id: '1', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/individual/1.jpg' }, // Monastery with road
    { id: '2', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.CITY, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/2.jpg' }, // Full city w shield
    { id: '3', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/3.jpg' }, // City 3 sides (open south)
    { id: '4', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/4.jpg' }, // City 3 sides w shield
    { id: '5', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/5.jpg' }, // City 3 sides, road south
    { id: '6', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/6.jpg' }, // City top, road south w shield
    { id: '7', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/7.jpg' }, // City top and left
    { id: '8', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/8.jpg' }, // City top and left w shield
    { id: '9', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/9.jpg' }, // City top and left, road south and right
    { id: '10', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/10.jpg' }, // City top and left, road south and right
    { id: '11', edges: [EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/11.jpg' }, // City sides (east+west)
    { id: '12', edges: [EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/12.jpg' }, // City sides (east+west) w shield
    { id: '13', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/13.jpg' }, // City top and left
    { id: '14', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD], imagePath: 'carcasonne-tiles/individual/14.jpg' }, // City top and bottom separate
    { id: '15', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/individual/15.jpg' }, // City top
    { id: '16', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/16.jpg' }, // City top, road bottom and left
    { id: '17', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/individual/17.jpg' }, // City top, road bottom and right
    { id: '18', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/18.jpg' }, // City top with roads T
    { id: '19', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/19.jpg' }, // City top with road side to side
    { id: '20', edges: [EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/individual/20.jpg' }, // Road straight (north-south)
    { id: '21', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/21.jpg' }, // Road bottom to left
    { id: '22', edges: [EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/22.jpg' }, // Road T-junction (3-way)
    { id: '23', edges: [EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/23.jpg' }, // Road cross (4-way)
    { id: '24', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/individual/24.jpg' }, // Road east west with city (Starting Tile)
];
class CarcassonneGame {
    constructor() {
        this.tileImages = new Map();
        this.imagesLoaded = false;
        this.TILE_SIZE = 100; // Size of each tile in pixels
        this.TILES_PER_ROW = 16; // Number of tiles per row on screen
        this.tiles = [];
        this.grid = new Map();
        this.highestRow = -1;
        // Random tile replacement feature
        this.enableRandomReplacement = true;
        this.replacementIntervalId = null;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.loadTileImages();
        this.setupScrollListener();
    }
    setupCanvas() {
        const containerWidth = window.innerWidth;
        this.canvas.width = this.TILE_SIZE * this.TILES_PER_ROW;
        this.canvas.height = window.innerHeight * 3; // Initial height
        // Center the canvas
        this.canvas.style.margin = '0 auto';
        this.canvas.style.display = 'block';
    }
    loadTileImages() {
        let loadedCount = 0;
        const totalImages = TILE_DEFINITIONS.length;
        for (const tileDef of TILE_DEFINITIONS) {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    this.imagesLoaded = true;
                    this.generateInitialTiles();
                    this.render();
                    this.startRandomReplacementInterval();
                }
            };
            img.src = tileDef.imagePath;
            this.tileImages.set(tileDef.id, img);
        }
    }
    generateInitialTiles() {
        // Fill entire screen with tiles
        const rowsToGenerate = Math.ceil(window.innerHeight / this.TILE_SIZE);
        console.log(`=== Generating ${rowsToGenerate} rows to fill screen ===`);
        for (let y = 0; y < rowsToGenerate; y++) {
            this.generateNewRow();
        }
    }
    getGridKey(x, y) {
        return `${x},${y}`;
    }
    setupScrollListener() {
        let isGenerating = false;
        window.addEventListener('scroll', () => {
            if (isGenerating)
                return;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            // Calculate the bottom of currently rendered tiles
            const bottomOfTiles = (this.highestRow + 1) * this.TILE_SIZE;
            // Trigger when viewport is within 2 rows of the bottom of rendered tiles
            const threshold = bottomOfTiles - this.TILE_SIZE * 2;
            if (scrollPosition + windowHeight > threshold) {
                isGenerating = true;
                // Generate multiple rows at once to stay ahead of scrolling
                for (let i = 0; i < 3; i++) {
                    this.generateNewRow();
                    this.extendCanvas();
                }
                isGenerating = false;
            }
        });
    }
    generateNewRow() {
        this.highestRow++;
        const newY = this.highestRow;
        // Generate tiles for each column in the new row
        for (let x = 0; x < this.TILES_PER_ROW; x++) {
            this.placeTileAt(x, newY);
        }
        this.render();
        this.updateTileCount();
    }
    placeTileAt(x, y) {
        // Special case: Always use tile 24 at position (0, 0)
        if (x === 0 && y === 0) {
            const startingTileDef = TILE_DEFINITIONS.find(t => t.id === '24');
            const startingTile = {
                definition: startingTileDef,
                rotation: 0,
                x: 0,
                y: 0
            };
            this.tiles.push(startingTile);
            this.grid.set(this.getGridKey(0, 0), startingTile);
            console.log(`\nPlacing starting tile 24 at (0, 0) with rotation 0°`);
            console.log(`  Edges: [N:${startingTileDef.edges[0]}, E:${startingTileDef.edges[1]}, S:${startingTileDef.edges[2]}, W:${startingTileDef.edges[3]}]`);
            return;
        }
        // Get required edges from adjacent tiles
        const topEdge = this.getEdgeAtPosition(x, y - 1, 2); // Bottom edge of tile above
        const leftEdge = this.getEdgeAtPosition(x - 1, y, 1); // Right edge of tile to the left
        console.log(`\nPlacing tile at (${x}, ${y}):`);
        console.log(`  Required top edge: ${topEdge || 'none'}`);
        console.log(`  Required left edge: ${leftEdge || 'none'}`);
        // Find a matching tile (with rotation)
        const matchingTile = this.findMatchingTile(topEdge, leftEdge, x, y);
        if (matchingTile) {
            matchingTile.x = x;
            matchingTile.y = y;
            this.tiles.push(matchingTile);
            this.grid.set(this.getGridKey(x, y), matchingTile);
            console.log(`  ✓ Placed tile ${matchingTile.definition.id} at rotation ${matchingTile.rotation}°`);
        }
        else {
            console.log(`  ✗ No matching tile found!`);
        }
    }
    getEdgeAtPosition(x, y, edgeIndex) {
        const tile = this.grid.get(this.getGridKey(x, y));
        if (!tile)
            return null;
        const rotatedEdgeIndex = (edgeIndex - (tile.rotation / 90)) % 4;
        const normalizedIndex = rotatedEdgeIndex < 0 ? rotatedEdgeIndex + 4 : rotatedEdgeIndex;
        return tile.definition.edges[normalizedIndex];
    }
    findMatchingTile(requiredTop, requiredLeft, x, y) {
        const possibleTiles = [];
        // Try all tiles with all rotations
        for (const tileDef of TILE_DEFINITIONS) {
            for (const rotation of [0, 90, 180, 270]) {
                const rotatedEdges = this.getRotatedEdges(tileDef.edges, rotation);
                // Check if edges match
                const topMatch = requiredTop === null || rotatedEdges[0] === requiredTop;
                const leftMatch = requiredLeft === null || rotatedEdges[3] === requiredLeft;
                if (topMatch && leftMatch) {
                    possibleTiles.push({ def: tileDef, rotation });
                }
            }
        }
        console.log(`  Found ${possibleTiles.length} possible tile(s)`);
        if (possibleTiles.length === 0) {
            // Fallback to any field tile
            return null;
        }
        // Randomly select one
        const selected = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];
        const rotatedEdges = this.getRotatedEdges(selected.def.edges, selected.rotation);
        console.log(`  Selected tile ${selected.def.id} with rotation ${selected.rotation}°`);
        console.log(`    Original edges: [N:${selected.def.edges[0]}, E:${selected.def.edges[1]}, S:${selected.def.edges[2]}, W:${selected.def.edges[3]}]`);
        console.log(`    Rotated edges:  [N:${rotatedEdges[0]}, E:${rotatedEdges[1]}, S:${rotatedEdges[2]}, W:${rotatedEdges[3]}]`);
        console.log(`    Left edge (West) = ${rotatedEdges[3]} ${requiredLeft ? `(matches required ${requiredLeft})` : '(no requirement)'}`);
        return {
            definition: selected.def,
            rotation: selected.rotation,
            x: 0, // Will be set by caller
            y: 0 // Will be set by caller
        };
    }
    getRotatedEdges(edges, rotation) {
        // Rotation is clockwise: 0° = no rotation, 90° = one position clockwise, etc.
        // For clockwise rotation: new position i gets value from position (i - rotations)
        // Example: 90° clockwise means North gets value from West, East gets value from North, etc.
        const rotations = rotation / 90;
        const result = [];
        for (let i = 0; i < 4; i++) {
            // Subtract rotations and ensure positive modulo
            const sourceIndex = ((i - rotations) % 4 + 4) % 4;
            result[i] = edges[sourceIndex];
        }
        return result;
    }
    extendCanvas() {
        this.canvas.height += this.TILE_SIZE;
    }
    render() {
        if (!this.imagesLoaded)
            return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const tile of this.tiles) {
            this.drawTile(tile);
        }
    }
    drawTile(tile) {
        const x = tile.x * this.TILE_SIZE;
        const y = tile.y * this.TILE_SIZE;
        const tileImage = this.tileImages.get(tile.definition.id);
        if (!tileImage)
            return;
        this.ctx.save();
        // Move to tile center for rotation
        this.ctx.translate(x + this.TILE_SIZE / 2, y + this.TILE_SIZE / 2);
        this.ctx.rotate((tile.rotation * Math.PI) / 180);
        // Draw the tile image
        this.ctx.drawImage(tileImage, -this.TILE_SIZE / 2, -this.TILE_SIZE / 2, this.TILE_SIZE, this.TILE_SIZE);
        this.ctx.restore();
    }
    updateTileCount() {
        const countElement = document.getElementById('tileCount');
        if (countElement) {
            countElement.textContent = this.tiles.length.toString();
        }
    }
    startRandomReplacementInterval() {
        if (this.replacementIntervalId !== null) {
            window.clearInterval(this.replacementIntervalId);
        }
        this.replacementIntervalId = window.setInterval(() => {
            if (this.enableRandomReplacement) {
                this.tryRandomReplacement();
            }
        }, 25); // Here's the timer
    }
    tryRandomReplacement() {
        if (this.tiles.length === 0)
            return;
        // Select a random tile
        const randomIndex = Math.floor(Math.random() * this.tiles.length);
        const targetTile = this.tiles[randomIndex];
        console.log(`\n=== Random Edge Modification ===`);
        console.log(`Selected tile at (${targetTile.x}, ${targetTile.y}) - Tile ${targetTile.definition.id} with rotation ${targetTile.rotation}°`);
        // Randomly select an edge (0=North, 1=East, 2=South, 3=West)
        const edgeIndex = Math.floor(Math.random() * 4);
        const edgeNames = ['North', 'East', 'South', 'West'];
        // Randomly select a new edge type
        const edgeTypes = [EdgeType.FIELD, EdgeType.ROAD, EdgeType.CITY];
        const newEdgeType = edgeTypes[Math.floor(Math.random() * edgeTypes.length)];
        console.log(`  Changing ${edgeNames[edgeIndex]} edge to ${newEdgeType}`);
        // Determine which adjacent tile shares this edge and needs to be updated
        let adjacentX = targetTile.x;
        let adjacentY = targetTile.y;
        let adjacentEdgeIndex = 0;
        switch (edgeIndex) {
            case 0: // North edge - affects tile above (its South edge)
                adjacentY = targetTile.y - 1;
                adjacentEdgeIndex = 2;
                break;
            case 1: // East edge - affects tile to the right (its West edge)
                adjacentX = targetTile.x + 1;
                adjacentEdgeIndex = 3;
                break;
            case 2: // South edge - affects tile below (its North edge)
                adjacentY = targetTile.y + 1;
                adjacentEdgeIndex = 0;
                break;
            case 3: // West edge - affects tile to the left (its East edge)
                adjacentX = targetTile.x - 1;
                adjacentEdgeIndex = 1;
                break;
        }
        // Get the current rotated edges of the target tile
        const currentRotatedEdges = this.getRotatedEdges(targetTile.definition.edges, targetTile.rotation);
        // Create the new required edges for the target tile
        const newTargetEdges = [
            edgeIndex === 0 ? newEdgeType : currentRotatedEdges[0],
            edgeIndex === 1 ? newEdgeType : currentRotatedEdges[1],
            edgeIndex === 2 ? newEdgeType : currentRotatedEdges[2],
            edgeIndex === 3 ? newEdgeType : currentRotatedEdges[3]
        ];
        // Get constraints from other adjacent tiles (not the one we're modifying the edge with)
        const topEdge = edgeIndex === 0 ? newEdgeType : this.getEdgeAtPosition(targetTile.x, targetTile.y - 1, 2);
        const rightEdge = edgeIndex === 1 ? newEdgeType : this.getEdgeAtPosition(targetTile.x + 1, targetTile.y, 3);
        const bottomEdge = edgeIndex === 2 ? newEdgeType : this.getEdgeAtPosition(targetTile.x, targetTile.y + 1, 0);
        const leftEdge = edgeIndex === 3 ? newEdgeType : this.getEdgeAtPosition(targetTile.x - 1, targetTile.y, 1);
        console.log(`  Finding new tile for position (${targetTile.x}, ${targetTile.y}) with edges [N:${topEdge}, E:${rightEdge}, S:${bottomEdge}, W:${leftEdge}]`);
        // Find a matching tile for the target position
        const newTargetTile = this.findMatchingTileForAllEdges(topEdge, rightEdge, bottomEdge, leftEdge, targetTile.x, targetTile.y);
        // Check if there's an adjacent tile that needs updating
        const adjacentTile = this.grid.get(this.getGridKey(adjacentX, adjacentY));
        let needsRender = false;
        if (newTargetTile) {
            // Replace the target tile
            newTargetTile.x = targetTile.x;
            newTargetTile.y = targetTile.y;
            this.tiles[randomIndex] = newTargetTile;
            this.grid.set(this.getGridKey(targetTile.x, targetTile.y), newTargetTile);
            console.log(`  ✓ Replaced target tile with tile ${newTargetTile.definition.id} at rotation ${newTargetTile.rotation}°`);
            needsRender = true;
        }
        else {
            console.log(`  ✗ No matching tile found for target position - keeping original tile`);
            // Keep the original tile
            return;
        }
        if (adjacentTile) {
            console.log(`  Finding new tile for adjacent position (${adjacentX}, ${adjacentY})`);
            // Get constraints for the adjacent tile
            const adjTopEdge = adjacentEdgeIndex === 0 ? newEdgeType : this.getEdgeAtPosition(adjacentX, adjacentY - 1, 2);
            const adjRightEdge = adjacentEdgeIndex === 1 ? newEdgeType : this.getEdgeAtPosition(adjacentX + 1, adjacentY, 3);
            const adjBottomEdge = adjacentEdgeIndex === 2 ? newEdgeType : this.getEdgeAtPosition(adjacentX, adjacentY + 1, 0);
            const adjLeftEdge = adjacentEdgeIndex === 3 ? newEdgeType : this.getEdgeAtPosition(adjacentX - 1, adjacentY, 1);
            console.log(`    Required edges [N:${adjTopEdge}, E:${adjRightEdge}, S:${adjBottomEdge}, W:${adjLeftEdge}]`);
            const newAdjacentTile = this.findMatchingTileForAllEdges(adjTopEdge, adjRightEdge, adjBottomEdge, adjLeftEdge, adjacentX, adjacentY);
            if (newAdjacentTile) {
                // Replace the adjacent tile
                newAdjacentTile.x = adjacentX;
                newAdjacentTile.y = adjacentY;
                // Find the adjacent tile in the tiles array and replace it
                const adjIndex = this.tiles.findIndex(t => t.x === adjacentX && t.y === adjacentY);
                if (adjIndex !== -1) {
                    this.tiles[adjIndex] = newAdjacentTile;
                }
                this.grid.set(this.getGridKey(adjacentX, adjacentY), newAdjacentTile);
                console.log(`    ✓ Replaced adjacent tile with tile ${newAdjacentTile.definition.id} at rotation ${newAdjacentTile.rotation}°`);
                needsRender = true;
            }
            else {
                console.log(`    ✗ No matching tile found for adjacent position - reverting target tile change`);
                // Revert the target tile back to original since we can't match the adjacent
                this.tiles[randomIndex] = targetTile;
                this.grid.set(this.getGridKey(targetTile.x, targetTile.y), targetTile);
                needsRender = true;
            }
        }
        if (needsRender) {
            this.render();
        }
    }
    findMatchingTileForAllEdges(requiredTop, requiredRight, requiredBottom, requiredLeft, x, y) {
        const possibleTiles = [];
        // Try all tiles with all rotations
        for (const tileDef of TILE_DEFINITIONS) {
            for (const rotation of [0, 90, 180, 270]) {
                const rotatedEdges = this.getRotatedEdges(tileDef.edges, rotation);
                // Check if all edges match
                const topMatch = requiredTop === null || rotatedEdges[0] === requiredTop;
                const rightMatch = requiredRight === null || rotatedEdges[1] === requiredRight;
                const bottomMatch = requiredBottom === null || rotatedEdges[2] === requiredBottom;
                const leftMatch = requiredLeft === null || rotatedEdges[3] === requiredLeft;
                if (topMatch && rightMatch && bottomMatch && leftMatch) {
                    possibleTiles.push({ def: tileDef, rotation });
                }
            }
        }
        console.log(`  Found ${possibleTiles.length} possible tile(s)`);
        if (possibleTiles.length === 0) {
            return null;
        }
        // Randomly select one
        const selected = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];
        const rotatedEdges = this.getRotatedEdges(selected.def.edges, selected.rotation);
        console.log(`  Selected tile ${selected.def.id} with rotation ${selected.rotation}°`);
        console.log(`    Rotated edges:  [N:${rotatedEdges[0]}, E:${rotatedEdges[1]}, S:${rotatedEdges[2]}, W:${rotatedEdges[3]}]`);
        return {
            definition: selected.def,
            rotation: selected.rotation,
            x: 0, // Will be set by caller
            y: 0 // Will be set by caller
        };
    }
    stopRandomReplacement() {
        if (this.replacementIntervalId !== null) {
            window.clearInterval(this.replacementIntervalId);
            this.replacementIntervalId = null;
        }
    }
}
// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new CarcassonneGame();
});
