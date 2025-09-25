const ViewStats = ({products,searchTerm,filteredProducts})=>{
    return(
        <>
        <div className="flex gap-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  Total: {products.length}
                </span>
              </div>

              {searchTerm && (
                <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    Found: {filteredProducts.length}
                  </span>
                </div>
              )}
            </div>
        </>
    )
}
export default ViewStats;