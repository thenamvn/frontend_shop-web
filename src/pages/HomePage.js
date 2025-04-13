import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { FiGrid, FiList } from 'react-icons/fi';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  // Mock product data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Áo thun unisex form rộng',
          price: 150000,
          originalPrice: 250000,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.8,
          sold: 1200
        },
        {
          id: 2,
          name: 'Quần jean nam ống rộng',
          price: 450000,
          originalPrice: null,
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.5,
          sold: 850
        },
        {
          id: 3,
          name: 'Đầm xòe cổ V nữ tính',
          price: 350000,
          originalPrice: 500000,
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.9,
          sold: 1500
        },
        {
          id: 4,
          name: 'Áo sơ mi nam tay dài',
          price: 280000,
          originalPrice: 350000,
          image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.6,
          sold: 920
        },
        {
          id: 5,
          name: 'Váy len dáng suông',
          price: 420000,
          originalPrice: null,
          image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.7,
          sold: 750
        },
        {
          id: 6,
          name: 'Áo khoác denim unisex',
          price: 550000,
          originalPrice: 750000,
          image: 'https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.8,
          sold: 650
        },
        {
          id: 7,
          name: 'Quần short khaki nam',
          price: 220000,
          originalPrice: 280000,
          image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.5,
          sold: 920
        },
        {
          id: 8,
          name: 'Áo thun nữ cổ tròn',
          price: 180000,
          originalPrice: null,
          image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          rating: 4.7,
          sold: 1100
        }
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);
  
  const handleFilterChange = (filters, sortOption) => {
    console.log('Filters:', filters);
    console.log('Sort option:', sortOption);
    
    // Here you would fetch filtered products from API
    // For now, we'll just simulate with a delay
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  
  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm mới nhất</h2>
        
        <ProductFilters onFilterChange={handleFilterChange} />
        
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Hiển thị:</span>
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid size={18} />
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              onClick={() => setViewMode('list')}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-4'}`}>
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Featured categories section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Danh mục nổi bật</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Áo thun', 'Quần jean', 'Váy đầm', 'Đồ thể thao', 'Áo khoác', 'Phụ kiện'].map((category, index) => (
            <div 
              key={index}
              className="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center transition hover:shadow-md"
            >
              <div className="w-12 h-12 mb-3 bg-white rounded-full flex items-center justify-center">
                <img 
                  src={`https://via.placeholder.com/40?text=${index + 1}`}
                  alt={category}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-sm font-medium">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;