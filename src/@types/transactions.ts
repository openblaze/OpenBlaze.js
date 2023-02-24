export type Transaction = {
  transactionType: TransactionTypes;
  Data: {};
};

export type TransactionTypes = 'nominateToSenate';

export type BroadcastRes = {
  ok: boolean;
};
