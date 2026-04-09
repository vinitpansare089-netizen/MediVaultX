pragma solidity ^0.8.0;

struct Record {
    string ipfsHash;
    address owner;
}

mapping(address => Record[]) public records;
mapping(address => mapping(address => bool)) public access;

function addRecord(string memory _hash) public {
    records[msg.sender].push(Record(_hash, msg.sender));
}

function grantAccess(address doctor) public {
    access[msg.sender][doctor] = true;
}

function revokeAccess(address doctor) public {
    access[msg.sender][doctor] = false;
}

function getRecords(address patient) public view returns (Record[] memory) {
    require(
        patient == msg.sender || access[patient][msg.sender],
        "Not authorized"
    );
    return records[patient];
}