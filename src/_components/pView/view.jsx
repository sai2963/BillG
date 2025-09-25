import { useState, useEffect, useMemo } from "react";
import useFetchProducts from "../bill/useFetchProducts";

import ViewHeader from "./view-header";
import ViewSearch from "./view-search";

import ViewStats from "./view-stats";
import ViewPList from "./view-pList";
import ViewSummary from "./view-summary";
import ViewLoading from "./view-loading";
import ViewError from "./view-error";
import useSearchProducts from "../bill/useSearchProd";

const View = () => {
  const { state: apiProducts, loading, error } = useFetchProducts();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Combine API products and custom products
  useEffect(() => {
    if (apiProducts && products.length === 0) {
      setProducts(apiProducts);
    }
  }, [apiProducts]);

  // Filter products based on search term
  const searchedProducts = useSearchProducts(searchTerm);
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    } else {
      return searchedProducts;
    }
  }, [products, searchTerm, searchedProducts]);

  if (loading) {
    return (
      <>
        <ViewLoading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ViewError error={error} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <ViewHeader />

        {/* Search and Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Search Input */}

            <ViewSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* Stats */}
            <ViewStats
              products={products}
              searchTerm={searchTerm}
              filteredProducts={filteredProducts}
            />
          </div>
        </div>

        {/* Table Container */}

        <ViewPList
          filteredProducts={filteredProducts}
          setProducts={setProducts}
          searchTerm={searchTerm}
        />
        {/* Summary Footer */}
        <ViewSummary filteredProducts={filteredProducts} products={products} />
      </div>
    </div>
  );
};

export default View;
