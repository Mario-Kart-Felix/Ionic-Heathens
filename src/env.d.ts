declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_SERVER_URL: string;
    REACT_APP_SERVER_DOMAIN: string;
    REACT_APP_RECAPTCHA_KEY: string;
    REACT_APP_CRYPTO_KEY: string;
    REACT_APP_NODE_ENV: string;
    NODE_ENV: string;
  }
}
