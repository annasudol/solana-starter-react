import { PublicKey } from "@solana/web3.js";

import idl from "../../../target/idl/blog.json";

export const PROGRAM_KEY = new PublicKey(idl.metadata.address);
