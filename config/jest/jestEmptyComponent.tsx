// 'mock' для всех импортов svg. Svg не тестируются unit-test'ом (они тестируются скриншотными тестами), но для него и создается эта "заглушка"
// Т.е., главное чтобы unit-test отрабатывал и ничего не ломалось
// маппер, котрый будет возвращать для svg компонент

import React from 'react';

const jestEmptyComponent = () => <div />;

export default jestEmptyComponent;
