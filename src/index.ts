import { start, routes, useRoute, jwt } from "./main.js"
import { AbstractBaseController, AbstractBaseRoute, useController, setupBase } from "./baseClass.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

var __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

/* eslint-enable @typescript-eslint/ban-ts-comment */
export {
    start,
    routes,
    useRoute,
    setupBase,
    AbstractBaseController,
    AbstractBaseRoute,
    useController,
    jwt
};