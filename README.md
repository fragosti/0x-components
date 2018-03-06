# 0x-components

## Intro
The project is set up like a styleguide of components and not like an app. 

```
 $ yarn start 
 ``` 
Will run a styleguidist instance with the `<TokenBalanceInput/>` on display with some default props. 

The only other configuration that is necessary is an infura API key (for the web3 provider), but I have provided that by not .gitignore-ing my `.env` file for convenience. 

Staged files are set up to be linted and prettified on commit.

## Scripts
Run a local styleguidist instance:
```
$ yarn start
```
Build to dist:
```
$ yarn build
```
Lint & fix:
```
$ yarn lint
```
Test and get coverage report:
```
$ yarn test
```

## Feature Completeness
It should meet all the requirements except I'm not sure if Ethereum Name Service lookups actually work. They are set-up to work, but it appears the module I depend on doesn't work as promised.

In terms of things I would've liked to get done:
- More tests. 100% test coverage would be ideal but I just didn't have time.
- More documentation for TokenBalanceInput. Even for the other components perhaps.
- Better typing. There are a few `any` types lying around that I would like to address if I had time, but overall I tried my best to not compromise on that. I'm more accustomed to Flow but wow Typescript is amazing! 💫
- The webpack configuration could be more optimized for publishing to NPM.
- Some cleanup / refactoring things. 
  - All the "renderSuccess" methods in `<TokenBalanceInput/>` could be moved to separate functions in a different file, or even separate components.
  - All the "getPromise" methods in `<TokenBalanceInput/>` could also me moved to higher order functions somewhere else, or implemented with a [recompose helper](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers).
- The `takerTokenAddress` prop is the address of the smart contract, but it would be pretty easy to implement that as the `tokenSymbol` (like ZRX) by using `<AsyncComponent/>` and rendering the current component in the `renderSuccess` method.
- Remove the ethereum-ens dependency and simply use the current web3 utils and point to the ENS address.
- Use [abi-gen](https://github.com/0xProject/0x-monorepo/tree/development/packages/abi-gen) for both the ERC20Token ABI and the ENS ABI.
- Improve the presentation of the UI (make messages prettier, convert the token amount to the canonical unit, change the border color of the input on error, etc...).

## Implementation Decisions
For styling I did not use a component library and kept it pretty minimal using styled-components. I like the API and am a fan of CSS-in-JS 😁. Also they have good Typescript declarations. 

In general I tried not to use anything without declarations except for my ENS dependency. Even for that, I just added a skeleton declaration file as to not turn off the "noImplicitAny" rule. For the web3 dependencies I found that 0x-monorepo had some good stuff and tried to use it where it applied.

## Implementation Details
The three main components are `<TokenBalanceInput/>`, `<TextInput/>` and `<AsyncComponent/>`. 
The responsibility of `<TokenBalanceInput/>` is to be the smart container and use the functionality provided by the other two components. There is some business logic in there, like throwing errors if the address is not valid according to web3, but for the most part it's pretty simple. All the functionality is dependency injected and while I wouldn't liked to provide some of the web3 stuff as defaultProps enzyme wasn't happy about it.

`<AsyncComponent/>` is an abstraction around resolving and rendering promises. Since there are a lot of promises triggered for every `onChange` event it made sense to write a component that could take in a promise and render loading, success, and failure states accordingly.

`<TextInput/>` is just a styled input with a loading spinner.

`<Spinner/>` and `<Container/>` are the other two components but they are entirely presentational. 
