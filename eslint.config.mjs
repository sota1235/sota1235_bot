import { configs } from '@sota1235/eslint-config';

export default [
    ...configs.base(),
    ...configs.typescript({
        tsconfigPath: './tsconfig.eslint.json', // optional
    }),
];