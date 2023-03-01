const OpenBlaze = require('../build/index');
const config = require('./config.json');
(async () => {
  // Generate New Key
  let key = OpenBlaze.generateKey();
  // Private key into a Keypair (PrivateKey and Public key)
  key = OpenBlaze.PrivToKeypair(config.privkey);

  let pubKey = OpenBlaze.priv2pub(key.private);

  console.log(OpenBlaze.BufferReader(pubKey));
})();
