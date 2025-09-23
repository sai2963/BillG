const BillHeader = ({billData}) => {
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
          <p>Date: {billData.date}</p>
          <p>Time: {billData.time}</p>
        </div>
      </div>
    </>
  );
};
export default BillHeader;
