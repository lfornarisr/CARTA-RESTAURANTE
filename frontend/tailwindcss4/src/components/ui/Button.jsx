function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={` bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
