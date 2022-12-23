import { Project } from 'ts-morph';

// создаем инстанс :: https://ts-morph.com/setup/
const project = new Project({});


// добавляем файлы с исходным кодом, с которыми будем работать. TS-morph будет по ним рекурсивно проходить
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');


// получаем все ts/tsx-файлы проекта
const files = project.getSourceFiles();


// проверка импорта
function isAbsolute(value: string) {
    // алиасы добавляем только к абсолютным и тем, которые не библиотечные, т.е. они должны находиться в одном из слоев FSD
    const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'];
    return layers.some((layer) => value.startsWith(layer));      // если value (импорт) начинается с одним из наименований layers...
}


// итеррируемся по полученным файлам и проводим необходимые манипуляции
files.forEach((sourceFile) => {
    // работаем с нодам абстрактного синтаксического дерева (AST)
    const importDeclarations = sourceFile.getImportDeclarations();      // импорты (нода), которые будем исправлять

    importDeclarations.forEach((importDeclaration) => {
        // достаем из ноды данные
        const value = importDeclaration.getModuleSpecifierValue();      // список импортов

        if (isAbsolute(value)) {
            // добавляем алиас к импорту
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

// сохраняем
project.save();
