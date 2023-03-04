const OpenBlaze = require('../build/index');
const config = require('./config.json');
(async () => {
  // Private key into a Keypair (PrivateKey and Public key)
  let Vkey = OpenBlaze.PrivToKeypair(config.privkey);

  const client = new OpenBlaze.Client({
    node: config.node,
    Keypair: Vkey,
  });

  // Queries from your node selected above
  let res = await client.fetchBalance('oTv_DOtvxnlS5yjsbhJJwsl91p9SnuYFufkwwjAdYgxgAFSKshkt2S76YuuryXw6', false);

  console.log(res);
})();
