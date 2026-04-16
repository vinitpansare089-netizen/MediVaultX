import hre from "hardhat";

async function main() {

    const MediVault = await hre.ethers.getContractFactory("MediVault");

    const mediVault = await MediVault.deploy();

    await mediVault.waitForDeployment();

    console.log("MediVault deployed to:", await mediVault.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});