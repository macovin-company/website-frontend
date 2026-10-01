declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    ASSET_PATH?: string;
    MACOVIN_API_BASE_URL?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
