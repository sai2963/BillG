import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductName from "./add-product-name";
import ProductPrice from "./add-product-price";
import ProductQuantity from "./add-product-quantity";
import FormButtons from "./add-form-buttons";
import Footer from "./add-footer";
import Header from "./add-header";
import ProductCategory from "./add-product-category";
import ProductBrand from "./add-product-brand";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    category: "",
  });
  const { name, price, quantity, brand, category } = formData;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const newProduct = {
        id: Date.now(),
        title: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category: category.trim(),
        brand: brand.trim(),
        description: `Custom product: ${formData.name.trim()}`,
        thumbnail: "https://via.placeholder.com/150",
        images: ["https://via.placeholder.com/150"],
        rating: 0,
        stock: parseInt(formData.quantity),
        tags: ["custom"],
        warrantyInformation: "No warranty",
        shippingInformation: "Standard shipping",
        availabilityStatus: "In Stock",
        reviews: [],
        returnPolicy: "No returns",
        minimumOrderQuantity: 1,
      };

      axios.post(`${import.meta.env.VITE_API}/api/products`, newProduct);

      alert(`Product "${newProduct.title}" added successfully!`);

      setFormData({
        name: "",
        price: "",
        quantity: "",
        brand: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg"
      >
        
        <Header />

       
        <div className="space-y-4">
         

          <ProductName
            handleChange={handleChange}
            name={name}
            loading={loading}
            errors={errors}
          />
          {/* Price */}

          <ProductPrice
            handleChange={handleChange}
            price={price}
            loading={loading}
            errors={errors}
          />
          {/* Quantity */}

          <ProductQuantity
            handleChange={handleChange}
            quantity={quantity}
            loading={loading}
            errors={errors}
          />
          <ProductCategory
            handleChange={handleChange}
            category={category}
            loading={loading}
            errors={errors}
          />
          <ProductBrand
            handleChange={handleChange}
            brand={brand}
            loading={loading}
            errors={errors}
          />
        </div>

        
        <FormButtons loading={loading} />

        
        <Footer />
      </form>
    </div>
  );
};

export default Form;
