# api.py

from flask import Flask, jsonify, request
from Parsetxt import get_product_data  # Import the function
from flask_cors import CORS

# After initializing your Flask app
app = Flask(__name__)
CORS(app)

product_data = get_product_data()  # Call the function to get the data


@app.route('/search', methods=['GET'])
def search():
    product_query = request.args.get('product', '').lower()
    results = {}
    for product, stores in product_data.items():
        if product_query in product.lower():
            for store, data in stores.items():
                if store not in results or data['price'] < results[store]['price']:
                    results[store] = data
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
