---
title: Socraticoin 
date: "2024-09-24"
tags: [ "project", "typescript", "nextjs", "crypto" ]
---

Most explanations of blockchain oversimplify the "digital ledger" metaphor greatly. The ones that don't are 3 hour long protocol deep dives that no one sits through. At HackDearborn 2024, with one of the tracks being Financial Literacy, my team and I identified a perfect fit in making an educational blockchain simulator.  

Socraticoin is a webapp that lets users mine blocks, make transactions and add these transactions to the blockchain. By giving them a full overview into the different roles involved, it makes it clear that the blockchain really isn't that complicated at all. 

Socraticoin is a full, client side blockchain with:
- Wallet creation using cryptographic keypairs
- Transaction signing and validation
- Block mining with a PoW loop
- A transactional pool where unmined transactions accumulate

By actually running the mining algorithm and watching transactions move from the pool into blocks, users see firsthand that "mining" is just trying different nonces until you find a valid hash. The cryptographic signing becomes tangible when you create a wallet and see your private key actually sign transaction data. 

![Socraticoin](/soc.png)

[View the source on GitHub](https://github.com/chess10kp/socraticoin)
