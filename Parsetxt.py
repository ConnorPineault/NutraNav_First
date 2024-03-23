import os
import re

# Initialize an empty dictionary to hold all product data
product_data = {}

# List of store file paths
store_files = [

    "Grocery_Data/Nofrills/Nofrills_fruits_vegetables.txt",
    "Grocery_Data/Loblaws/Loblaws_fruits_vegetables.txt",
    "Grocery_Data/Nofrills/Nofrills_dairy_eggs.txt",
    "Grocery_Data/Loblaws/Loblaws_dairy_eggs.txt",
    "Grocery_Data/Nofrills/Nofrills_fish_seafood.txt",
    "Grocery_Data/Loblaws/Loblaws_fish_seafood.txt",
    "Grocery_Data/Nofrills/Nofrills_international_foods.txt",
    "Grocery_Data/Loblaws/Loblaws_international_foods.txt",
    "Grocery_Data/Nofrills/Nofrills_meat.txt",
    "Grocery_Data/Loblaws/Loblaws_meat.txt",
    "Grocery_Data/Nofrills/Nofrills_pantry.txt",
    "Grocery_Data/Loblaws/Loblaws_pantry.txt",
    # Add more file paths as needed
]




def standardize_product_name(name):
    # Example standardization rules
    name = name.lower()
    name = name.replace('fresh ', '').replace('organic ', '')
    if 'broccoli crowns' in name:
        name = 'broccoli'
    # Add more rules as needed
    return name


# Function to parse price and unit from text
def parse_price_unit(price_str):
    price_str = price_str.lower()
    price_match = re.search(r"\$([\d.]+)/", price_str)
    unit_match = re.search(r"/(.+)$", price_str)
    if price_match and unit_match:
        return float(price_match.group(1)), unit_match.group(1).strip()
    return None, None

# Function to process each store's file
def process_store_file(file_path, product_data):
    store_name = os.path.basename(file_path).split('_')[0]
    encodings = ['utf-8', 'latin1', 'iso-8859-1', 'cp1252']  # Common text file encodings
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as file:
                lines = file.readlines()
                break  # Successfully read the file, exit the loop
        except UnicodeDecodeError:
            continue  # Try the next encoding
    else:
        print(f"Could not read {file_path} with any of the specified encodings.")
        return  # Skip this file if none of the encodings worked
    
    # File reading was successful, continue processing lines...
    for line in lines[2:]:  # Skipping the header lines
        parts = line.strip().split('  ')  # Assuming at least two spaces as a separator
        parts = [p for p in parts if p]  # Remove empty strings
        if len(parts) >= 2:
            product_name = standardize_product_name(parts[0].strip())
            price, unit = parse_price_unit(parts[1])
            if product_name and price is not None:
                if product_name not in product_data:
                    product_data[product_name] = {}
                product_data[product_name][store_name] = {'price': price, 'unit': unit}

# New function to get product data
def get_product_data():
    product_data = {}
    for store_file in store_files:
        process_store_file(store_file, product_data)
    return product_data

if __name__ == "__main__":
    data = get_product_data()
    print(data)  # Or print a specific product to test
