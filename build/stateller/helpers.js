"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivToKeypair = exports.BufferWriter = exports.BufferReader = exports.generateKey = void 0;
const bls12_381_1 = require("@noble/curves/bls12-381");
function generateKey() {
    let privkey = bls12_381_1.bls12_381.utils.randomPrivateKey();
    let pubkey = bls12_381_1.bls12_381.getPublicKey(privkey);
    return {
        public: pubkey,
        private: privkey,
    };
}
exports.generateKey = generateKey;
function BufferReader(key) {
    return Buffer.from(key).toString('base64url');
}
exports.BufferReader = BufferReader;
function BufferWriter(key) {
    return Buffer.from(key, 'base64');
}
exports.BufferWriter = BufferWriter;
function PrivToKeypair(priv) {
    let Privkey = Buffer.from(priv, 'base64');
    let Pubkey = Buffer.from(bls12_381_1.bls12_381.getPublicKey(Privkey));
    return {
        private: Privkey,
        public: Pubkey,
    };
}
exports.PrivToKeypair = PrivToKeypair;
//# sourceMappingURL=helpers.js.map