### Генератор для создания структур для entities, features, pages

---

Запуск:
```bash
# features
node ./scripts/createSlice/index.js features testFeaturesName

# entities
node ./scripts/createSlice/index.js entities testEntitiesName

# pages, если есть необходимость
node ./scripts/createSlice/index.js pages testPagesName
```

Будет автоматически создана струкутра по типу:
```bash
testFeaturesName
  ├─ index.ts
  ├─ model
  │ ├─ selectors
  │ ├─ services
  │ ├─ slices
  │ │ └─ testFeaturesNameSlice.ts
  │ └─ types
  │     └─ testFeaturesNameSchema.ts
  └─ components
      └─ TestFeaturesName
          ├─ TestFeaturesName.module.scss
          ├─ TestFeaturesName.stories.tsx
          └─ TestFeaturesName.tsx
```

Стартовый скрипт "index.js", где последовательно запускаются функции на создание каталогов и шаблонов в них.

---
Подключаем к webstorm:
```bash
# package.json
"scripts": {  
  ... 
  "generate:slice": "node ./scripts/createSlice/index.js"
  
# запуск из терминала
npm run generate:slice entities testEntitiesName  
```

