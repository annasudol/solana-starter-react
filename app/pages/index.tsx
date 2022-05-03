/* eslint-disable no-console */
import { Button, ConnectWallet, Footer, NotificationList, PostCard, PostForm } from "@components";
import { appConfig } from "@config";
import { useBlog, useWallet } from "@hooks";
import { Meta } from "@layout";
import { notify } from "@utils/notify";
import { truncateAddress } from "@utils/truncateAddress";
import { useCallback } from "react";

const Home = () => {
  const { walletAddress, connectWallet } = useWallet();
  const { isInitBlog, initBlog, createPost, postList, user } = useBlog(walletAddress);

  const onCreatePost = useCallback(
    async (title: string) => {
      try {
        const tx = await createPost({ title });
        tx &&
          notify({
            type: "success",
            message: "Added post successfully",
            txid: tx as string,
          });
      } catch (e) {
        notify({
          type: "error",
          message: "please try later",
        });
      }
    },
    [createPost]
  );
  return (
    <>
      <Meta description={appConfig.description} title={appConfig.title} />
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center pt-8">
          <div>
            <div className="flex flex-col items-center">
              {user && <p className="font-bold">User:{user?.name}</p>}
              {!walletAddress ? (
                <ConnectWallet onClick={connectWallet} />
              ) : (
                <>
                  <h3 className="font-bold text-gray-600 capitalize">
                    Connected: @{truncateAddress(walletAddress.toString())}
                  </h3>

                  {isInitBlog ? (
                    <Button onClick={() => initBlog(walletAddress)}>initBlog</Button>
                  ) : (
                    <PostForm onSubmit={onCreatePost} />
                  )}
                  <NotificationList />
                </>
              )}
            </div>
            {postList?.map(({ id, title, user, prepostId }) => (
              <PostCard key={id} id={id} prepostId={prepostId} title={title} user={user} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Home;
