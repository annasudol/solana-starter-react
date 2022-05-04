import { PostCardData } from "@types";
import { truncateAddress } from "@utils";
import { FC } from "react";

export const PostCard: FC<PostCardData> = ({ title, user }) => {
  return (
    <div className="glass rounded-lg py-4 px-6 bg-white shadow flex flex-col mt-4">
      <h3 className="font-bold text-lg text-gray-600">{title}</h3>
      <div className="my-1">
        <span className="font-medium text-gray-600">by @{truncateAddress(user)}</span>
      </div>
    </div>
  );
};
