
export default function findMaxAndMinBoundaries(tileGroup) {
    let tiles = [];
    let xMin = null;
    let xMax = null;
    let yMax = null;
    let yMin = null;

    for (let index in tileGroup) {

        if (index !== 'name') {
            tiles.push(tileGroup[index]);
            if (xMin === null || tileGroup[index].x < xMin) {
                xMin = tileGroup[index].x;
            }
            if (xMax === null || tileGroup[index].x > xMax) {
                xMax = tileGroup[index].x;
            }
            if (yMin === null || tileGroup[index].y < yMin) {
                yMin = tileGroup[index].y;
            }
            if (yMax === null || tileGroup[index].y > yMax) {
                yMax = tileGroup[index].y;
            }
        }
    }

    return {
        name: tileGroup.name,
        xMin,
        xMax,
        yMin,
        yMax,
        size: tiles.length,
        tiles
    };
}