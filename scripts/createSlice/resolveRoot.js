// выходим на верхний уровень проекта
const path = require('path');

module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
