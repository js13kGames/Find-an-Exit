import Player from './player.js';
import { TILE_SIZE } from './constants.js';
import TileType from './tile_type.js';
import Point from './point.js';
import BoundingBoxCorners from './bounding_box_corners.js';

enum COLLISION_DIRECTION {
    Top,
    Right,
    Down,
    Left,
    None,
}

type Collision = {
    type: COLLISION_DIRECTION,
    x : number,
    y : number,
}

class Level {
    #matrix: number[][];
    #start: [number, number];
    #end: [number, number];

    constructor(matrix : number[][], start : [number, number], end : [number, number]) {
        this.#matrix = matrix;
        this.#start = start;
        this.#end = end;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get matrix() {
        return this.#matrix;
    }

    isCollision(player : Player) : Collision {
        const {
            x,
            y,
            boundingBox
        } = player;

        const tilesEntered = this.getTilesEntered(player);

        if (tilesEntered[BoundingBoxCorners.downLeft] + tilesEntered[BoundingBoxCorners.downRight] >= 1) {
            return {
                type: COLLISION_DIRECTION.Down,
                x: -1,
                y: ~~(boundingBox[BoundingBoxCorners.downLeft][1] / TILE_SIZE) * TILE_SIZE,
            }
        }

        return {
            type: COLLISION_DIRECTION.None,
            x: -1,
            y: -1,
        }
    }

    getTilesEntered(player: Player) : number[] {
        const {
            boundingBox
        } = player;

        const upLeft = boundingBox[BoundingBoxCorners.upLeft];
        const upRight = boundingBox[BoundingBoxCorners.upRight];
        const downRight = boundingBox[BoundingBoxCorners.downRight];
        const downLeft = boundingBox[BoundingBoxCorners.downLeft];

        const upLeftTile = this.#matrix[~~(upLeft[1] / TILE_SIZE)][~~(upLeft[0] / TILE_SIZE)];
        const upRightTile = this.#matrix[~~(upRight[1] / TILE_SIZE)][~~(upRight[0] / TILE_SIZE)];
        const downRightTile = this.#matrix[~~(downRight[1] / TILE_SIZE)][~~(downRight[0] / TILE_SIZE)];
        const downLeftTile = this.#matrix[~~(downLeft[1] / TILE_SIZE)][~~(downLeft[0] / TILE_SIZE)];

        const tilesBeingEntered = [];
        tilesBeingEntered[BoundingBoxCorners.upLeft] = upLeftTile;
        tilesBeingEntered[BoundingBoxCorners.upRight] = upRightTile;
        tilesBeingEntered[BoundingBoxCorners.downRight] = downRightTile;
        tilesBeingEntered[BoundingBoxCorners.downLeft] = downLeftTile;

        return tilesBeingEntered;
    }
}

export default Level;