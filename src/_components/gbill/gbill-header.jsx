const BillHeader = ({ billData }) => {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            INVOICE
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bill ID: #{billData.id}
          </p>
        </div>
        <div className="text-right text-sm text-gray-600 dark:text-gray-400">
          <p>
            Date:{" "}
            {new Date(billData.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

          <p>
            Time:{" "}
            {new Date(billData.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>
      </div>
    </>
  );
};
export default BillHeader;
