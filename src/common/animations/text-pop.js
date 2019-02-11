export default function textPop(pixiText, factor) {
    let pop = 1 + (factor * 0.1);
    pixiText.scale.set(pop, pop);
}