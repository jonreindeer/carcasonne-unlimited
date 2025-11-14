// Edge types for Carcassonne tiles
enum EdgeType {
    FIELD = 'F',      // Grass/field
    ROAD = 'R',       // Road
    CITY = 'C',       // City wall
}

// Tile definition with edges: [top, right, bottom, left]
interface TileDefinition {
    id: string;
    edges: [EdgeType, EdgeType, EdgeType, EdgeType];
    imagePath: string;  // Path to individual tile image
    has_shield: boolean;  // Whether the tile has a shield/badge
    occurrences_per_deck: number;  // How many times this tile appears in a standard deck
}

interface PlacedTile {
    definition: TileDefinition;
    rotation: number;  // 0, 90, 180, 270
    x: number;
    y: number;
}

// Define all tile types with individual tile images
// Edge format: [North, East, South, West]
const TILE_DEFINITIONS: TileDefinition[] = [
    { id: '0', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/upscaled/0.png', has_shield: false, occurrences_per_deck: 4 },  // Monastery in field (upscaled)
    { id: '1', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/upscaled/1.png', has_shield: false, occurrences_per_deck: 2 },   // Monastery with road (upscaled)
    { id: '2', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.CITY, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/2.jpg', has_shield: true, occurrences_per_deck: 1 },      // Full city w shield
    { id: '3', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/upscaled/3.png', has_shield: false, occurrences_per_deck: 3 },     // City 3 sides (open south) (upscaled)
    { id: '4', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/4.jpg', has_shield: true, occurrences_per_deck: 2 },     // City 3 sides w shield
    { id: '5', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/upscaled/5.png', has_shield: false, occurrences_per_deck: 1 },      // City 3 sides, road south (upscaled)
    { id: '6', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/6.jpg', has_shield: true, occurrences_per_deck: 2 },     // City top, road south w shield
    { id: '7', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/upscaled/7.png', has_shield: false, occurrences_per_deck: 3 },    // City top and left (upscaled)
    { id: '8', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/8.jpg', has_shield: true, occurrences_per_deck: 2 },    // City top and left w shield
    { id: '9', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/upscaled/9.png', has_shield: false, occurrences_per_deck: 3 },      // City top and left, road south and right (upscaled)
    { id: '10', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/10.jpg', has_shield: true, occurrences_per_deck: 2 },     // City top and left, road south and right
    { id: '11', edges: [EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/upscaled/11.png', has_shield: false, occurrences_per_deck: 1 },   // City sides (east+west) (upscaled)
    { id: '12', edges: [EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/individual/12.jpg', has_shield: true, occurrences_per_deck: 2 },   // City sides (east+west) w shield
    { id: '13', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], imagePath: 'carcasonne-tiles/upscaled/13.png', has_shield: false, occurrences_per_deck: 2 },   // City top and left (upscaled)
    { id: '14', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD], imagePath: 'carcasonne-tiles/upscaled/14.png', has_shield: false, occurrences_per_deck: 3 },   // City top and bottom separate (upscaled)
    { id: '15', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/upscaled/15.png', has_shield: false, occurrences_per_deck: 5 },  // City top (upscaled)
    { id: '16', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/16.png', has_shield: false, occurrences_per_deck: 3 },    // City top, road bottom and left (upscaled)
    { id: '17', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/upscaled/17.png', has_shield: false, occurrences_per_deck: 3 },    // City top, road bottom and right (upscaled)
    { id: '18', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/18.png', has_shield: false, occurrences_per_deck: 3 },     // City top with roads T (upscaled)
    { id: '19', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/19.png', has_shield: false, occurrences_per_deck: 8 },    // City top with road side to side (upscaled)
    { id: '20', edges: [EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.FIELD], imagePath: 'carcasonne-tiles/upscaled/20.png', has_shield: false, occurrences_per_deck: 8 },   // Road straight (north-south) (upscaled)
    { id: '21', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/21.png', has_shield: false, occurrences_per_deck: 9 },   // Road bottom to left (upscaled)
    { id: '22', edges: [EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/22.png', has_shield: false, occurrences_per_deck: 4 },    // Road T-junction (3-way) (upscaled)
    { id: '23', edges: [EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/23.png', has_shield: false, occurrences_per_deck: 1 },     // Road cross (4-way) (upscaled)
    { id: '24', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD], imagePath: 'carcasonne-tiles/upscaled/24.png', has_shield: false, occurrences_per_deck: 1 },     // Road east west with city (Starting Tile) (upscaled)
];

class CarcassonneGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private tileImages: Map<string, HTMLImageElement> = new Map();
    private imagesLoaded: boolean = false;

    private readonly TILE_SIZE = 100;  // Size of each tile in pixels
    private readonly TILES_PER_ROW = 16;  // Number of tiles per row on screen

    private tiles: PlacedTile[] = [];
    private grid: Map<string, PlacedTile> = new Map();
    private highestRow: number = -1;

    // Random tile replacement feature
    public enableRandomReplacement: boolean = true;
    private replacementIntervalId: number | null = null;

    // Tile filtering options
    public includeShieldTiles: boolean = false;  // Default: exclude tiles with shields

    constructor() {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        this.setupCanvas();
        this.loadTileImages();
        this.setupScrollListener();
    }

    private setupCanvas(): void {
        const containerWidth = window.innerWidth;
        this.canvas.width = this.TILE_SIZE * this.TILES_PER_ROW;
        this.canvas.height = window.innerHeight * 3;  // Initial height

        // Center the canvas
        this.canvas.style.margin = '0 auto';
        this.canvas.style.display = 'block';
    }

    private loadTileImages(): void {
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

    private generateInitialTiles(): void {
        // Fill entire screen with tiles
        const rowsToGenerate = Math.ceil(window.innerHeight / this.TILE_SIZE);

        console.log(`=== Generating ${rowsToGenerate} rows to fill screen ===`);

        for (let y = 0; y < rowsToGenerate; y++) {
            this.generateNewRow();
        }
    }

    private getGridKey(x: number, y: number): string {
        return `${x},${y}`;
    }

    private getAvailableTiles(): TileDefinition[] {
        if (this.includeShieldTiles) {
            return TILE_DEFINITIONS;
        }
        return TILE_DEFINITIONS.filter(tile => !tile.has_shield);
    }

    private setupScrollListener(): void {
        let isGenerating = false;

        window.addEventListener('scroll', () => {
            if (isGenerating) return;

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

    private generateNewRow(): void {
        this.highestRow++;
        const newY = this.highestRow;

        // Generate tiles for each column in the new row
        for (let x = 0; x < this.TILES_PER_ROW; x++) {
            this.placeTileAt(x, newY);
        }

        this.render();
        this.updateTileCount();
    }

    private placeTileAt(x: number, y: number): void {
        // Special case: Always use tile 24 at position (0, 0)
        if (x === 0 && y === 0) {
            const startingTileDef = TILE_DEFINITIONS.find(t => t.id === '24')!;
            const startingTile: PlacedTile = {
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
        const topEdge = this.getEdgeAtPosition(x, y - 1, 2);  // Bottom edge of tile above
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
        } else {
            console.log(`  ✗ No matching tile found!`);
        }
    }

    private getEdgeAtPosition(x: number, y: number, edgeIndex: number): EdgeType | null {
        const tile = this.grid.get(this.getGridKey(x, y));
        if (!tile) return null;

        const rotatedEdgeIndex = (edgeIndex - (tile.rotation / 90)) % 4;
        const normalizedIndex = rotatedEdgeIndex < 0 ? rotatedEdgeIndex + 4 : rotatedEdgeIndex;
        return tile.definition.edges[normalizedIndex];
    }

    private findMatchingTile(requiredTop: EdgeType | null, requiredLeft: EdgeType | null, x: number, y: number): PlacedTile | null {
        const possibleTiles: Array<{def: TileDefinition, rotation: number}> = [];
        const availableTiles = this.getAvailableTiles();

        // Try all available tiles with all rotations
        for (const tileDef of availableTiles) {
            for (const rotation of [0, 90, 180, 270]) {
                const rotatedEdges = this.getRotatedEdges(tileDef.edges, rotation);

                // Check if edges match
                const topMatch = requiredTop === null || rotatedEdges[0] === requiredTop;
                const leftMatch = requiredLeft === null || rotatedEdges[3] === requiredLeft;

                if (topMatch && leftMatch) {
                    possibleTiles.push({def: tileDef, rotation});
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
            x: 0,  // Will be set by caller
            y: 0   // Will be set by caller
        };
    }

    private getRotatedEdges(edges: [EdgeType, EdgeType, EdgeType, EdgeType], rotation: number): [EdgeType, EdgeType, EdgeType, EdgeType] {
        // Rotation is clockwise: 0° = no rotation, 90° = one position clockwise, etc.
        // For clockwise rotation: new position i gets value from position (i - rotations)
        // Example: 90° clockwise means North gets value from West, East gets value from North, etc.
        const rotations = rotation / 90;
        const result: EdgeType[] = [];

        for (let i = 0; i < 4; i++) {
            // Subtract rotations and ensure positive modulo
            const sourceIndex = ((i - rotations) % 4 + 4) % 4;
            result[i] = edges[sourceIndex];
        }

        return result as [EdgeType, EdgeType, EdgeType, EdgeType];
    }

    private extendCanvas(): void {
        this.canvas.height += this.TILE_SIZE;
    }

    private render(): void {
        if (!this.imagesLoaded) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const tile of this.tiles) {
            this.drawTile(tile);
        }
    }

    private drawTile(tile: PlacedTile): void {
        const x = tile.x * this.TILE_SIZE;
        const y = tile.y * this.TILE_SIZE;

        const tileImage = this.tileImages.get(tile.definition.id);
        if (!tileImage) return;

        this.ctx.save();

        // Move to tile center for rotation
        this.ctx.translate(x + this.TILE_SIZE / 2, y + this.TILE_SIZE / 2);
        this.ctx.rotate((tile.rotation * Math.PI) / 180);

        // Draw the tile image
        this.ctx.drawImage(
            tileImage,
            -this.TILE_SIZE / 2,
            -this.TILE_SIZE / 2,
            this.TILE_SIZE,
            this.TILE_SIZE
        );

        this.ctx.restore();
    }

    private updateTileCount(): void {
        const countElement = document.getElementById('tileCount');
        if (countElement) {
            countElement.textContent = this.tiles.length.toString();
        }
    }

    private startRandomReplacementInterval(): void {
        if (this.replacementIntervalId !== null) {
            window.clearInterval(this.replacementIntervalId);
        }

        this.replacementIntervalId = window.setInterval(() => {
            if (this.enableRandomReplacement) {
                this.tryRandomReplacement();
            }
        }, 25);  // Here's the timer
    }

    private tryRandomReplacement(): void {
        if (this.tiles.length === 0) return;

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
        const newTargetEdges: [EdgeType | null, EdgeType | null, EdgeType | null, EdgeType | null] = [
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
        } else {
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
            } else {
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

    private findMatchingTileForAllEdges(
        requiredTop: EdgeType | null,
        requiredRight: EdgeType | null,
        requiredBottom: EdgeType | null,
        requiredLeft: EdgeType | null,
        x: number,
        y: number
    ): PlacedTile | null {
        const possibleTiles: Array<{def: TileDefinition, rotation: number}> = [];
        const availableTiles = this.getAvailableTiles();

        // Try all available tiles with all rotations
        for (const tileDef of availableTiles) {
            for (const rotation of [0, 90, 180, 270]) {
                const rotatedEdges = this.getRotatedEdges(tileDef.edges, rotation);

                // Check if all edges match
                const topMatch = requiredTop === null || rotatedEdges[0] === requiredTop;
                const rightMatch = requiredRight === null || rotatedEdges[1] === requiredRight;
                const bottomMatch = requiredBottom === null || rotatedEdges[2] === requiredBottom;
                const leftMatch = requiredLeft === null || rotatedEdges[3] === requiredLeft;

                if (topMatch && rightMatch && bottomMatch && leftMatch) {
                    possibleTiles.push({def: tileDef, rotation});
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
            x: 0,  // Will be set by caller
            y: 0   // Will be set by caller
        };
    }

    public stopRandomReplacement(): void {
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
