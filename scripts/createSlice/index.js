const createTemplate = require('./templates/createTemplate');

// Достаем из аргументов слой и название слайса:
const layer = process.argv[2];
const sliceName = process.argv[3];

// Например:
// process.argv.forEach((value) => console.log(value));
// - первым аргументом будет путь до скрипта:     ~/web/scripts/createSlice/index.js
// - вторым аргументом (layer = process.argv[2]): entities              -- слой
// - третьим (consts sliceName = process.argv[3]): testEntitiesName      -- слайс

// Далее, создаем массив
const layers = ['features', 'entities', 'pages'];

// Проверяем наличие слоя
if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
    throw new Error('Укажите название слайса');
}

createTemplate(layer, sliceName);
