const ProductBrand = ({handleChange , brand, loading ,errors})=>{
    return(
        <>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={handleChange}
              placeholder="Enter product brand"
              className={`w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:bg-gray-900 dark:text-gray-200 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        </>
    )
}
export default ProductBrand;