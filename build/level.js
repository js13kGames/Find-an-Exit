import { TILE_SIZE } from './constants.js';
import BoundingBoxCorners from './bounding_box_corners.js';
var COLLISION_DIRECTION;
(function (COLLISION_DIRECTION) {
    COLLISION_DIRECTION[COLLISION_DIRECTION["Top"] = 0] = "Top";
    COLLISION_DIRECTION[COLLISION_DIRECTION["Right"] = 1] = "Right";
    COLLISION_DIRECTION[COLLISION_DIRECTION["Down"] = 2] = "Down";
    COLLISION_DIRECTION[COLLISION_DIRECTION["Left"] = 3] = "Left";
    COLLISION_DIRECTION[COLLISION_DIRECTION["None"] = 4] = "None";
})(COLLISION_DIRECTION || (COLLISION_DIRECTION = {}));
class Level {
    constructor(matrix, start, end) {
        this.#matrix = matrix;
        this.#start = start;
        this.#end = end;
    }
    #matrix;
    #start;
    #end;
    get start() {
        return this.#start;
    }
    get end() {
        return this.#end;
    }
    get matrix() {
        return this.#matrix;
    }
    isCollision(player) {
        const { x, y, boundingBox } = player;
        const tilesEntered = this.getTilesEntered(player);
        if (tilesEntered[BoundingBoxCorners.downLeft] + tilesEntered[BoundingBoxCorners.downRight] >= 1) {
            return {
                type: COLLISION_DIRECTION.Down,
                x: -1,
                y: ~~(boundingBox[BoundingBoxCorners.downLeft][1] / TILE_SIZE) * TILE_SIZE,
            };
        }
        return {
            type: COLLISION_DIRECTION.None,
            x: -1,
            y: -1,
        };
    }
    getTilesEntered(player) {
        const { boundingBox } = player;
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
