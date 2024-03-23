import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.common.keys import Keys

def FruitVeg():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()


    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

    # Open the URL in the browser
    url = "https://www.metro.ca/en/online-grocery/aisles/fruits-vegetables"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

    # Wait for elements to be visible using CSS selector
    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '.head__title'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, '.pricing__sale-price .price-update')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Metro/metro_fruits_vegetables.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Metro/metro_fruits_vegetables.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()

# Call the function
FruitVeg()
