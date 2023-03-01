export type Transaction = {
    transactionType: TransactionTypes;
    Data: {};
};
export type TransactionTypes = 'nominateToSenate' | 'transfer' | 'voteForSenator' | 'voteForTime' | 'claimOperatingRewards';
export type BroadcastRes = {
    ok: boolean;
    txHash: string;
};
