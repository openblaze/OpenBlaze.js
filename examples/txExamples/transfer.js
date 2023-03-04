const OpenBlaze = require('../../build/index');
const config = require('../config.json');
(async () => {
  // Private key into a Keypair (PrivateKey and Public key)
  let Vkey = OpenBlaze.PrivToKeypair(config.privkey);

  const client = new OpenBlaze.Client({
    node: config.node,
    Keypair: Vkey,
  });

  const transaction = {
    transactionType: 'transfer',
    Data: {
      denom: 'ublaze',
      reciever: 'burn',
      amount: '1000',
    },
  };

  let res = await client.broadcast(transaction);

  console.log(res);
})();

//  qvIZV3nOzTicqud4Krf-0dVQzToGQt7CxEZXMbROch5p6Lfx-z2wFAcyFGH_Rhid pub
// X0RuQZ4GANdS3BclXaC8K0YY0EXDTE01lcTVgLayaSw priv
