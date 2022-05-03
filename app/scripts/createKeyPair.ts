import * as anchor from "@project-serum/anchor";
import * as fs from "fs";

const initBlogAccount = anchor.web3.Keypair.generate();
const genesisPostAccount = anchor.web3.Keypair.generate();

fs.writeFileSync("./keys/initBlogAccount-keypair.json", JSON.stringify(initBlogAccount));
fs.writeFileSync("./keys/genesisPostAccount-keypair.json", JSON.stringify(genesisPostAccount));
