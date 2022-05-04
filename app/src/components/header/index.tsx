import { ConnectWallet, Form } from "@components";
import { useBlog, useWallet } from "@hooks";
import { notify } from "@utils/notify";
import { truncateAddress } from "@utils/truncateAddress";

export const Header = () => {
  const { walletAddress, connectWallet } = useWallet();
  const { user, signUpUser } = useBlog(walletAddress);

  const onSignUpUser = async (name: string) => {
    try {
      const tx = await signUpUser({ name });
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
    <header className="pt-8 flex flex-col items-center">
      {!walletAddress ? (
        <ConnectWallet onClick={connectWallet} />
      ) : (
        <h3 className="font-bold text-gray-600 capitalize">Connected: @{truncateAddress(walletAddress.toString())}</h3>
      )}
      {user === undefined && (
        <div className="mt-12">
          <svg className="animate-spin h-12 w-12 text-white mr-1" viewBox="0 0 24 24">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" fill="#1d4ed8" />
          </svg>
        </div>
      )}
      {user === null && <Form btnTitle="Sign up" placeholder="User Name" onSubmit={onSignUpUser} />}
      {user && <p className="font-bold">Logged in as {user?.name}</p>}
    </header>
  );
};
