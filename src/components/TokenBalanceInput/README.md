Render a TokenBalanceInput:

```
const reqweb3 = require("../../util/web3");
const ens = require("../../util/web3/ens");
const web3 = reqweb3.default;
const getBalance = reqweb3.getBalance;

<TokenBalanceInput  
  takerTokenAddress="0xe41d2489571d322189246dafa5ebde1f4699f498"
  getBalance={getBalance}
  isValidAddress={web3.isAddress}
  reverseENSLookup={ens.reverse}
  resolveENS={ens.resolver}
/>
```