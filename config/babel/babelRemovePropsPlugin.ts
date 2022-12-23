import { PluginItem } from '@babel/core';

export default function (): PluginItem {
    return {
        visitor: {
            Program(path, state) {                              // название ноды (см. AST-explorer)
                const forbidden = state.opts.props || [];       // прокидывать будем атрибуты, которые хотим убрать из прод-сборки, к примеру: babelPlugin(['data-testid', 'attr', ...])

                path.traverse({                                 // проходим по всем нодам дерева
                    JSXIdentifier(current) {
                        // т.к. JSXIdentifier-ов может быть много, нужно найти именно тот, который нам нужен
                        const nodeName = current.node.name; // 'data-testid'

                        if (forbidden.includes(nodeName)) {     // по сути: (nodeName === 'data-testid')
                            current.parentPath.remove();        // удаляем ноду ('data-testid')
                        }
                    },
                });
            },
        },
    };
}
