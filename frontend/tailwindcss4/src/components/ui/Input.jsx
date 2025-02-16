import { forwardRef } from "react";

const Input = forwardRef(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  );
});

Input.displayName = "Input";

export default Input;
