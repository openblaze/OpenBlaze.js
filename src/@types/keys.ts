export type Keypair = {
  public: publicKey;
  private: privateKey;
};

export type publicKey = Uint8Array;
export type privateKey = Uint8Array;
