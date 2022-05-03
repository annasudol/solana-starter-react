import { web3 } from "@project-serum/anchor";

import genesisPostAccount from "../../keys/genesisPostAccount-keypair.json";
import initBlogAccount from "../../keys/initBlogAccount-keypair.json";

export const getKeyFromFile = (secretKey: any) => {
  if(secretKey) {
  const arr = Object.values(secretKey);
  const secret = new Uint8Array(arr as any);
  return web3.Keypair.fromSecretKey(secret);
  }
};

export const getKeys = () => {
  const genesisPostKey = genesisPostAccount?._keypair.secretKey && getKeyFromFile(genesisPostAccount._keypair.secretKey)
  const initBlogKey = initBlogAccount?._keypair.secretKey && getKeyFromFile(initBlogAccount._keypair.secretKey)
  return {genesisPostKey, initBlogKey}
};

