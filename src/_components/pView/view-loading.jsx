const ViewLoading = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading products...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewLoading;