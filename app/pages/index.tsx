/* eslint-disable no-console */
import { Button, Footer, Form, Header, NotificationList } from "@components";
import { appConfig } from "@config";
import { useBlog, useWallet } from "@hooks";
import { Meta } from "@layout";
import { notify } from "@utils/notify";

const Home = () => {
  const { walletAddress } = useWallet();
  const { isInitBlog, initBlog, createPost } = useBlog(walletAddress);

  const onCreatePost = async (title: string) => {
    try {
      const tx = await createPost({ title });
      tx &&
        notify({
          type: "success",
          message: "Signed up user successfully",
          txid: tx as string,
        });
    } catch (e) {
      notify({
        type: "error",
        message: "please try later",
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto sm:px-6 flex flex-col items-center justify-center">
      <Meta description={appConfig.description} title={appConfig.title} />
      <Header />
      <main>
        {isInitBlog && <Button onClick={() => initBlog(walletAddress)}>initBlog</Button>}
        {!!isInitBlog && <Form onSubmit={onCreatePost} />}
      </main>
      <Footer />
      <NotificationList />
    </div>
  );
};
export default Home;
{
  /* <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
<div className="flex justify-center pt-8">
  <div>
    <div className="flex flex-col items-center">
      {!walletAddress ? (
        <ConnectWallet onClick={connectWallet} />
      ) : (
        <>
          <h3 className="font-bold text-gray-600 capitalize">
            Connected: @{truncateAddress(walletAddress.toString())}
          </h3>
          {user === undefined && (
            <svg className="animate-spin h-12 w-12 text-white mr-1" viewBox="0 0 24 24">
              <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" fill="#1d4ed8" />
            </svg>
          )}
          {user === null && <Form btnTitle="Sign up" placeholder="User Name" onSubmit={onSignUpUser} />}
          {user && <p className="font-bold">Logged in as {user?.name}</p>}
          {/* )} */
}

{
  /* ) : (
            <Form btnTitle="Sign up" placeholder="User Name" onSubmit={onSignUpUser} />
            <p className="font-bold">Logged in as {user?.name}</p>
          )} */
}

{
  /* {isInitBlog ? (
            <Button onClick={() => initBlog(walletAddress)}>initBlog</Button>
          ) : (
            <PostForm onSubmit={onCreatePost} />
          )} */
}
//           <NotificationList />
//         </>
//       )}
//     </div>
//     {postList?.map(({ id, title, user, prepostId }) => (
//       <PostCard key={id} id={id} prepostId={prepostId} title={title} user={user} />
//     ))}
//   </div>
// </div>
// </main> */}
