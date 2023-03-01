const OpenBlaze = require('../build/index');
const config = require('./config.json');
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
      reciever: 'address',
      amount: '1000',
    },
  };

  let res = await client.broadcast(transaction);

  console.log(res);
})();
