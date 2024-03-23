from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def FruitVeg():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()


    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

# Set up the Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Optional: if you don't want the browser window to open
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

def scrape_products(url):
    driver.get(url)
    products_data = []
   
    # Find all product containers
    product_containers = driver.find_elements(By.CLASS_NAME, 'default-product-tile')
   
    for container in product_containers:
        # Extracting product name
        name = container.find_element(By.CLASS_NAME, 'head__title').text
       
        # Extracting product details like size and variety
        details = container.find_element(By.CLASS_NAME, 'head__unit-details').text
       
        # Extracting price
        price = container.find_element(By.CLASS_NAME, 'pricing__sale-price').text
        secondary_price = container.find_element(By.CLASS_NAME, 'pricing__secondary-price').text
       
        # Extracting image URL
        image_element = container.find_element(By.TAG_NAME, 'img')
        image_url = image_element.get_attribute('src')
       
        products_data.append({
            'name': name,
            'details': details,
            'price': price,
            'secondary_price': secondary_price,
            'image_url': image_url
        })
   
    return products_data

# List of category URLs to scrape
category_urls = [
    "https://www.foodbasics.ca/aisles/fruits-vegetables",
    # ... (all the other category URLs)
    "https://www.foodbasics.ca/aisles/fish-seafood"
]

# Scrape data from each category and save to a text file
with open('Grocery_Data\\foodbasic\\dairy_eggs.txt', 'w') as file:
    for url in category_urls:
        category_name = url.split('/')[-1]  # Extract the category name from the URL
        products = scrape_products(url)
        file.write(f"Category: {category_name}\n")
        for item in products:
            file.write(f"Name: {item['name']}, Details: {item['details']}, Price: {item['price']}, Unit Price: {item['secondary_price']}, Image URL: {item['image_url']}\n")
        file.write("\n")

# Don't forget to quit the driver after you're done
driver.quit()

# Output the file path for download
print("Data has been scraped and saved to scraped_products.txt")
file_path = 'Grocery_Data\\foodbasic\\dairy_eggs.txt'
print(f"You can download the file from the following link: [Download scraped_products.txt]({file_path})")