const hre = require("hardhat");

async function main() {

    const MediVault = await hre.ethers.getContractFactory("MediVaultX");

    const mediVault = await MediVault.deploy();

    await mediVault.deployed();

    console.log("MediVault deployed to:", mediVault.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});