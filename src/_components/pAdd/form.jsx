import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductName from "./productName";
import ProductPrice from "./productPrice";
import ProductQuantity from "./productQuantity";
import FormButtons from "./formButtons";
import Footer from "./footer";
import Header from "./header";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const { name, price, quantity } = formData;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
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
      // Create product object
      const newProduct = {
        id: Date.now(), // Simple ID generation
        title: formData.name.trim(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        category: "Custom Product",
        brand: "Custom",
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

      // // Get existing custom products from localStorage
      // const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

      // // Add new product
      // const updatedProducts = [...existingProducts, newProduct];
      // localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
      axios.post("https://bill-g-bd.vercel.app/api/products", newProduct);
      // Show success message
      alert(`Product "${newProduct.title}" added successfully!`);

      // Reset form
      setFormData({
        name: "",
        price: "",
        quantity: "",
      });

      // Optional: Navigate to products view or stay on form
      // navigate('/products/view');
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
        {/* Title */}
        <Header/>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Product Name */}

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
        </div>

        {/* Buttons */}
        <FormButtons loading={loading}/>

        {/* Info Text */}
        <Footer/>
      </form>
    </div>
  );
};

export default Form;
