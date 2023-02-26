"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const bls12_381_1 = require("@noble/curves/bls12-381");
class Client {
    constructor({ node = '', port = '11520', Keypair = {
        private: new Uint8Array(),
        public: new Uint8Array(),
    }, }) {
        this.sign = (data) => {
            if (this.Keypair.private.byteLength >= 0) {
                let decodedData = Buffer.from(data, 'base64');
                return Buffer.from(bls12_381_1.bls12_381.sign(decodedData, this.Keypair.private)).toString('base64url');
            }
            else {
                throw new Error('No keypair initalized');
            }
        };
        this.verify = (data, signature) => {
            let decodedData = Buffer.from(data, 'base64');
            let decodedSignature = Buffer.from(signature, 'base64');
            return bls12_381_1.bls12_381.verify(decodedSignature, decodedData, this.Keypair.public);
        };
        this.priv2pub = (privatKey) => {
            return Buffer.from(bls12_381_1.bls12_381.getPublicKey(privatKey));
        };
        this.state = () => __awaiter(this, void 0, void 0, function* () {
            let state = yield fetch('http://' + this.node + '/state').then((res) => res.text());
            return JSON.parse(state);
        });
        this.gasFee = (transaction) => __awaiter(this, void 0, void 0, function* () {
            let fee = yield fetch('http://' + this.node + '/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'gas',
                    input: transaction,
                }),
            });
            return fee.json();
        });
        this.getBalance = (pubkey) => __awaiter(this, void 0, void 0, function* () {
            let fee = yield fetch('http://' + this.node + '/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'balance',
                    input: pubkey,
                }),
            });
            return fee.json();
        });
        this.lastTxId = (pubkey) => __awaiter(this, void 0, void 0, function* () {
            let lastTx = yield fetch('http://' + this.node + `/lastTxId/${pubkey}`).then((res) => res.text());
            return lastTx;
        });
        this.broadcast = (transaction) => __awaiter(this, void 0, void 0, function* () {
            let pubkey = Buffer.from(this.Keypair.public).toString('base64url');
            let txType = transaction.transactionType;
            let anchoredTxId = yield fetch('http://' + this.node + '/lastTxId/' + pubkey).then((res) => res.text());
            if (anchoredTxId == 'null') {
                anchoredTxId = null;
            }
            let expires = Date.now() + 40000;
            let res = yield fetch('http://' + this.node + '/broadcastTx', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senateSignatures: [],
                    anchoredTxId,
                    signer: pubkey,
                    type: txType,
                    expires,
                    input: transaction.Data,
                    signature: Buffer.from(bls12_381_1.bls12_381.sign(Buffer.from(JSON.stringify({ input: transaction.Data, type: txType, anchoredTxId, expires })), this.Keypair.private)).toString('base64url'),
                }),
            });
            return res.json();
        });
        this.node = node + ':' + port;
        this.Keypair = Keypair;
    }
    set KeyPair(KP) {
        this.Keypair = KP;
    }
}
exports.Client = Client;
//# sourceMappingURL=stateller.js.map