/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
import { PostCard } from "@components";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { getKeys, getPostById, getProgram, getUser, getUserKey, notify } from "@utils";
import { useCallback, useEffect, useState } from "react";

export enum ACCOUNT_ERROR {
  NOT_CREATED = "NOT_CREATED",
}
interface UserData {
  name: string;
  id: string;
}

type UseBlogHook = (walletAddress?: PublicKey) => {
  user?: UserData;
  isInitBlog?: boolean;
  currentPostKey?: PublicKey;
  initBlog?: any;
  createPost?: any;
  postList?: any[];
  updatePost?: any;
  signUpUser?: any;
};
export const useBlog: UseBlogHook = (walletAddress) => {
  const [user, setUser] = useState<UserData>();
  const [postList, setPostList] = useState<PostCard[]>([]);
  const [isInitBlog, setIsInitBlog] = useState<boolean>();

  const signUpUser = useCallback(
    async (data: { name: string }) => {
      if (walletAddress) {
        const { name } = data;
        const program = getProgram();
        const userAccount = getUserKey(walletAddress);

        try {
          const tx = await program.rpc.signupUser(name, {
            accounts: {
              authority: walletAddress,
              userAccount: userAccount.publicKey,
              systemProgram: SystemProgram.programId,
            },
            signers: [userAccount],
          });
          const user = await getUser(program, walletAddress);
          user && setUser(user);
          return tx;
        } catch {}
      }
    },
    [walletAddress]
  );

  const fetchUser = useCallback(async (walletAddress: PublicKey) => {
    if (walletAddress) {
      const program = getProgram();
      const user = await getUser(program, walletAddress);
      user ? setUser(user) : setUser(null);
      return user;
    }
  }, []);

  const initBlog = async (walletKey: PublicKey) => {
    const { genesisPostKey, initBlogKey } = getKeys();
    const program = getProgram();
    if (initBlogKey && genesisPostKey) {
      try {
        const txid = await program.rpc.initBlog({
          accounts: {
            authority: walletKey,
            systemProgram: SystemProgram.programId,
            blogAccount: initBlogKey.publicKey,
            genesisPostAccount: genesisPostKey.publicKey,
          },
          signers: [initBlogKey, genesisPostKey],
        });

        const blog = await program.account.blogState.fetch(initBlogKey.publicKey);
        notify({
          type: "success",
          message: "Created initBlog",
          txid,
        });
        console.log("Blog pubkey: ", initBlogKey.publicKey.toString());
        console.log("Blog: ", blog);
        return blog;
      } catch (e) {
        console.log(e, "error");
      }
    }
  };
  interface PostData {
    title: string;
    content: string;
  }

  const createPost = useCallback(
    async (data: PostData) => {
      const { initBlogKey } = getKeys();

      if (user && walletAddress && initBlogKey?.publicKey) {
        const { title, content = "" } = data;
        const program = getProgram();
        const postAccount = Keypair.generate();

        const tx = await program.rpc.createPost(title, content, {
          accounts: {
            blogAccount: initBlogKey?.publicKey,
            authority: walletAddress,
            userAccount: new PublicKey(user.id),
            postAccount: postAccount.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [postAccount],
        });
        return tx;
      }
    },
    [user, walletAddress]
  );

  const fetchPosts = async (id: string, user: string) => {
    const post: any = await getPostById(new PublicKey(id), user);

    if (postList.length === 0 || !postList.some((item) => item.id === post.id)) {
      setPostList((posts) => [post, ...posts]);
      if (post.prePostId !== "11111111111111111111111111111111") await fetchPosts(post.prePostId, user);
    }
  };

  const fetchBlog = useCallback(async (blogAccount: any, user: string) => {
    const program = getProgram();

    try {
      const blog = await program.account.blogState.fetch(blogAccount.publicKey);
      if (blog?.currentPostKey) await fetchPosts(blog?.currentPostKey, user);
    } catch (err) {
      console.log("err", err);
      notify({
        type: "error",
        message: "Please create initial blog",
      });
      setIsInitBlog(true);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const updatePost = () => {};

  useEffect(() => {
    const onGetUser = async (walletAddress: PublicKey) => {
      try {
        await fetchUser(walletAddress);
      } catch (err) {
        console.log(err, "err");
        notify({
          type: "error",
          message: "Error with fetch blog",
        });
      }
    };
    walletAddress && onGetUser(walletAddress);
  }, [fetchUser, walletAddress]);

  return {
    user,
    isInitBlog,
    initBlog,
    createPost,
    postList,
    updatePost,
    signUpUser,
  };
};
