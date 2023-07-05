import { buttonVariants } from "./ui/Button";

const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold text-red-500">Oh no!</h2>
      <p className="mb-4 text-gray-700">
        We encountered an error while fetching apartments.
      </p>
      <img src="error_icon.png" alt="error icon" className="mb-4" />
      <a href="/" className={buttonVariants({variant: "outline"})}>
        Try again
      </a>
    </div>
  );
};
export default Error;
