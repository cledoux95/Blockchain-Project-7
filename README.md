# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Musician, Producer, Distributor and Listener. The user story is similar to any commonly used supply chain process. A Musican can add songs to the inventory system stored in the blockchain. A Producer works with the Musician to record the song, and once the Musician approves the recording, the Producer handles releasing it to the Distributor. The Distributor holds the song for sale until the Listener pruchases it. One limitation right now is that songs are handled as one unique item, sort of an ERC721 token mentality, instead of an ERC20 token where many of the same song can be sold. While no tokenization is occuring here, a song can only be sold once.

To access the live contract as deployed on the Rinkeby network:
Transaction Hash:
`0x8b3ee57547cc6a9b18fb32de101a132c2e577f96c4d0a8ddf76573c44356d099`
Contract Address:
`0xE828d562EE400c2db23E6A521FA38089a8743D0c`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system (this one is deployed on the Rinkeby network).

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
npm install <package>
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/cledoux95/Blockchain-Project-7
```

```
cd Blockchain-Project-7
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

In a separate terminal window, launch the DApp:

```
npm run dev
```

## For migrating to Rinkeby

```
https://medium.com/@andresaaap/how-to-deploy-a-smart-contract-on-a-public-test-network-rinkeby-using-infura-truffle-8e19253870c4
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* Udacity
