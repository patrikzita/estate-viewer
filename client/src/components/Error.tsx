const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-red-500">Oh no!</h2>
      <p className="text-gray-700 mb-4">
        We encountered an error while fetching apartments.
      </p>
      <img src="error_icon.png" alt="error icon" className="mb-4" />
      <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Try Again
      </button>
    </div>
  );
};
export default Error;
