import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const Cart = () => {
  const {
    cartProducts,
    addCartProduct,
    removeCartProduct,
    cartProductsLength,
  } = useContext(CartContext);
  const subtotal = cartProducts.reduce(
    (prev, current) => prev + current.count * current.price,
    0
  );
  return (
    <div className="p-5 my-10 container mx-auto">
      <div className="flex justify-between items-center">
        <h2 className=" font-bold text-2xl flex items-center gap-3">
          <span>Cart</span>{" "}
          <span className="indicator-item badge badge-primary">
            {cartProductsLength()}
          </span>{" "}
        </h2>
        <Link to="/">
          <button className="btn btn-circle">
            <IoHome size={20} />
          </button>
        </Link>
      </div>

      {cartProducts.length ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((cp) => (
                  <tr key={cp.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={cp.thumbnail}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{cp.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">${cp.price}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button
                          className="text-xl"
                          onClick={() => removeCartProduct(cp.id, 1)}
                        >
                          -
                        </button>
                        <span className="w-10 text-center bg-gray-100 rounded-md p-2 select-none">
                          {cp.count}
                        </span>
                        <button
                          className="text-xl"
                          onClick={() => addCartProduct(cp.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <th>${cp.count * cp.price}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="max-w-[300px] mx-auto border rounded-md p-5 mt-5 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3>Subtotal</h3>
              <span className="font-semibold">${subtotal}</span>
            </div>
            <hr />
            <div className="flex justify-between items-center my-3">
              <h3>Shipping Cost</h3>
              <span className="font-semibold">$50</span>
            </div>
            <hr />
            <div className="flex justify-between items-center mt-3 text-xl font-semibold">
              <h3>Total</h3>
              <span>${subtotal + 50}</span>
            </div>
          </div>
        </>
      ) : (
        <p className=" mt-5 text-gray-500">No Products Added</p>
      )}
    </div>
  );
};

export default Cart;
