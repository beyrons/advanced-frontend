import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';


export default defineConfig({
    plugins: [
        svgr({ exportAsDefault: true }),
        react(),
    ],
    resolve: {
        alias: [                                        // что должно заменяться, если мы добавили алиасы,
            { find: '@', replacement: '/src' },         // т.е. по сути мы указываем что "@/entities/User" заменить на "src/entities/User "
        ],
    },
    define: {                                           // по аналогии как в webpack (buildPlugins.ts)
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),   // url backend
        __PROJECT__: JSON.stringify('frontend'),
    },
});
