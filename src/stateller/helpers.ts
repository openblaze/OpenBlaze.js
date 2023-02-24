import { bls12_381 as bls } from '@noble/curves/bls12-381';
import * as types from '../@types';

export function generateKey(): types.Keypair {
  let privkey = bls.utils.randomPrivateKey();
  let pubkey = bls.getPublicKey(privkey);

  return {
    public: pubkey,
    private: privkey,
  };
}

export function BufferReader(key: Uint8Array): string {
  return Buffer.from(key).toString('base64url');
}

export function PrivToKeypair(priv: string): types.Keypair {
  let Privkey: Uint8Array = Buffer.from(priv, 'base64');
  let Pubkey: Uint8Array = Buffer.from(bls.getPublicKey(Privkey));

  return {
    private: Privkey,
    public: Pubkey,
  };
}
