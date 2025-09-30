const BillhSummary = ({bill,formatMoney})=>{
    return(
        <>
        <div className="border-t pt-3 text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Subtotal:</span>
                      <span>{formatMoney(bill.totalAmount)}</span>
                    </div>
                    {bill.tax > 0 && (
                      <div className="flex justify-between mb-1">
                        <span>Tax:</span>
                        <span>{formatMoney(bill.tax)}</span>
                      </div>
                    )}
                    {bill.discountAmount > 0 && (
                      <div className="flex justify-between mb-1">
                        <span>Discount:</span>
                        <span className="text-green-600">
                          -{formatMoney(bill.discountAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold border-t pt-1">
                      <span>Total:</span>
                      <span>{formatMoney(bill.finalAmount)}</span>
                    </div>
                  </div>
        </>
    )
}
export default BillhSummary;