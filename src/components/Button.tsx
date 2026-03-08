type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}