const Stateller = require('../build/index');
const config = require('./config.json');
(async () => {
  // Private key into a Keypair (PrivateKey and Public key)
  let Vkey = Stateller.PrivToKeypair(config.privkey);

  const client = new Stateller.Client({
    node: config.node,
    Keypair: Vkey,
  });

  let res = await client.balance('i30sgqkHgyZF2FlYEahhdY1P2hnMm_7oRVsfbVzfs5CKcYX8_VW_vdaDmcfNHnqC');

  console.log(res);
})();
