const Stateller = require('../build/index');
const config = require('./config.json');
(async () => {
  // Generate New Key
  let key = Stateller.generateKey();

  // Private key into a Keypair (PrivateKey and Public key)
  key = Stateller.PrivToKeypair(config.privkey);

  const client = new Stateller.Client({
    node: config.node,
    Keypair: key,
  });

  let tx = await client.lastTxId('jeMptuWhrK5MOlCVTKCaJtl9nN8llUZD3kDutGGrDIIw1PhlLWOQ8d9m1M4swl63');

  console.log(tx);
})();
