// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QRCodeGenerator {
    address public generatedAddress;
    bytes32 public hashedProductName;

    function generateAddressAndHash(string memory productName) public {
        // Concatenate the product name with some randomness for uniqueness
        string memory combinedString = string(abi.encodePacked(productName, block.timestamp));

        // Hash the combined string to get an Ethereum address
        generatedAddress = address(uint160(uint256(keccak256(abi.encodePacked(combinedString)))));

        // Hash the product name
        hashedProductName = keccak256(abi.encodePacked(productName));
        
    }
}
