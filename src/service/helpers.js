export const objectDeepClone = (obj) => {
    try {
        return JSON.parse(JSON.stringify(obj))
    } catch (err) {
        console.err(err);
        return obj;
    }
}

const predefinedColors = [
    '#FF5733', // Vivid Red
    '#3498db', // Royal Blue
    '#2ecc71', // Emerald Green
    '#f39c12', // Golden Yellow
    '#9b59b6', // Amethyst Purple
    '#e74c3c', // Alizarin Red
    '#1abc9c', // Turquoise
    '#f2c14e', // Sunflower Yellow
    '#34495e', // Midnight Blue
    '#e67e22', // Carrot Orange
];

export const getRandomPredefinedColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
};