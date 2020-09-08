import { ctx, } from './common.js';
import levelOne from './levels/level_one.js';
import { TILE_SIZE } from './constants.js';
class Render {
    static renderLevelOne() {
        const { matrix } = levelOne;
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[0].length; col++) {
                let val = matrix[row][col];
                if (!!val && ctx != null) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        }
    }
}
export default Render;
