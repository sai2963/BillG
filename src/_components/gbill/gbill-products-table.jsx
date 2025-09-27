const ProductsTable = ({billData})=>{
    return(
        <>
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-md print:shadow-none">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 text-left text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Unit Price</th>
                <th className="px-6 py-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {billData.items.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{product.product.title}</td>
                  <td className="px-6 py-3">{product.quantity}</td>
                  <td className="px-6 py-3">₹{product.product.price.toFixed(2)}</td>
                  <td className="px-6 py-3">
                    ₹{(product.product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
    )
}
export default ProductsTable;