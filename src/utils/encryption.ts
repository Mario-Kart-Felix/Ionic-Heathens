import crypto from 'crypto-js';

export const encryptMe = (secret: string) => {
    const encryptedSecret = crypto.AES.encrypt(secret, process.env.REACT_APP_CRYPTO_KEY).toString();
    return encryptedSecret;
};

export const decryptMe = (encryptedSecret: string) => {
    const decryptedSecret = crypto.AES.decrypt(encryptedSecret, process.env.REACT_APP_CRYPTO_KEY);
    const res = decryptedSecret.toString(crypto.enc.Utf8);
    return res;
};
