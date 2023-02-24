import { Keypair } from './keys';
export * from './keys';
export * from './transactions';
export type StatellerClient = {
    node: string;
    port?: string;
    Keypair?: Keypair;
};
