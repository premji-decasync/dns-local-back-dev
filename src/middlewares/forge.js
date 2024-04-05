const forge = require('node-forge');

const key = 'mySecretKey';

// Function to encrypt a string using AES
function encrypt(text, key) {
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv: forge.random.getBytesSync(16) });
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    return cipher.output.toHex();
}

// Function to decrypt an AES encrypted string
function decrypt(encryptedText, key) {
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv: forge.random.getBytesSync(16) });
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedText)));
    decipher.finish();
    return decipher.output.toString();
}


const originalString = 'Hello, World!';
const encryptedString = encrypt(originalString, key);
console.log("Encrypted string:", encryptedString);

const decryptedString = decrypt(encryptedString, key);
console.log("Decrypted string:", decryptedString);