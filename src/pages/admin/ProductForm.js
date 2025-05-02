import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiPlus, FiX, FiImage } from 'react-icons/fi';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [variants, setVariants] = useState([{ size: 'M', color: '#000000', stock: 10, price: 0 }]);
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    status: 'active',
    features: [''],
    specifications: [{ name: '', value: '' }]
  });

  // Lấy danh sách danh mục
  const categories = [
    'Áo thun', 'Quần jean', 'Váy', 'Áo khoác', 'Phụ kiện', 'Giày dép', 'Sale'
  ];

  useEffect(() => {
    if (isEditMode) {
      // Fetch product data for editing
      const fetchProductDetails = async () => {
        try {
          // Simulate API call with timeout
          setTimeout(() => {
            // Mock data for product details
            const productData = {
              id: parseInt(id),
              name: `Sản phẩm ${id}`,
              description: 'Mô tả chi tiết về sản phẩm. Đây là sản phẩm chất lượng cao, với nhiều tính năng và đặc điểm nổi bật.',
              price: 250000,
              originalPrice: 350000,
              category: 'Áo thun',
              status: 'active',
              features: [
                'Chất liệu cotton 100%',
                'Form rộng thoải mái',
                'Thiết kế hiện đại'
              ],
              specifications: [
                { name: 'Chất liệu', value: 'Cotton 100%' },
                { name: 'Xuất xứ', value: 'Việt Nam' },
                { name: 'Phù hợp', value: 'Nam & Nữ' }
              ],
              variants: [
                { size: 'M', color: '#000000', stock: 15, price: 250000 },
                { size: 'L', color: '#ffffff', stock: 10, price: 250000 },
                { size: 'XL', color: '#3498db', stock: 5, price: 270000 }
              ],
              images: [
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/150',
              ]
            };
            
            setProduct({
              ...productData,
              price: productData.price.toString(),
              originalPrice: productData.originalPrice.toString()
            });
            
            setVariants(productData.variants);
            setImagePreview(productData.images);
            setLoading(false);
          }, 800);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setLoading(false);
        }
      };
      
      fetchProductDetails();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...product.features];
    updatedFeatures[index] = value;
    setProduct(prev => ({ ...prev, features: updatedFeatures }));
  };

  const addFeature = () => {
    setProduct(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...product.features];
    updatedFeatures.splice(index, 1);
    setProduct(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
    setProduct(prev => ({ ...prev, specifications: updatedSpecs }));
  };

  const addSpecification = () => {
    setProduct(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const removeSpecification = (index) => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs.splice(index, 1);
    setProduct(prev => ({ ...prev, specifications: updatedSpecs }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages([...images, ...filesArray]);
      
      // Create previews
      const newImagePreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreview([...imagePreview, ...newImagePreviews]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreview];
    
    // If it's a new image, revoke the object URL to prevent memory leaks
    if (index < images.length) {
      URL.revokeObjectURL(updatedPreviews[index]);
      updatedImages.splice(index, 1);
    }
    
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setImagePreview(updatedPreviews);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: 'M', color: '#000000', stock: 10, price: 0 }]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Prepare form data for API
      const formData = new FormData();
      
      // Add product basic info
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('originalPrice', product.originalPrice || '');
      formData.append('category', product.category);
      formData.append('status', product.status);
      
      // Add features
      product.features.forEach((feature, index) => {
        if (feature.trim()) {
          formData.append(`features[${index}]`, feature);
        }
      });
      
      // Add specifications
      product.specifications.forEach((spec, index) => {
        if (spec.name.trim() && spec.value.trim()) {
          formData.append(`specifications[${index}][name]`, spec.name);
          formData.append(`specifications[${index}][value]`, spec.value);
        }
      });
      
      // Add variants
      variants.forEach((variant, index) => {
        formData.append(`variants[${index}][size]`, variant.size);
        formData.append(`variants[${index}][color]`, variant.color);
        formData.append(`variants[${index}][stock]`, variant.stock);
        formData.append(`variants[${index}][price]`, variant.price);
      });
      
      // Add images
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      
      // In a real app, you would make an API call here
      console.log('Form submitted with data:', {
        ...product,
        price: parseFloat(product.price),
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
        variants,
        imageCount: images.length,
        existingImageCount: imagePreview.length - images.length
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to product list on success
      alert(`Sản phẩm đã được ${isEditMode ? 'cập nhật' : 'thêm'} thành công!`);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Đã xảy ra lỗi khi lưu sản phẩm. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h1>
        <div className="mt-3 sm:mt-0">
          <Link
            to="/admin/products"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <FiArrowLeft className="mr-2" />
            Quay lại
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Thông tin cơ bản</h2>
          <p className="mt-1 text-sm text-gray-500">
            Thông tin cơ bản về sản phẩm.
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {/* Tên sản phẩm */}
          <div className="sm:col-span-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={product.name}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Nhập tên sản phẩm"
              />
            </div>
          </div>

          {/* Giá sản phẩm */}
          <div className="sm:col-span-3">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Giá bán <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                name="price"
                id="price"
                required
                min="0"
                value={product.price}
                onChange={handleChange}
                className="focus:ring-primary focus:border-primary block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">VNĐ</span>
              </div>
            </div>
          </div>

          {/* Giá gốc */}
          <div className="sm:col-span-3">
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
              Giá gốc
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                name="originalPrice"
                id="originalPrice"
                min="0"
                value={product.originalPrice}
                onChange={handleChange}
                className="focus:ring-primary focus:border-primary block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">VNĐ</span>
              </div>
            </div>
          </div>

          {/* Danh mục */}
          <div className="sm:col-span-3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <select
                id="category"
                name="category"
                required
                value={product.category}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Trạng thái */}
          <div className="sm:col-span-3">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <div className="mt-1">
              <select
                id="status"
                name="status"
                value={product.status}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="active">Đang bán</option>
                <option value="inactive">Ngừng bán</option>
              </select>
            </div>
          </div>

          {/* Mô tả */}
          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Mô tả sản phẩm <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                value={product.description}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Nhập mô tả chi tiết về sản phẩm"
              />
            </div>
          </div>
        </div>

        {/* Đặc điểm nổi bật */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Đặc điểm nổi bật</h2>
          <p className="mt-1 mb-4 text-sm text-gray-500">
            Liệt kê các đặc điểm nổi bật của sản phẩm.
          </p>
          
          <div className="space-y-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={`Đặc điểm ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700"
                  disabled={product.features.length === 1}
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addFeature}
            className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <FiPlus className="mr-2" />
            Thêm đặc điểm
          </button>
        </div>

        {/* Thông số kỹ thuật */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Thông số kỹ thuật</h2>
          <p className="mt-1 mb-4 text-sm text-gray-500">
            Thông tin chi tiết về đặc tính kỹ thuật của sản phẩm.
          </p>
          
          <div className="space-y-2">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Tên thông số"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Giá trị"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="p-1 text-red-500 hover:text-red-700"
                  disabled={product.specifications.length === 1}
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addSpecification}
            className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <FiPlus className="mr-2" />
            Thêm thông số
          </button>
        </div>

        {/* Biến thể sản phẩm */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Biến thể sản phẩm</h2>
          <p className="mt-1 mb-4 text-sm text-gray-500">
            Thêm các biến thể về kích thước, màu sắc và số lượng tồn kho.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kích thước</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Màu sắc</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá (nếu khác)</th>
                  <th scope="col" className="relative px-3 py-3">
                    <span className="sr-only">Hành động</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {variants.map((variant, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <select
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <input
                        type="color"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        className="w-full h-8 p-0 border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, 'stock', parseInt(e.target.value))}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={variant.price || ''}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value === '' ? 0 : parseInt(e.target.value))}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Giá mặc định"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={variants.length === 1}
                      >
                        <FiX size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            type="button"
            onClick={addVariant}
            className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <FiPlus className="mr-2" />
            Thêm biến thể
          </button>
        </div>

        {/* Hình ảnh sản phẩm */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Hình ảnh sản phẩm</h2>
          <p className="mt-1 mb-4 text-sm text-gray-500">
            Thêm hình ảnh để hiển thị sản phẩm trên trang web.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-3">
            {imagePreview.map((src, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                  <img src={src} alt={`Preview ${index + 1}`} className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-70 group-hover:opacity-100"
                >
                  <FiX className="text-red-600" />
                </button>
              </div>
            ))}
            
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
              <label className="cursor-pointer flex flex-col items-center justify-center p-4">
                <FiImage className="h-8 w-8 text-gray-400" />
                <span className="mt-1 text-xs text-gray-500">Thêm ảnh</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Form actions */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end">
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none mr-3"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none ${
              submitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <FiSave className="mr-2" />
            {submitting ? 'Đang lưu...' : (isEditMode ? 'Cập nhật' : 'Lưu sản phẩm')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;