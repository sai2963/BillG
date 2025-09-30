const BillHeader = ({ bill, formatMoney }) => {
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-semibold">{bill.billNumber}</h3>
          <p className="text-sm text-gray-500">{formatTime(bill.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{formatMoney(bill.finalAmount)}</p>
        </div>
      </div>
    </>
  );
};
export default BillHeader;
