const FetchingModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-32 w-32 mb-4"></div>
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    </div>
  );
};

export default FetchingModal;
