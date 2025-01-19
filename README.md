

### Deployment Example:

```
[coinchimp@us01-pool kaspa-krc721-apps]$ bun deploy.ts --privKey 123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc --logLevel DEBUG
[2025-01-19T21:03:26.964Z] [DEBUG] Main: starting rpc connection
[2025-01-19T21:03:27.621Z] [DEBUG] Main: RPC connection established
[2025-01-19T21:03:27.622Z] [DEBUG] No URLs found in the Resolver.
[2025-01-19T21:03:27.622Z] [DEBUG] Main: Submitting private key
[2025-01-19T21:03:27.622Z] [DEBUG] Main: Determining public key
[2025-01-19T21:03:27.624Z] [DEBUG] Main: Determining wallet address
[2025-01-19T21:03:27.625Z] [INFO] Address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn
[2025-01-19T21:03:27.625Z] [DEBUG] Subscribing to UTXO changes for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn
[2025-01-19T21:03:27.627Z] [DEBUG] Main: Data to use for ScriptBuilder: {"p":"krc-721","op":"deploy","tick":"CCHIMP","max":"1000","metadata":{"name":"Coinchimp Premium","description":"NFT Coinchimp Test","image":"ipfs://bafkreie3v7wi33xc52ioqjylydn4fvahsv4ndgj2474iwcnc34tli3ua6i","attributes":[{"traitType":"access_level","value":"premium"}]},"royaltyFee":"100000000","royaltyOwner":"kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"}
[2025-01-19T21:03:27.628Z] [DEBUG] Constructed Script: 208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac0063046b737072004d82017b2270223a226b72632d373231222c226f70223a226465706c6f79222c227469636b223a22434348494d50222c226d6178223a2231303030222c226d65746164617461223a7b226e616d65223a22436f696e6368696d70205072656d69756d222c226465736372697074696f6e223a224e465420436f696e6368696d702054657374222c22696d616765223a22697066733a2f2f6261666b726569653376377769333378633532696f716a796c79646e34667661687376346e64676a323437346977636e633334746c693375613669222c2261747472696275746573223a5b7b22747261697454797065223a226163636573735f6c6576656c222c2276616c7565223a227072656d69756d227d5d7d2c22726f79616c7479466565223a22313030303030303030222c22726f79616c74794f776e6572223a226b61737061746573743a717a786b66327939723464673937757766356d643932656b386c616135383533616e38663468327475766b77653465726d35746763633468787a356a6e227d68
[2025-01-19T21:03:27.628Z] [DEBUG] P2SH Address: kaspatest:ppw4jcaymekyfcnhy8845xtzvnfsd22np4dl5a47z4v7kcs9rlh6w84lgdhqs
[2025-01-19T21:03:27.762Z] [DEBUG] Main: Transaction signed with ID: 41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac
[2025-01-19T21:03:27.899Z] [INFO] submitted P2SH commit sequence transaction on: 41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac
[2025-01-19T21:03:29.584Z] [DEBUG] UTXO changes detected for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn
[2025-01-19T21:03:29.586Z] [DEBUG] Added UTXO found for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn with UTXO: {"entry":{"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"outpoint":{"transactionId":"41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac","index":1},"amount":"6642074168463n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"},"blockDaaScore":"84702099n","isCoinbase":false},"outpoint":{"transactionId":"41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac","index":1},"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"amount":"6642074168463n","isCoinbase":false,"blockDaaScore":"84702099n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"}}
[2025-01-19T21:03:29.586Z] [DEBUG] Removed UTXO found for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn with UTXO: {"entry":{"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"outpoint":{"transactionId":"ed8f89b4064a254d76612b56e8939b7faea25e2a239a836be7a9f1333c7d66c7","index":1},"amount":"6642674170963n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"},"blockDaaScore":"84702033n","isCoinbase":false},"outpoint":{"transactionId":"ed8f89b4064a254d76612b56e8939b7faea25e2a239a836be7a9f1333c7d66c7","index":1},"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"amount":"6642674170963n","isCoinbase":false,"blockDaaScore":"84702033n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"}}
[2025-01-19T21:03:29.586Z] [DEBUG] Added UTXO TransactionId: 41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac
[2025-01-19T21:03:29.905Z] [DEBUG] Main: creating UTXO entries from kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn
[2025-01-19T21:03:30.055Z] [DEBUG] Main: creating revealUTXOs from P2SHAddress
[2025-01-19T21:03:30.192Z] [DEBUG] Main: Creating Transaction with revealUTX0s entries: {"entry":{"address":"kaspatest:ppw4jcaymekyfcnhy8845xtzvnfsd22np4dl5a47z4v7kcs9rlh6w84lgdhqs","amount":"400000000","outpoint":{"transactionId":"41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac","index":0},"scriptPublicKey":"0000aa205d5963a4de6c44e27721cf5a196264d306a9530d5bfa76be1559eb62051fefa787","blockDaaScore":"84702099","isCoinbase":false}}
[2025-01-19T21:03:30.193Z] [DEBUG] Main: Transaction with revealUTX0s signed with ID: 0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21
[2025-01-19T21:03:30.330Z] [INFO] submitted reveal tx sequence transaction: 0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21
[2025-01-19T21:03:31.440Z] [DEBUG] UTXO changes detected for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn
[2025-01-19T21:03:31.441Z] [DEBUG] Added UTXO found for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn with UTXO: {"entry":{"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"outpoint":{"transactionId":"0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21","index":0},"amount":"6542474165721n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"},"blockDaaScore":"84702103n","isCoinbase":false},"outpoint":{"transactionId":"0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21","index":0},"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"amount":"6542474165721n","isCoinbase":false,"blockDaaScore":"84702103n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"}}
[2025-01-19T21:03:31.441Z] [DEBUG] Removed UTXO found for address: kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn with UTXO: {"entry":{"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"outpoint":{"transactionId":"41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac","index":1},"amount":"6642074168463n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"},"blockDaaScore":"84702100n","isCoinbase":false},"outpoint":{"transactionId":"41529f07e8183fff171ba370fffe56f311faaa7065312518e3e46954fb926aac","index":1},"address":{"version":"PubKey","prefix":"kaspatest","payload":"qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn"},"amount":"6642074168463n","isCoinbase":false,"blockDaaScore":"84702100n","scriptPublicKey":{"version":0,"script":"208d64a8851d5a82fb8e4d36d2ab363ffbda1e91ecce9add4be32cecd723dd168cac"}}
[2025-01-19T21:03:31.441Z] [DEBUG] Added UTXO TransactionId: 0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21
[2025-01-19T21:03:31.971Z] [INFO] Reveal transaction has been accepted: 0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21
[2025-01-19T21:03:31.972Z] [INFO] RPC client disconnected.
```

### REST APIs Examples

`https://testnet-10.krc721.stream/api/v1/krc721/testnet-10/ops/txid/2eb791fed1f91bed855c8fd4abd0b51c43af27a1218d07081fe7597ab4943a4a`

```
{"message":"success","result":{"p":"krc-721","deployer":"kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn","to":"kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn","tick":"CCHIMP","txIdRev":"2eb791fed1f91bed855c8fd4abd0b51c43af27a1218d07081fe7597ab4943a4a","mtsAdd":"1737321346402","op":"mint","opData":{"token_id":"847","royalty":{"royaltyFee":"6531374159949"}},"opScore":"20733527136000","feeRev":"11000002742"}}
```

`https://testnet-10.krc721.stream/api/v1/krc721/testnet-10/nfts/CCHIMP`
```
{"message":"success","result":{"deployer":"kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn","royaltyTo":"kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn","metadata":{"name":"Coinchimp Premium","description":"NFT Coinchimp Test","image":"ipfs://bafkreie3v7wi33xc52ioqjylydn4fvahsv4ndgj2474iwcnc34tli3ua6i","attributes":[{"traitType":"access_level","value":"premium"}]},"max":"1000","royaltyFee":"100000000","daaMintStart":"0","premint":"0","tick":"CCHIMP","txIdRev":"0e63b3355d0119ac11f536f9f032c6d4998db8fb95ecadb0fa37dc5d76ffba21","mtsAdd":"1737320615747","minted":"1","opScoreMod":"20733527136000","state":"deployed","mtsMod":"1737321346402","opScoreAdd":"20733345104000"}}
```

`https://testnet-10.krc721.stream/api/v1/krc721/testnet-10/address/kaspatest:qzxkf2y9r4dg97uwf5md92ek8laa5853an8f4h2tuvkwe4erm5tgcc4hxz5jn`

```
{"message":"success","result":[{"tick":"CCHIMP","tokenid":"847","opScoreMod":"20733527136000"}]}
```

### Troubleshooting
Issues with lenght of the script:
```
[2025-01-19T21:02:17.955Z] [DEBUG] Main: Transaction with revealUTX0s signed with ID: f455b8d62d749b87defc5bf7dc9b66604cd88078e8ca7bcc03b19bb7f722b32d
error: adding a data element of 526 bytes exceed the maximum allowed script element size of 520
```