import { Button, ConnectWallet, Form } from "@components";
import { PublicKey } from "@solana/web3.js";
import { notify, truncateAddress } from "@utils";
import * as React from "react";
import { WalletSolContext, WalletSolContextType } from "src/context";
interface Props {
  walletAddress?: PublicKey;
  connectWallet: () => Promise<void>;
}
export const Header: React.FunctionComponent<Props> = ({ walletAddress, connectWallet }) => {
  const { user, isInitBlog, initBlog, signUpUser } = React.useContext(WalletSolContext) as WalletSolContextType;
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
        <>
          <h3 className="font-bold text-gray-600 capitalize">
            Connected: @{truncateAddress(walletAddress.toString())}
          </h3>
          {user === undefined && (
            <div className="mt-16">
              <svg className="animate-spin h-12 w-12 text-white mr-1" viewBox="0 0 24 24">
                <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" fill="#1d4ed8" />
              </svg>
            </div>
          )}
          {user === null && <Form btnTitle="Sign up" placeholder="User Name" onSubmit={onSignUpUser} />}
          {user && <p className="font-bold">Logged in as {user?.name}</p>}
          {isInitBlog && <Button onClick={() => initBlog(walletAddress)}>initBlog</Button>}
        </>
      )}
    </header>
  );
};
