/// <reference types="vite/client" />
// src/env.d.ts
interface ImportMetaEnv {
    readonly VITE_JWT_SECRET_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
