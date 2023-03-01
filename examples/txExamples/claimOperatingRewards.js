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
    transactionType: 'claimOperatingRewards',
    Data: {
      time: Date.now(),
    },
  };

  console.log(transaction);
  let res = await client.broadcast(transaction);

  console.log(res);
})();
