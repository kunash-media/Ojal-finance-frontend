export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`bg-emerald-700 hover:bg-teal-900 text-white px-4 py-2 rounded-xl shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
