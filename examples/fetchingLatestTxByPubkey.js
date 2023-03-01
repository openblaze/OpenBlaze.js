const OpenBlaze = require('../build/index');
const config = require('./config.json');
(async () => {
  // Generate New Key
  let key = OpenBlaze.generateKey();

  // Private key into a Keypair (PrivateKey and Public key)
  key = OpenBlaze.PrivToKeypair(config.privkey);

  const client = new OpenBlaze.Client({
    node: config.node,
    Keypair: key,
  });

  let tx = await client.lastTxId('i7ySHiDCHPS9Rzlmzefj8bEsKM2fcQPbcgmvFZcEfr7VQtqpUyMr5mEI7dT-FoJy');

  console.log(tx);
})();
