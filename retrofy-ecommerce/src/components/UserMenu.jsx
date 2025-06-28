import React from 'react';

const UserMenu = ({ user, cart, orders, logout }) => {
  return (
    <div className="absolute top-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50 text-gray-800 space-y-4">
      {/* User Info */}
      <div>
        <h3 className="text-lg font-semibold border-b pb-2">
          👤 User: {user.name}
        </h3>
      </div>

      {/* Cart Section */}
      <div>
        <h4 className="text-md font-medium mb-1">🛒 Cart:</h4>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">Cart is empty</p>
        ) : (
          <div className="space-y-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b pb-1">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div>
        <h4 className="text-md font-medium mb-1">📦 Orders:</h4>
        {orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-2">
            {orders.map(order => (
              <div key={order.order_id} className="text-sm">
                <p className="font-semibold">
                  Order #{order.order_id.slice(-6)}
                </p>
                <div className="ml-3 space-y-0.5">
                  {order.products.map(prod => (
                    <p key={prod._id} className="text-gray-700">
                      {prod.name} - ₹{prod.price}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="flex justify-end pt-2 border-t">
        <button
          onClick={logout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
