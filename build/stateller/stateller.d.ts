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
    state: () => Promise<Object>;
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
export declare class Client implements Client {
    private node;
    private Keypair;
    constructor({ node, port, Keypair, }: types.StatellerClient);
    set KeyPair(KP: types.Keypair);
    sign: (data: string) => string;
    verify: (data: string, signature: string) => boolean;
    priv2pub: (privateKey: Uint8Array) => Uint8Array;
    state: () => Promise<Object>;
    lastTxId: (pubkey: string) => Promise<String>;
    broadcast: (transaction: types.Transaction) => Promise<types.BroadcastRes>;
}
