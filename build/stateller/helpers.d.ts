import * as types from '../@types';
export declare function generateKey(): types.Keypair;
export declare function BufferReader(key: Uint8Array): string;
export declare function BufferWriter(key: string): Uint8Array;
export declare function PrivToKeypair(priv: string): types.Keypair;
