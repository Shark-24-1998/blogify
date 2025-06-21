import  clsx  from "clsx";

export default function Toggle({ pressed, onPressedChange, children, className }) {
  return (
    <button
      type="button"
      onClick={onPressedChange}
      className={clsx(
        "p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition",
        pressed ? "bg-gray-200" : "bg-white",
        className
      )}
    >
      {children}
    </button>
  );
}
