import React, { useState, useEffect } from "react";
import WAValidator from "multicoin-address-validator/dist/wallet-address-validator";
import Web3 from "web3"; // Import the web3 library

import Form from "./Components/Form/Index";
import Qr from "./Components/Qr/Index";

import styles from "./style.module.scss";

function App() {
  const initialAddress = "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c";
  const contractAddress = "0x898fde99707f7E868dff3D9Cbc075a3497f4C55d"; // Replace with your smart contract address
  const contractABI = [
    {
      "inputs": [],
      "name": "generatedAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "hashedProductName",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "productName",
          "type": "string"
        }
      ],
      "name": "generateAddressAndHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] // Replace with your smart contract ABI

  const [state, setState] = useState({
    network: "eth",
    productName: "",
    invalidAddress: false,
  });

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Connect to Alchemy provider
    const alchemyHttpUrl = "https://eth-sepolia.g.alchemy.com/v2/ooi7DLlrsAmidQyU59gdafWeQFbsTUvw"; // Replace with your Alchemy API key
    const web3Instance = new Web3(new Web3.providers.HttpProvider(alchemyHttpUrl));
    setWeb3(web3Instance);

    // Initialize the smart contract
    const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
    setContract(contractInstance);
  }, [contractABI, contractAddress]);

  const changeAddress = (e) => {
    let newAddress = e.target.value;
    // Do not update the address value
    console.log("Attempting to update address:", newAddress);
  };

  const changeName = (e) => {
    let newProName = e.target.value;
    setState((prev) => ({ ...prev, productName: newProName }));
  };

  const changeNetwork = (e) => {
    let newNetwork = e.target.value;
    let isValidAddress = WAValidator.validate(initialAddress, newNetwork);

    setState((prev) => ({
      ...prev,
      invalidAddress: !isValidAddress,
      network: newNetwork,
    }));
  };

  return (
    <div className={styles.App}>
      <Form
        address={initialAddress}
        changeAddress={changeAddress}
        network={state.network}
        changeNetwork={changeNetwork}
        invalidAddress={state.invalidAddress}
        productName={state.productName}
        changeName={changeName}
      />
      <Qr value={initialAddress} invalidAddress={state.invalidAddress} />

      {web3 && contract && (
        <div>
          {/* You can now interact with your smart contract using web3 and contract instance */}
          {/* Example: Call a smart contract function */}
          <button 
            onClick={async () => {
              const result = await contract.methods.someFunction().call();
              console.log("Smart Contract Result:", result);
            }}
          >
            Call Smart Contract
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
