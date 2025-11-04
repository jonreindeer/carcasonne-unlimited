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
    spriteX: number;  // Position in sprite sheet (column)
    spriteY: number;  // Position in sprite sheet (row)
}

interface PlacedTile {
    definition: TileDefinition;
    rotation: number;  // 0, 90, 180, 270
    x: number;
    y: number;
}

// Define all tile types based on the sprite sheet
// Analyzing the sprite sheet: 5 columns × 5 rows (tiles-clean.png)
// Edge format: [North, East, South, West]
const TILE_DEFINITIONS: TileDefinition[] = [
    // Row 0
    { id: '0', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD], spriteX: 0, spriteY: 0 },  // Monastery in field
    { id: '1', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.FIELD], spriteX: 1, spriteY: 0 },   // Monastery with road
    { id: '2', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.CITY, EdgeType.CITY], spriteX: 2, spriteY: 0 },      // Full city w shield
    { id: '3', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], spriteX: 3, spriteY: 0 },     // City 3 sides (open south)
    { id: '4', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], spriteX: 4, spriteY: 0 },     // City 3 sides w shield

    // Row 1
    { id: '5', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.ROAD, EdgeType.CITY], spriteX: 0, spriteY: 1 },      // City 3 sides, road south
    { id: '6', edges: [EdgeType.CITY, EdgeType.CITY, EdgeType.ROAD, EdgeType.CITY], spriteX: 1, spriteY: 1 },     // City top, road south w shield
    { id: '7', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], spriteX: 2, spriteY: 1 },    // City top and left
    { id: '8', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], spriteX: 3, spriteY: 1 },    // City top and left w shield
    { id: '9', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.CITY], spriteX: 4, spriteY: 1 },      // City top and left, road south and right

    // Row 2
    { id: '10', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.CITY], spriteX: 0, spriteY: 2 },     // City top and left, road south and right
    { id: '11', edges: [EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], spriteX: 1, spriteY: 2 },   // City sides (east+west)
    { id: '12', edges: [EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY], spriteX: 2, spriteY: 2 },   // City sides (east+west) w shield
    { id: '13', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.CITY], spriteX: 3, spriteY: 2 },   // City top and left
    { id: '14', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.CITY, EdgeType.FIELD], spriteX: 4, spriteY: 2 },   // City top and bottom separate

    // Row 3
    { id: '15', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.FIELD, EdgeType.FIELD], spriteX: 0, spriteY: 3 },  // City top
    { id: '16', edges: [EdgeType.CITY, EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD], spriteX: 1, spriteY: 3 },    // City top, road bottom and left
    { id: '17', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.FIELD], spriteX: 2, spriteY: 3 },    // City top, road bottom and right
    { id: '18', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], spriteX: 3, spriteY: 3 },     // City top with roads T
    { id: '19', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD], spriteX: 4, spriteY: 3 },    // City top with road side to side

    // Row 4
    { id: '20', edges: [EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.FIELD], spriteX: 0, spriteY: 4 },   // Road straight (north-south)
    { id: '21', edges: [EdgeType.FIELD, EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD], spriteX: 1, spriteY: 4 },   // Road bottom to left
    { id: '22', edges: [EdgeType.FIELD, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], spriteX: 2, spriteY: 4 },    // Road T-junction (3-way)
    { id: '23', edges: [EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD, EdgeType.ROAD], spriteX: 3, spriteY: 4 },     // Road cross (4-way)
    { id: '24', edges: [EdgeType.CITY, EdgeType.ROAD, EdgeType.FIELD, EdgeType.ROAD], spriteX: 4, spriteY: 4 },     // Road east west with city (Starting Tile)
];

class CarcassonneGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private spriteSheet: HTMLImageElement;
    private spriteLoaded: boolean = false;

    private readonly TILE_SIZE = 100;  // Size of each tile in pixels
    private readonly SPRITE_TILE_WIDTH = 93;  // Width of each tile in the sprite sheet (465/5)
    private readonly SPRITE_TILE_HEIGHT = 90;  // Height of each tile in the sprite sheet (450/5)
    private readonly TILES_PER_ROW = 16;  // Number of tiles per row on screen

    private tiles: PlacedTile[] = [];
    private grid: Map<string, PlacedTile> = new Map();
    private highestRow: number = -1;

    constructor() {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        this.setupCanvas();
        this.loadSpriteSheet();
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

    private loadSpriteSheet(): void {
        this.spriteSheet = new Image();
        this.spriteSheet.onload = () => {
            this.spriteLoaded = true;
            this.generateInitialTiles();
            this.render();
        };
        this.spriteSheet.src = 'carcasonne-tiles/tiles-clean.png';
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

    private setupScrollListener(): void {
        let isGenerating = false;

        window.addEventListener('scroll', () => {
            if (isGenerating) return;

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if we're 3/4 down the page
            const threshold = documentHeight - windowHeight * 1.25;

            if (scrollPosition > threshold) {
                isGenerating = true;
                this.generateNewRow();
                this.extendCanvas();
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

        // Try all tiles with all rotations
        for (const tileDef of TILE_DEFINITIONS) {
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
        if (!this.spriteLoaded) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const tile of this.tiles) {
            this.drawTile(tile);
        }
    }

    private drawTile(tile: PlacedTile): void {
        const x = tile.x * this.TILE_SIZE;
        const y = tile.y * this.TILE_SIZE;

        this.ctx.save();

        // Move to tile center for rotation
        this.ctx.translate(x + this.TILE_SIZE / 2, y + this.TILE_SIZE / 2);
        this.ctx.rotate((tile.rotation * Math.PI) / 180);

        // Draw the sprite
        this.ctx.drawImage(
            this.spriteSheet,
            tile.definition.spriteX * this.SPRITE_TILE_WIDTH,
            tile.definition.spriteY * this.SPRITE_TILE_HEIGHT,
            this.SPRITE_TILE_WIDTH,
            this.SPRITE_TILE_HEIGHT,
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
}

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new CarcassonneGame();
});
