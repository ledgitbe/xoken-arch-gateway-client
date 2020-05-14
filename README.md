Xoken Arch Gateway client

> Javascript SDK to talk to Xoken Arch Gateway

[![Codecov branch](https://img.shields.io/codecov/c/gitlab/ledgit/xoken-arch-gateway-client/master)](https://codecov.io/gl/ledgit/xoken-arch-gateway-client)
[![Gitlab pipeline status (branch)](https://img.shields.io/gitlab/pipeline/ledgit/xoken-arch-gateway-client/master)](https://gitlab.com/ledgit/xoken-arch-gateway-client/pipelines)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/xoken-arch-gateway-client)](https://libraries.io/npm/xoken-arch-gateway-client)
[![npm](https://img.shields.io/npm/v/xoken-arch-gateway-client)](https://www.npmjs.com/package/xoken-arch-gateway-client)


# Install

```
npm install xoken-arch-gateway-client
```

# Usage

```
import { Client } from 'xoken-arch-gateway-client'

const client = Client('localhost', 9090);

await client.getBlockByHeight(100);
await client.getBlocksByHeights([100, 101, 102]);
await client.getBlockByHash('00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee');
await client.getBlocksByHashes([
      '000000000000000002af2a6de04d4a1a73973827eae348fe4d3f4d05610ff968',
      '000000000000000007fc734cbf1fc04c59cf7ecb6af0707fd5cf5b8d46dc4c75'
    ]);

await client.getTransactionByTxId('7d3eb236b526bd681b7fc499d657d237b4d3bc21ef25b37fc1c70822849f1243');
await client.getTransactionsByTxIds([
      '6c828920ea3a968f0c3c4a8f14d70b696e0440d8e4e1d019cced1ba2cc63cd51',
      '097cf9d4ec10711e809f316b7738bbbff94efe32ea2cd55e57ddf5840f828741'
    ]);
await client.getOutputsByAddress('13n561iVozTtMXJzAJNA5TQsnTboRvpxae');
await client.getOutputsByAddresses([
      '1P8Jd8qQM7y45iXLM1eiXCCmGRhCPjykZB',
      '16qgC3hzi38xo1vn2gGsNVwWaW1sEH3h9R'
    ]);
await client.getMerkleBranchByTxId('571c7508413415debe4ba146a2ed141e4d4204d0743169ab3366b1f1e1960a5d');
```
