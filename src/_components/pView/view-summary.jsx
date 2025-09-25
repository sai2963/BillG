const ViewSummary = ({filteredProducts ,products})=>{
    return(
        <>
        {filteredProducts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {filteredProducts.length} of {products.length} products
              </span>
              <span>
                Total inventory value: ₹
                {filteredProducts
                  .reduce(
                    (sum, product) =>
                      sum +
                      product.price * (product.stock || product.quantity || 0),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        )}
        </>
    )
}
export default ViewSummary;