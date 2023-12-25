import { useContext, useEffect, useState } from "react";
import { IoSearch, IoFilter, IoCart } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { CartContext } from "../../providers/CartProvider";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addCartProduct, cartProductsLength } = useContext(CartContext);

  const fetchProducts = () => {
    setProductsLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setProductsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setProductsLoading(false);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchText.value;
    fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setProductsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setProductsLoading(false);
      });
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const minPrice = parseFloat(e.target.minPrice.value);
    const maxPrice = parseFloat(e.target.maxPrice.value);
    if (isNaN(minPrice) || isNaN(maxPrice)) return;
    const result = products.filter(
      (product) =>
        parseFloat(product.price) <= maxPrice &&
        parseFloat(product.price) >= minPrice
    );
    setProducts(result);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    fetchProducts();
    setIsFilterOpen(false);
  };
  return (
    <div className="p-5">
      <div className="flex justify-center gap-3 relative">
        <form
          className="flex gap-3 items-center justify-center mb-5"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search by name"
            className="input input-bordered w-full max-w-xs rounded-full"
            name="searchText"
            required
          />
          <button className="btn btn-circle" type="submit">
            <IoSearch size={20} />
          </button>
        </form>
        <button
          className="btn btn-circle"
          onClick={() => setIsFilterOpen(true)}
        >
          <IoFilter size={20} />
        </button>

        <Link className="indicator" to="/cart">
          <span className="indicator-item badge badge-secondary">{cartProductsLength()}</span>
          <button className="btn btn-circle">
            <IoCart size={20} />
          </button>
        </Link>
        {isFilterOpen && (
          <div className="border shadow-md rounded-md p-5 absolute top-0 bg-white z-10">
            <form
              className="flex flex-col gap-3 items-center justify-center"
              onSubmit={handleFilterSubmit}
            >
              <h3 className="font-semibold">Filters</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Min Price Value"
                  className="input input-bordered w-full max-w-xs rounded-full"
                  name="minPrice"
                  required
                />
                <input
                  type="text"
                  placeholder="Max Price Value"
                  className="input input-bordered w-full max-w-xs rounded-full"
                  name="maxPrice"
                  required
                />
              </div>
              <button className="btn btn-circle w-full" type="submit">
                Apply Filters
              </button>
              <button
                className="btn btn-circle btn-error w-full"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
              <button
                className="absolute top-2 right-2"
                onClick={() => setIsFilterOpen(false)}
              >
                <RxCross2 size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
      {/* Products */}
      {productsLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div>
          {products.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((product) => (
                <div className="card bg-base-100 shadow-xl" key={product.id}>
                  <figure>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-[200px] object-cover"
                    />
                  </figure>
                  <div className="card-body p-5">
                    <h2 className="card-title">{product.title}</h2>
                    <p className="font-bold text-xl">${product.price}</p>
                    <div className="badge badge-secondary">
                      {product.discountPercentage}% OFF
                    </div>
                    <p>Brand : {product.brand}</p>
                    <p>Rating : {product.rating}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          addCartProduct(product.id, 1);
                          toast.success(" Product added to cart!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No Products Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
