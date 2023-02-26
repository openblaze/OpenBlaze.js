export type Transaction = {
    transactionType: TransactionTypes;
    Data: {};
};
export type TransactionTypes = 'nominateToSenate' | 'transfer' | 'voteForSenator' | 'log';
export type BroadcastRes = {
    ok: boolean;
    txHash: string;
};
