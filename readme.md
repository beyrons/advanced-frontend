## Advanced-web

[`site deployment`](https://willowy-paprenjak-dcfd4e.netlify.app)

```
project architecture
--------------------
Project configuration :: Webpack, Vite
Code style            :: Feature-Sliced Design, ESlint
Development tools     :: React, Typescript, Redux(RTK-Query)
Test environment      :: Jest, RTL, screenshot-test
Backend               :: json-server
CI pipeline           :: github Actions
Deploy                :: frontend -- netlify.app, backend -- vercel.com
```


<br>

```bash
start project
-------------
npm i --force
npm run start:fullstack:vite

http://localhost:5173/

login: admin
passw: 123
```

<br>
<br>


## More about the Project

Проект написан в соответствии с методологией [Feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)  
В проекте используется библиотека [i18next](https://react.i18next.com/) для работы с переводами [public/locales](public/locales)

<br>

### build project

Для сборки проект содержит 2 конфига:  
1. [`Webpack`](./config/build)
2. [`Vite`](vite.config.ts)

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в [config](/config)
```
- /config/babel     - babel
- /config/build     - конфигурация webpack
- /config/jest      - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука
```
В папке [scripts](/scripts) находятся различные скрипты для рефакторинга / упрощения написания кода / генерации отчетов и т.д.

<br>

### scripts

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:fullstack:vite` - Запуск проекта на vite frontend + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение изменений новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run prepare` - Прекоммит хуки (тестирование вместо github-actions)
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

<br>

### tests

В проекте используются 3 вида тестов:
1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`

<br>

### linting

В проекте используется ESlint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов используется собственный [`eslint-plugin-import-path-fix`](https://github.com/beyrons/project-eslint-plugin-fix-path), который содержит следующие правила:
1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля;
2. layer-imports - запрещаем импорт из верхних слоев (нельзя использовать 'feature' внутри 'entity', 'pages' нельзя использовать внутри 'shared', etc...);
3. public-api-imports - разрешает импорт из других модулей только из "public api". Autofix некорректных импортов.

```bash
start linters
-------------
npm run lint:ts       - Проверка ts файлов линтером
npm run lint:ts:fix   - Исправление ts файлов линтером
npm run lint:scss     - Проверка scss файлов style линтером
npm run lint:scss:fix - Исправление scss файлов style линтером
```

<br>

### storybook

https://storybook.js.org/tutorials  
В проекте для каждого компонента описываются стори-кейсы.   
Запросы на сервер "м**о**каются" с помощью "storybook-addon-mock".  
Файл со стори-кейсами создает рядом с компонентом с расширением ".stories.tsx".  
[`Пример`](/src/shared/ui/Button/Button.stories.tsx)

Запустить storybook можно командой:
```
npm run storybook
```

<br>

### CI pipeline & pre-commit

Конфигурация github actions находится в [github/workflows](/.github/workflows/main.yml).  
В CI прогоняются все виды тестов, сборка проекта и сторибука, линтинг.  

В прекоммит хуках проверяем проект линтерами, конфиг в [husky](.husky/pre-commit) -- используются как альтернатива github-actions

<br>

### Работа с данными

Взаимодействие с данными осуществляется с помощью Redux toolkit.  
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter  

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется [DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

<br>

Для уменьшения bandle и сокращения времени загрузки страниц, используем асинхронные компоненты, подгрузку "чанками":  
[Метод "Suspense" ](/src/app/App.tsx)  
[Метод lazy - делаем компонент асинхронным](src/features/addCommentForm/ui/AddCommentForm/AddCommentForm.async.tsx )  
