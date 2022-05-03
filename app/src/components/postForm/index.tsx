import React, { FormEvent, useRef } from "react";

import { Button } from "../button";

type Props = {
  onSubmit: (inputValue: string) => Promise<void>;
};

export const PostForm: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) onSubmit(inputRef.current.value);
  };

  return (
    <form className="my-12 sm:flex sm:items-center" onSubmit={sendPost}>
      <div className="w-full sm:max-w-xs">
        <label className="sr-only" htmlFor="link">
          Post Title
        </label>
        <input
          ref={inputRef}
          className="w-64 px-4 py-2 focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 rounded-md shadow-md mr-4"
          id="link"
          name="link"
          placeholder="Add title"
        />
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
};
