import { ButtonHTMLAttributes, FC, ReactElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactElement;
}

export const Button: FC<ButtonProps> = ({ children, loading = false, disabled, leftIcon, ...props }) => {
  disabled = disabled || loading;

  return (
    <button
      className={`inline-flex items-center px-6 py-2 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-blue-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "transform hover:-translate-y-px focus:shadow-sm focus:-translate-y-0"
      }
			`}
      disabled={disabled}
      {...props}
    >
      {!disabled && !loading && leftIcon}
      {disabled && !loading && (
        <svg
          className="h-5 w-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      )}
      {loading && (
        <svg className="animate-spin h-5 w-5 text-white mr-1" viewBox="0 0 24 24">
          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" fill="currentColor" />
        </svg>
      )}
      {children}
    </button>
  );
};
