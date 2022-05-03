import { truncateAddress } from "@utils";
import { FC } from "react";

export interface PostCard {
  id: string;
  title: string;
  user: string;
  prepostId: string;
}

export const PostCard: FC<PostCard> = ({ title, user }) => {
  return (
    <div className="glass rounded-lg py-4 px-6 bg-white shadow flex flex-col mt-4">
      <h3 className="font-bold text-lg text-gray-600">{title}</h3>
      <div className="mx-3">
        <h3 className="font-bold text-gray-600 capitalize">@{truncateAddress(user)}</h3>
      </div>
    </div>
  );
};
