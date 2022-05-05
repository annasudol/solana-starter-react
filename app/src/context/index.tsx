/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
// context/WalletSolContext.tsx
import * as anchor from "@project-serum/anchor";
import { Idl, IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl";
import { IdlTypes, TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { Keypair, PublicKey } from "@solana/web3.js";
import { PostCardData, UserData } from "@types";
import { getKeys, getPostById, getProgram, getProvider, getUser, getUserKey, notify } from "@utils";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

const { SystemProgram } = anchor.web3;

export type WalletSolContextType = {
  user?: UserData | null;
  isInitBlog?: boolean;
  initBlog: () => Promise<TypeDef<IdlTypeDef, IdlTypes<Idl>> | undefined>;
  signUpUser: (name: string) => Promise<string | undefined>;
  createPost: (title: string, userID: string) => Promise<string | undefined>;
  postList?: PostCardData[];
};

export const WalletSolContext = React.createContext<WalletSolContextType | null>(null);

type Props = {
  children: React.ReactNode;
  walletAddress?: string;
};
export const WalletProvider: React.FC<Props> = ({ children, walletAddress }) => {
  const [user, setUser] = useState<UserData | null>();
  const [postList, setPostList] = useState<PostCardData[]>([]);
  const [isInitBlog, setIsInitBlog] = useState<boolean | undefined>();

  const signUpUser = async (name: string) => {
    if (walletAddress) {
      const program = getProgram();
      const userAccount = getUserKey(walletAddress);
      const provider = getProvider();
      try {
        const tx = await program.rpc.signUpUser(name, {
          accounts: {
            authority: provider.wallet.publicKey,
            user: userAccount.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [userAccount],
        });
        const user = await getUser(program, walletAddress);
        user && setUser(user);
        setIsInitBlog(true);
        return tx;
      } catch (e) {
        notify({
          type: "error",
          message: "Error with sign up user",
        });
      }
    }
  };

  const createPost = async (title: string, userID: string) => {
    const { initBlogKey } = getKeys();
    if (initBlogKey?.publicKey && user) {
      const program = getProgram();
      const postAccount = Keypair.generate();
      const provider = getProvider();

      try {
        const tx = await program.rpc.createPost(title, {
          accounts: {
            post: postAccount.publicKey,
            blog: initBlogKey.publicKey,
            authority: provider.wallet.publicKey,
            user: new PublicKey(user.id),
            systemProgram: SystemProgram.programId,
          },
          signers: [postAccount],
        });

        const post = await getPostById(postAccount.publicKey, userID);
        post && setPostList((posts) => [post as unknown as PostCardData, ...posts]);
        return tx;
      } catch (e) {
        notify({
          type: "error",
          message: "Error with creating post",
        });
      }
    }
  };

  const fetchUser = useCallback(async (walletAddress: string) => {
    if (walletAddress) {
      const program = getProgram();
      const user = await getUser(program, walletAddress);
      user ? setUser(user) : setUser(null);
      return user;
    }
  }, []);

  const initBlog = async () => {
    const { genesisPostKey, initBlogKey } = getKeys();
    const program = getProgram();
    const provider = getProvider();

    if (initBlogKey && genesisPostKey) {
      try {
        const txid = await program.rpc.initBlog({
          accounts: {
            blog: initBlogKey.publicKey,
            firstPost: genesisPostKey.publicKey,
            authority: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [initBlogKey, genesisPostKey],
        });

        const blog = await program.account.blogState.fetch(initBlogKey.publicKey);
        if (blog) {
          const id = blog?.lastPostId.toString();
          const userId = user?.id;
          userId && (await fetchPosts(id, userId));
          setIsInitBlog(false);
          notify({
            type: "success",
            message: "Created init blog",
            txid,
          });
          return blog;
        }
      } catch (e) {
        console.log(e);
        notify({
          type: "error",
          message: "Error, please try later",
        });
      }
    }
  };

  const fetchPosts = async (id: string, user: string) => {
    const post = await getPostById(new PublicKey(id), user);
    if (post) {
      if (postList.length === 0 || !postList.some((item) => item.id === post.id)) {
        setPostList((posts) => [...posts, post as unknown as PostCardData]);
        if (post.prePostId !== "11111111111111111111111111111111") await fetchPosts(post.prePostId, user);
      }
    }
  };

  const fetchBlog = useCallback(async (blogAccount: { publicKey: PublicKey }, userId: string) => {
    const program = getProgram();

    try {
      const blog = await program.account.blogState.fetch(blogAccount.publicKey);
      const id = blog?.lastPostId;

      id && userId && (await fetchPosts(id, userId));
      return blog;
    } catch (err) {
      setIsInitBlog(true);
      notify({
        type: "error",
        message: "Please create initial blog",
      });
    }
  }, []);

  useEffect(() => {
    const onGetUser = async (walletAddress: string) => {
      try {
        const user = await fetchUser(walletAddress);
        if (user) {
          const { initBlogKey } = getKeys();
          let blog;
          if (initBlogKey) blog = await fetchBlog(initBlogKey, user.id);
          setIsInitBlog(!blog);
        }
      } catch (err) {
        notify({
          type: "error",
          message: "Error with get user",
        });
      }
    };
    walletAddress && onGetUser(walletAddress);
  }, [fetchUser, walletAddress]);

  return (
    <WalletSolContext.Provider value={{ user, isInitBlog, initBlog, signUpUser, createPost, postList }}>
      {children}
    </WalletSolContext.Provider>
  );
};
