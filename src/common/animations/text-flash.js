export default function(originalColor, targetColor, pixiText) {
    const backToOriginalColor = (text) => {
        text.style.fill = originalColor;
    };
    pixiText.style.fill = targetColor;
    window.setTimeout(function() {
        backToOriginalColor(pixiText);
    }, 300);
};