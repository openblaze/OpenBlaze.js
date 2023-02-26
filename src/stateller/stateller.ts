import { bls12_381 as bls } from '@noble/curves/bls12-381';

import * as types from '../@types';

/**
 *
 * Create a new Stateller client
 *
 * @param {types.StatellerClient} types.StatellerClient
 * @example
 * const client = new Stateller.Client({
 *  node: '127.0.0.1',
 *  Keypair: key,
  });
 *
 */
export interface Client {
  /**
   *
   * Sign base64 encoded data with private key using BLS12-381 algorithm
   *
   * @param {string} data data to encode
   * @returns {string} Encoded
   *
   */
  sign: (data: string) => string;

  /**
   *
   * Verify BLS12-381 signature
   *
   * @param {string}
   * @returns {string}
   *
   */
  verify: (data: string, signature: string) => boolean;

  /**
   *
   * Extract public BLS12-381 key from private
   *
   * @param {types.privateKey} privateKey
   * @returns {types.publicKey} types.publicKey
   *
   */
  priv2pub: (privateKey: types.privateKey) => types.publicKey;

  /**
   *
   * Get the chain state
   *
   */
  state: () => Promise<types.stateRes>;

  /**
   *
   * Get the current gas fee for a specific transaction type
   *
   * @param {types.TransactionTypes} transaction
   * @returns {Promise<types.Gas>} Promise<types.Gas>
   *
   */
  gasFee: (transaction: types.TransactionTypes) => Promise<types.Gas>;

  /**
   *
   * Get the current gas fee for a specific transaction type
   *
   * @param {string} pubkey
   * @returns {Promise<types.Balance>} types.publicKey
   *
   */
  getBalance: (pubkey: string) => Promise<types.Balance>;

  /**
   *
   * Get latest txs from an address
   *
   * @param {string} pubkey The pubkey in which you want to query
   * @returns {PPromise<String>}
   */
  lastTxId: (pubkey: string) => Promise<String>;

  /**
   *
   * Broadcast a transactions
   *
   * @param {types.Transaction} transaction The transaction object
   * @returns {Promise<types.BroadcastRes>} types.BroadcastRes
   * @example
   * let message = {
   * transactionType: 'nominateToSenate',
   * Data: {
   *   message: 'test',
   *   },
   * };
   *
   * await client.broadcast(message)
   */
  broadcast: (transaction: types.Transaction) => Promise<types.BroadcastRes>;
}

export class Client implements Client {
  private node: string;
  private Keypair: types.Keypair;

  constructor({
    node = '',
    port = '11520',
    Keypair = {
      private: new Uint8Array(),
      public: new Uint8Array(),
    },
  }: types.StatellerClient) {
    this.node = node + ':' + port;
    this.Keypair = Keypair;
  }

  set KeyPair(KP: types.Keypair) {
    this.Keypair = KP;
  }

  sign = (data: string): string => {
    if (this.Keypair.private.byteLength >= 0) {
      let decodedData = Buffer.from(data, 'base64');

      return Buffer.from(bls.sign(decodedData, this.Keypair.private)).toString('base64url');
    } else {
      throw new Error('No keypair initalized');
    }
  };

  verify = (data: string, signature: string): boolean => {
    let decodedData = Buffer.from(data, 'base64');
    let decodedSignature = Buffer.from(signature, 'base64');

    return bls.verify(decodedSignature, decodedData, this.Keypair.public);
  };

  priv2pub = (privatKey: types.privateKey): Uint8Array => {
    return Buffer.from(bls.getPublicKey(privatKey));
  };

  state = async (): Promise<types.stateRes> => {
    let state: string = await fetch('http://' + this.node + '/state').then((res) => res.text());

    return JSON.parse(state);
  };

  gasFee = async (transaction: types.TransactionTypes): Promise<types.Gas> => {
    let fee = await fetch('http://' + this.node + '/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'gas',
        input: transaction,
      }),
    });

    return fee.json();
  };

  getBalance = async (pubkey: string): Promise<types.Balance> => {
    let fee = await fetch('http://' + this.node + '/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'balance',
        input: pubkey,
      }),
    });

    return fee.json();
  };

  lastTxId = async (pubkey: string): Promise<String> => {
    let lastTx: string = await fetch('http://' + this.node + `/lastTxId/${pubkey}`).then((res) => res.text());

    return lastTx;
  };

  broadcast = async (transaction: types.Transaction): Promise<types.BroadcastRes> => {
    let pubkey = Buffer.from(this.Keypair.public).toString('base64url');
    let txType = transaction.transactionType;
    let anchoredTxId: string | null = await fetch('http://' + this.node + '/lastTxId/' + pubkey).then((res) =>
      res.text(),
    );

    if (anchoredTxId == 'null') {
      anchoredTxId = null;
    }

    let expires = Date.now() + 40000;

    let res = await fetch('http://' + this.node + '/broadcastTx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senateSignatures: [],
        anchoredTxId,
        signer: pubkey,
        type: txType,
        expires,
        input: transaction.Data,
        signature: Buffer.from(
          bls.sign(
            Buffer.from(JSON.stringify({ input: transaction.Data, type: txType, anchoredTxId, expires })),
            this.Keypair.private,
          ),
        ).toString('base64url'),
      }),
    });

    return res.json();
  };
}
