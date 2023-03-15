import CryptoJS from 'crypto-js';

const cipher = (text) => {
  const passphrase = "evermansaltman";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decipher = (ciphertext) => {
  const passphrase = "evermansaltman";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export { cipher, decipher };