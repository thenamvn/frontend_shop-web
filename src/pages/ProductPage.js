import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiHeart, FiShare2, FiMinus, FiPlus, FiTruck } from 'react-icons/fi';
import AddToCartButton from '../components/AddToCartButton';
import ProductReviews from '../components/ProductReviews';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const mockProduct = {
                id: parseInt(id),
                name: 'Áo thun unisex form rộng phong cách Hàn Quốc',
                price: 150000,
                originalPrice: 250000,
                discount: 40,
                rating: 4.8,
                reviewCount: 120,
                sold: 1200,
                description: 'Áo thun unisex form rộng phong cách Hàn Quốc với chất liệu cotton 100%, mềm mại, thoáng mát. Áo có thiết kế đơn giản nhưng không kém phần thời trang, dễ dàng mix đồ với nhiều phong cách khác nhau.',
                images: [
                    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: [
                    { name: 'Trắng', value: '#ffffff', border: true },
                    { name: 'Đen', value: '#000000' },
                    { name: 'Xám', value: '#888888' },
                    { name: 'Xanh', value: '#3498db' },
                ],
                specs: [
                    { name: 'Chất liệu', value: 'Cotton 100%' },
                    { name: 'Kiểu dáng', value: 'Form rộng' },
                    { name: 'Xuất xứ', value: 'Việt Nam' },
                    { name: 'Phù hợp', value: 'Nam & Nữ' },
                ],
                stock: 50,
                estimatedDelivery: '3-5 ngày',
                relatedProducts: [
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
                        id: 4,
                        name: 'Áo sơ mi nam tay dài',
                        price: 280000,
                        originalPrice: 350000,
                        image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
                        rating: 4.6,
                        sold: 920
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
                ],
                reviews: [
                    {
                        username: 'Minh Nguyen',
                        date: '23/06/2023',
                        rating: 5,
                        content: 'Chất lượng sản phẩm tuyệt vời, đúng như mô tả. Vải mềm, mặc rất thoải mái. Size chuẩn, giao hàng nhanh. Sẽ ủng hộ shop dài dài.',
                        images: [
                            'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
                        ]
                    },
                    {
                        username: 'Linh Tran',
                        date: '15/05/2023',
                        rating: 4,
                        content: 'Áo đẹp, đường may chắc chắn, chất liệu tốt. Trừ 1 sao vì giao hàng hơi chậm.',
                        images: []
                    },
                    {
                        username: 'Hoang Le',
                        date: '02/04/2023',
                        rating: 5,
                        content: 'Quá ưng ý với sản phẩm này! Form áo đẹp, màu sắc chuẩn như hình, size vừa vặn. Sẽ quay lại mua thêm màu khác.',
                        images: [
                            'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
                            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
                        ]
                    },
                ]
            };

            setProduct(mockProduct);
            setMainImage(mockProduct.images[0]);
            setLoading(false);
        }, 800);
    }, [id]);

    const increaseQuantity = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Thêm hàm xử lý mua ngay
    const handleBuyNow = () => {
        if (!selectedSize || !selectedColor) {
            alert('Vui lòng chọn kích thước và màu sắc');
            return;
        }

        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images[0]
            },
            quantity,
            selectedSize,
            selectedColor
        );

        // Chuyển hướng đến trang giỏ hàng
        window.location.href = '/cart';
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-red-500">Sản phẩm không tồn tại!</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-6">
                <ul className="flex space-x-2 text-gray-500">
                    <li><Link to="/" className="hover:text-primary">Trang chủ</Link></li>
                    <li>/</li>
                    <li><Link to="/category/ao-thun" className="hover:text-primary">Áo thun</Link></li>
                    <li>/</li>
                    <li className="text-gray-800 font-medium">{product.name}</li>
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product images */}
                <div>
                    {/* Main image */}
                    <div className="mb-4 border border-gray-200 rounded-md overflow-hidden">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Thumbnail images */}
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`border rounded-md overflow-hidden cursor-pointer ${mainImage === image ? 'border-primary' : 'border-gray-200'}`}
                                onClick={() => setMainImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} - image ${index + 1}`}
                                    className="w-full h-24 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product details */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                    {/* Product rating */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                            <span className="text-lg font-semibold text-primary mr-1">{product.rating}</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <FiStar
                                        key={star}
                                        className={`${star <= Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        size={16}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-gray-500 mr-4">{product.reviewCount} đánh giá</span>
                        <span className="text-gray-500">{product.sold} đã bán</span>
                    </div>

                    {/* Product price */}
                    <div className="bg-gray-50 p-4 mb-6 rounded-md">
                        <div className="flex items-baseline">
                            <span className="text-3xl text-primary font-bold">{product.price.toLocaleString()}đ</span>
                            {product.originalPrice && (
                                <>
                                    <span className="ml-2 text-gray-400 line-through">{product.originalPrice.toLocaleString()}đ</span>
                                    <span className="ml-2 bg-primary text-white px-2 py-1 text-xs rounded-md">-{product.discount}%</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Size selection */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Kích thước</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`w-10 h-10 flex items-center justify-center border ${selectedSize === size ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:border-primary'} rounded`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color selection */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Màu sắc</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.colors.map((color, index) => (
                                <button
                                    key={index}
                                    className={`w-8 h-8 rounded-full ${selectedColor === color.name ? 'ring-2 ring-primary' : ''}`}
                                    style={{
                                        backgroundColor: color.value,
                                        border: color.border ? '1px solid #d1d5db' : 'none'
                                    }}
                                    onClick={() => setSelectedColor(color.name)}
                                    title={color.name}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">Số lượng</h3>
                        <div className="flex items-center">
                            <button
                                className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l hover:bg-gray-100"
                                onClick={decreaseQuantity}
                            >
                                <FiMinus />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val > 0 && val <= product.stock) {
                                        setQuantity(val);
                                    }
                                }}
                                className="w-14 h-8 border-t border-b border-gray-300 text-center"
                            />
                            <button
                                className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r hover:bg-gray-100"
                                onClick={increaseQuantity}
                            >
                                <FiPlus />
                            </button>
                            <span className="ml-4 text-gray-500">{product.stock} sản phẩm có sẵn</span>
                        </div>
                    </div>

                    {/* Add to cart and Buy now buttons */}
                    <div className="mb-6 flex space-x-4">
                        <AddToCartButton
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                originalPrice: product.originalPrice,
                                image: product.images[0]
                            }}
                            quantity={quantity}
                            size={selectedSize}
                            color={selectedColor}
                            className="flex-1"
                        />
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 transition"
                        >
                            Mua ngay
                        </button>
                    </div>

                    {/* Extra actions */}
                    <div className="flex space-x-6 text-gray-500 mb-8">
                        <button className="flex items-center hover:text-primary">
                            <FiHeart className="mr-1" />
                            <span>Yêu thích</span>
                        </button>
                        <button className="flex items-center hover:text-primary">
                            <FiShare2 className="mr-1" />
                            <span>Chia sẻ</span>
                        </button>
                    </div>

                    {/* Delivery info */}
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <div className="flex items-start">
                            <FiTruck className="mt-1 mr-3 text-primary" />
                            <div>
                                <h4 className="font-medium">Thời gian giao hàng</h4>
                                <p className="text-sm text-gray-600">
                                    Ước tính {product.estimatedDelivery} sau khi đặt hàng
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product specs */}
                    <div className="border-t pt-6">
                        <h3 className="font-medium mb-3">Thông số sản phẩm</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                {product.specs.map((spec, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                        <td className="py-2 px-3 font-medium">{spec.name}</td>
                                        <td className="py-2 px-3">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Product description */}
            <div className="mt-12 border-t pt-8">
                <h2 className="text-xl font-bold mb-4">Mô tả sản phẩm</h2>
                <div className="text-gray-700 space-y-4">
                    <p>{product.description}</p>
                    <p>
                        Đặc điểm nổi bật:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Chất liệu cotton 100%, mềm mại, thoáng mát</li>
                        <li>Form rộng thoải mái, phù hợp mọi vóc dáng</li>
                        <li>Thiết kế đơn giản, dễ phối đồ</li>
                        <li>Đường may tỉ mỉ, chắc chắn</li>
                        <li>Có nhiều size và màu sắc để lựa chọn</li>
                    </ul>
                    <p>
                        Hướng dẫn bảo quản:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Giặt máy ở nhiệt độ thấp hoặc giặt tay</li>
                        <li>Không dùng chất tẩy mạnh</li>
                        <li>Phơi trong bóng râm</li>
                        <li>Là ủi ở nhiệt độ thấp</li>
                    </ul>
                </div>
            </div>

            {/* Product reviews */}
            <ProductReviews reviews={product.reviews} />

            {/* Related products */}
            <div className="mt-12 border-t pt-8">
                <h2 className="text-xl font-bold mb-6">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.relatedProducts.map(relatedProduct => (
                        <ProductCard key={relatedProduct.id} product={relatedProduct} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;