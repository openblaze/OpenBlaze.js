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
  let res = await client.fetchBalance('snwj0uTr0gFLOTlHvUgoy6yMwNQxOrPqhU51_pWZDDDddSUtpiBX2GaxuDdWYTnW', false);

  // Verfies with all nodes that this data is correct
  res = await client.fetchBalance('snwj0uTr0gFLOTlHvUgoy6yMwNQxOrPqhU51_pWZDDDddSUtpiBX2GaxuDdWYTnW', true);

  console.log(res);
})();
