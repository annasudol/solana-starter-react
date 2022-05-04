import React, { FormEvent, useRef } from "react";

import { Button } from "../button";

type Props = {
  onSubmit: (inputValue: string) => Promise<void>;
  placeholder?: string;
  btnTitle?: string;
  id?: string;
};

export const Form: React.FunctionComponent<Props> = ({ onSubmit, placeholder = "Post Title", btnTitle = "Send" }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current?.value) onSubmit(inputRef.current.value);
  };

  return (
    <form className="w-full flex mt-8" onSubmit={sendPost}>
      <input
        ref={inputRef}
        className="w-64 px-4 py-2 focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 rounded-md shadow-md mr-4"
        placeholder={placeholder}
      />
      <Button type="submit">{btnTitle}</Button>
    </form>
  );
};
