import useFetchProducts from "./useFetchProducts";

const useSearchProducts = (target) => {
  const { state: products } = useFetchProducts();
  if (!target || target.trim() === "") {
    return [];
  }

  if (!products || products.length === 0) {
    return [];
  }

  return products.filter((product) =>
        product.title.toLowerCase().includes(target.toLowerCase()) ||
        product.category?.toLowerCase().includes(target.toLowerCase()) ||
        product.brand?.toLowerCase().includes(target.toLowerCase())
  );
};

export default useSearchProducts;
