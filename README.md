# OpenBlaze.js

# Notice

This library isnt fully complete, and will include breaking changes often

## Overview

OpenBlaze.js is a is a high level library that allows you to interact with [OpenBlaze](https://github.com/angrymouse/openblaze) an appchain framework.<br>

## Getting Started

```js
const OpenBlaze = require('openblaze'); // Place holder name
const config = require('./config.json');

(async () => {
  // Turn your private key string into a keypair
  let Vkey = OpenBlaze.PrivToKeypair(config.privkey);

  const client = new OpenBlaze.Client({
    node: config.node,
    Keypair: Vkey,
  });

  let res = await client.broadcast({
    transactionType: 'transfer',
    Data: {
      denom: 'ublaze',
      reciever: 'burn',
      amount: '1000', // exponent being 6
    },
  });

  console.log(res);
})();
```

## Installing

To:Do

## Documentation

OpenBlaze.js currently has no documentation, other than [examples](https://github.com/ducksquaddd/OpenBlaze.js/tree/master/examples)
