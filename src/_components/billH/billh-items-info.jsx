const ItemsInfo = ({bill,formatMoney}) => {
  return (
    <>
      {bill.items && bill.items.length > 0 && (
        <div className="mb-3">
          <p className="font-semibold mb-2">Items:</p>
          <div className="bg-gray-50 p-2 rounded">
            {bill.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>
                  {item.product.title || item.productName} × {item.quantity}
                </span>
                <span>
                  {formatMoney(
                    (item.product.price || item.rate) * item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default ItemsInfo;