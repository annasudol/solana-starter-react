import { Form, PostCard } from "@components";
import { notify } from "@utils";
import * as React from "react";
import { WalletSolContext, WalletSolContextType } from "src/context";

export const Main = () => {
  const { user, isInitBlog, postList, createPost } = React.useContext(WalletSolContext) as WalletSolContextType;
  const onCreatePost = async (title: string) => {
    try {
      const userID = user?.id;
      if (userID) {
        const tx = await createPost(title, userID);
        tx &&
          notify({
            type: "success",
            message: "Signed up user successfully",
            txid: tx as string,
          });
      }
    } catch (e) {
      notify({
        type: "error",
        message: "please try later",
      });
    }
  };
  return (
    <main>
      {isInitBlog === false && <Form onSubmit={onCreatePost} />}
      {postList?.map(({ id, title, user, prepostId }) => (
        <PostCard key={id} id={id} prepostId={prepostId} title={title} user={user} />
      ))}
    </main>
  );
};
