export type Gas = {
  result: string;
  signer: string;
  signature: string;
  sequence: number;
  time: number;
};

export type Balance = {
  result: {
    amount: string;
  };
  signer: string;
  signature: string;
  sequence: number;
  time: number;
};
