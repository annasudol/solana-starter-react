/* eslint-disable @typescript-eslint/no-explicit-any */
// import { PublicKey } from "@solana/web3.js";

export enum ACCOUNT_ERROR {
  NOT_CREATED = "NOT_CREATED",
}
export interface UserData {
  name: string;
  id: string;
}

export interface PostCardData {
  id: string;
  title: string;
  user: string;
  prepostId: string;
}

export type UseWallet = () => {
  walletAddress?: string;
  connectWallet: () => Promise<void>;
};

export type ExtendedWindow = Window & typeof globalThis & { solana: any };
