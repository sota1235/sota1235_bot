import { configs } from '@sota1235/eslint-config';

export default [
    ...configs.base(),
    ...configs.typescript({
        tsconfigPath: './tsconfig.json', // optional
    }),
];