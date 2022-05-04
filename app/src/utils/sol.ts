import { Idl, Program, Provider, web3 } from "@project-serum/anchor";

import { clusterApiUrl, Commitment, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import idl from "../../../target/idl/blog.json";
export const PROGRAM_KEY = new PublicKey(idl.metadata.address);

type Opts = {
  preflightCommitment: Commitment;
};

// SystemProgram is a reference to the Solana runtime!
const { Keypair } = web3;

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl("devnet");

// Controls how we want to acknowledge when a transaction is "done".
const opts: Opts = {
  preflightCommitment: "processed",
};

export type ExtendedWindow = Window & typeof globalThis & { solana: any };

export const getProvider = (): Provider => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, (window as ExtendedWindow).solana, {
    commitment: opts.preflightCommitment,
  });
  return provider;
};

export const getProgram = (customProvider?: Provider) => {
  const provider = customProvider || getProvider();
  return new Program(idl as Idl, programID, provider);
};

export const getUserKey = (walletKey: PublicKey) => {
    const userAccount = Keypair.fromSeed(
      new TextEncoder().encode(`${PROGRAM_KEY.toString().slice(0, 15)}__${walletKey.toString().slice(0, 15)}`)
    );
    return userAccount;
  };
  
export async function getUser(program: Program, walletKey: PublicKey) {
  const userAccount = getUserKey(walletKey);
  try {
    const _user = await program.account.userState.fetch(userAccount.publicKey);
    const user = {
      id: userAccount.publicKey.toString(),
      name: _user.name,
    };

    return user;
  } catch {}
}

export async function getBlog(program: Program, id: any) {
    try {
      const blog = await program.account.blogState.fetch(id.publicKey);
      return blog;
    } catch {}
  }
  
  export const getPostById = async (postId: PublicKey, user: string) => {
    const program = getProgram();
    try {
      const post: any = await program.account.postState.fetch(postId);

      return {
        id: postId.toString(),
        title: post.title,
        content: post.content,
        prePostId: post.prePostKey.toString(),
        user
      };
    } catch (e: any) {
      console.log(e, "e");
    }
  };