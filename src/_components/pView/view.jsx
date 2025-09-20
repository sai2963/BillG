import { useState, useEffect, useMemo } from 'react';
import useFetchProducts from '../bill/useFetchProducts';

const View = () => {
  const { state: apiProducts, loading, error } = useFetchProducts();
  const [customProducts, setCustomProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load custom products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    setCustomProducts(storedProducts);
  }, []);

  // Combine API products and custom products
  const allProducts = useMemo(() => {
    const combined = [...(apiProducts || []), ...customProducts];
    return combined.map((product, index) => ({
      ...product,
      displayIndex: index + 1
    }));
  }, [apiProducts, customProducts]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return allProducts;
    }
    
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteCustomProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedCustomProducts = customProducts.filter(product => product.id !== productId);
      setCustomProducts(updatedCustomProducts);
      localStorage.setItem('customProducts', JSON.stringify(updatedCustomProducts));
    }
  };

  const isCustomProduct = (product) => {
    return customProducts.some(cp => cp.id === product.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-4">Error loading products: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Product Inventory
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view all available products
          </p>
        </div>

        {/* Search and Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Search Input */}
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search products, categories, brands..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full sm:w-80 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
              />
            </div>
            
            {/* Stats */}
            <div className="flex gap-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  Total: {allProducts.length}
                </span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Custom: {customProducts.length}
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
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-md">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100 text-left text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 font-medium">SNO</th>
                <th className="px-6 py-3 font-medium">Product Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b dark:border-gray-700 ${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  >
                    <td className="px-6 py-3 font-medium">{index + 1}</td>
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {product.title}
                      </div>
                      {product.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        {product.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {product.brand || 'No Brand'}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (product.stock || 0) > 10 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          : (product.stock || 0) > 0 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                      }`}>
                        {product.stock || product.quantity || 0}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-semibold">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      {isCustomProduct(product) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                          Custom
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          API
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-xs"
                          title="View details"
                        >
                          View
                        </button>
                        {isCustomProduct(product) && (
                          <button
                            onClick={() => handleDeleteCustomProduct(product.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium text-xs"
                            title="Delete custom product"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      {searchTerm ? (
                        <>
                          <p className="text-lg font-medium mb-2">No products found</p>
                          <p>Try adjusting your search terms</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium mb-2">No products available</p>
                          <p>Add some products to get started</p>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        {filteredProducts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {filteredProducts.length} of {allProducts.length} products
              </span>
              <span>
                Total inventory value: ₹{filteredProducts.reduce((sum, product) => 
                  sum + (product.price * (product.stock || product.quantity || 0)), 0
                ).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;