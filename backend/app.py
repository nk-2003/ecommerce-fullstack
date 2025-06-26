from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
import os

app = Flask(__name__)

# ✅ Allow Vercel + local frontend access
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "https://retrofy-three.vercel.app"
]}}, supports_credentials=True)

# ✅ JWT config
app.config["JWT_SECRET_KEY"] = "secret123"
jwt = JWTManager(app)

# ✅ MongoDB connection
client = MongoClient("mongodb+srv://naveen:nk--2003@cluster0.ys5ptbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["ecommerce"]
products_col = db["products"]
cart_col = db["cart"]
orders_col = db["orders"]
users_col = db["users"]

@app.route('/')
def home():
    return jsonify({"message": "Backend connected to MongoDB"})

# ✅ Register
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if users_col.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    users_col.insert_one({"email": email, "password": password})
    return jsonify({"message": "Registered successfully"})

# ✅ Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_col.find_one({"email": email, "password": password})
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user['_id']))
    return jsonify({"token": token, "email": user['email']})

# ✅ Products
@app.route('/products')
def get_products():
    products = list(products_col.find())
    for p in products:
        p['_id'] = str(p['_id'])
    return jsonify(products)

# ✅ Add to Cart
@app.route('/cart/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    product_id = data.get('product_id')

    if not product_id:
        return jsonify({"error": "product_id required"}), 400

    cart_col.insert_one({"product_id": product_id, "user_id": user_id})
    return jsonify({"message": "Added to cart"})

# ✅ View Cart
@app.route('/cart/view')
@jwt_required()
def view_cart():
    user_id = get_jwt_identity()
    cart_items = list(cart_col.find({"user_id": user_id}))

    product_ids = [ObjectId(item["product_id"]) for item in cart_items if "product_id" in item]
    products = list(products_col.find({"_id": {"$in": product_ids}}))

    for p in products:
        p['_id'] = str(p['_id'])

    return jsonify(products)

# ✅ Remove from Cart
@app.route('/cart/remove', methods=['POST'])
@jwt_required()
def remove_from_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    product_id = data.get('product_id')

    if not product_id:
        return jsonify({"error": "product_id required"}), 400

    cart_col.delete_one({"product_id": product_id, "user_id": user_id})
    return jsonify({"message": "Removed from cart"})

# ✅ Place Order
@app.route('/orders/place', methods=['POST'])
@jwt_required()
def place_order():
    user_id = get_jwt_identity()
    items = list(cart_col.find({"user_id": user_id}))

    if not items:
        return jsonify({"error": "Cart is empty"}), 400

    product_ids = [item["product_id"] for item in items if "product_id" in item]
    orders_col.insert_one({"user_id": user_id, "products": product_ids})
    cart_col.delete_many({"user_id": user_id})

    return jsonify({"message": "Order placed successfully"})

# ✅ View Orders
@app.route('/orders/view')
@jwt_required()
def view_orders():
    user_id = get_jwt_identity()
    orders = list(orders_col.find({"user_id": user_id}))
    result = []

    for order in orders:
        product_ids = order.get("products", [])
        object_ids = []
        for pid in product_ids:
            try:
                object_ids.append(ObjectId(pid))
            except:
                continue

        products = list(products_col.find({"_id": {"$in": object_ids}}))
        for p in products:
            p['_id'] = str(p['_id'])

        result.append({
            "order_id": str(order["_id"]),
            "products": products
        })

    return jsonify(result)

# ✅ Cancel Order
@app.route('/orders/cancel', methods=['POST'])
@jwt_required()
def cancel_order():
    user_id = get_jwt_identity()
    data = request.get_json()
    order_id = data.get('order_id')

    if not order_id:
        return jsonify({"error": "order_id required"}), 400

    result = orders_col.delete_one({"_id": ObjectId(order_id), "user_id": user_id})
    if result.deleted_count == 1:
        return jsonify({"message": "Order cancelled"})
    else:
        return jsonify({"error": "Order not found"}), 404

# ✅ Start server
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
