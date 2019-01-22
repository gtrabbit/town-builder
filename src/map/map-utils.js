export function isCloseTo(coordsOne, coordsTwo, distance) {
    let x1 = coordsOne[0];
    let x2 = coordsTwo[0];
    let y1 = coordsOne[1];
    let y2 = coordsTwo[1];
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2) <= distance);
}