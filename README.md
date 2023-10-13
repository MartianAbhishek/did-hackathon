# Multi-Business Client Management Web Application with Decentralized Identity Verification and Transaction Scheduling

### Project Description

Building a Multi-Business Client Management Web Application with Decentralized Identity Verification using [Onyx SSI SDK](https://github.com/jpmorganchase/onyx-ssi-sdk) and Transaction Scheduling

In the ever-evolving landscape of business operations and relationships, managing multiple clients efficiently is vital for any enterprise. However, traditional client management methods can often be cumbersome and lack the security and transparency necessary for the digital age. This project aims to address these challenges by developing a cutting-edge web application that simplifies and streamlines client registration, verification, and transaction scheduling for businesses.

1. Introduction

Our web application is designed to empower businesses with a powerful, user-friendly platform to register multiple other businesses as clients, seamlessly verify their decentralized identities, and efficiently schedule transactions for the future, all while ensuring flexibility and security.

2. Features

Client Registration: The core functionality of the web application is centered around businesses registering other businesses as clients. To do this, the administrator must fill out a comprehensive registration form. This form includes fields for the client's name, Ethereum address, and a DID JWT (Decentralized Identity) token, which serves as a unique identifier for the client. The use of Ethereum addresses adds an extra layer of transparency and security to the registration process, helping to prevent fraudulent registrations and ensuring the accuracy of the data.

Decentralized Identity Verification: To ensure the trustworthiness and authenticity of registered clients, the application uses DID JWT tokens. These tokens serve as proof of a decentralized identity, enhancing the security of the client registration process. The use of decentralized identity technology also aligns with the broader industry trends that emphasize user data protection and privacy.

Transaction Scheduling: The application provides a convenient and intuitive interface for administrators to schedule transactions to their registered clients. These transactions can be set for future timestamps, allowing businesses to plan their financial operations effectively. This feature is not only about scheduling regular payments but also for initiating transactions for specific purposes, such as supplier payments or service charges.

Cancellation Functionality: Sometimes, plans change, and transactions need to be canceled or rescheduled. Our web application includes a user-friendly cancellation feature that allows administrators to adjust or completely cancel previously scheduled transactions, offering flexibility and reducing the risk of unintended financial commitments.

3. Benefits

Enhanced Efficiency: By providing a centralized platform for businesses to manage their clients and transactions, the application reduces the administrative workload, streamlining client management and financial operations.

Security and Trust: The use of Ethereum addresses and DID JWT tokens enhances security and trust in the client registration process, reducing the risk of fraudulent registrations and improving data accuracy.

Decentralized Identity: Embracing decentralized identity technology aligns the application with the future of digital identity management, emphasizing user privacy and control over personal data.

Future-Proof: The ability to schedule transactions for future timestamps and the option to cancel them ensures that businesses can adapt to changing circumstances and financial needs.

Intuitive Interface: The application is designed with user-friendliness in mind, ensuring that even those without extensive technical expertise can easily manage clients and transactions.

4. Conclusion

Our project aims to revolutionize the way businesses manage their clients and financial transactions by offering a comprehensive, secure, and user-friendly web application. With features such as decentralized identity verification, transaction scheduling, and cancellation functionality, it's poised to become an invaluable tool for businesses seeking efficient and transparent client management. By embracing modern technologies and best practices, this application positions itself as a forward-looking solution for the dynamic and evolving business landscape.

### Project Structure
Each folder contains its own README file which properly explains and guide through that particular module
- [b2b-client](https://github.com/MartianAbhishek/did-hackathon/blob/main/b2b-client/README.md): Web App which demostrates the potential use of DID in B2B industry
- [b2b-contract](https://github.com/MartianAbhishek/did-hackathon/blob/main/b2b-contract/README.md): Smart Contract which is used by the project to schedule transaction for businesses
- [b2b-services](https://github.com/MartianAbhishek/did-hackathon/blob/main/b2b-services/README.md): web2 services which powers client management off-chain with complete security and efficiency

### Live Preview (Demo): https://did-hack.web.app
