import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
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
        category: 'Custom Product',
        brand: 'Custom',
        description: `Custom product: ${formData.name.trim()}`,
        thumbnail: 'https://via.placeholder.com/150',
        images: ['https://via.placeholder.com/150'],
        rating: 0,
        stock: parseInt(formData.quantity),
        tags: ['custom'],
        warrantyInformation: 'No warranty',
        shippingInformation: 'Standard shipping',
        availabilityStatus: 'In Stock',
        reviews: [],
        returnPolicy: 'No returns',
        minimumOrderQuantity: 1
      };

      // // Get existing custom products from localStorage
      // const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      
      // // Add new product
      // const updatedProducts = [...existingProducts, newProduct];
      // localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
      axios.post('https://bill-g-bd.vercel.app/api/products',newProduct);
      // Show success message
      alert(`Product "${newProduct.title}" added successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        quantity: ''
      });

      // Optional: Navigate to products view or stay on form
      // navigate('/products/view');
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Add New Product
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
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

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              step="0.01"
              min="0"
              className={`w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:bg-gray-900 dark:text-gray-200 ${
                errors.price 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              disabled={loading}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="1"
              className={`w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none dark:bg-gray-900 dark:text-gray-200 ${
                errors.quantity 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 bg-gray-50 text-gray-800 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              disabled={loading}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          * Required fields. Product will be available for billing immediately.
        </p>
      </form>
    </div>
  );
};

export default Form;