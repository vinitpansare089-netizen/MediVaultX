// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MediVaultX {

    struct Record {
        string ipfsHash;
        address owner;
    }

    mapping(address => Record[]) private records;
    mapping(address => mapping(address => bool)) public access;

    // Add medical record
    function addRecord(string memory _hash) public {
        records[msg.sender].push(Record(_hash, msg.sender));
    }

    // Grant access to doctor
    function grantAccess(address doctor) public {
        access[msg.sender][doctor] = true;
    }

    // Revoke access
    function revokeAccess(address doctor) public {
        access[msg.sender][doctor] = false;
    }

    // View records (only if access given)
    function getRecords(address patient) public view returns (Record[] memory) {
        require(
            patient == msg.sender || access[patient][msg.sender],
            "Access Denied"
        );
        return records[patient];
    }
}