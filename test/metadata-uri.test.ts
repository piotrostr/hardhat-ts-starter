import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Okemonos } from "../typechain/Okemonos";

describe("Okemonos - uri", () => {
  let contract: Okemonos;

  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
  });

  it("should retrieve the uri correctly, uri points to right uri", async () => {
    const uri = await contract.baseTokenURI();
    expect(uri).to.equal("https://okemonos-api.herokuapp.com/");
  });

  it("should be able to update the uri", async () => {
    const setUriTx = await contract.setBaseTokenURI("foo");
    await setUriTx.wait();
    expect(await contract.baseTokenURI()).to.equal("foo");
  });

  it("returns right metadata uri to nft pieces", async () => {
    const tokenId = BigNumber.from(5);
    const uri = await contract.baseTokenURI();
    const tokenUri = await contract.tokenURI(tokenId);
    expect(tokenUri).to.eq(uri + tokenId.toString());
  });
});
