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
    url = "https://www.nofrills.ca/food/fruits-vegetables/c/28000?navid=flyout-L2-fruits-vegetables"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

    # Wait for elements to be visible using CSS selector
    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="product-title"]'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, 'p[data-testid="product-package-size"]')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Nofrills/Nofrill_fruits_vegetables.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Nofrills/Nofrill_fruits_vegetables.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()


def DairyEggs():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()

    # Specify the path to the Chrome binary (if not in the default location)
    

    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

    # Open the URL in the browser
    url = "https://www.nofrills.ca/food/dairy-eggs/c/28003?navid=flyout-L2-Dairy-and-Eggs"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

     # Scroll down to load more products
    body = driver.find_element(By.TAG_NAME, 'body')
    for _ in range(6):  # You may adjust the number of scrolls based on your needs
        body.send_keys(Keys.END)
        time.sleep(2)  # Wait for a moment after each scroll to allow content loading

    # Wait for the additional products to load
    time.sleep(5)  # Adjust the sleep time as needed

    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="product-title"]'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, 'p[data-testid="product-package-size"]')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Nofrills/Nofrills_dairy_eggs.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Nofrills/Nofrills_dairy_eggs.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()



def Pantry():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()

    # Specify the path to the Chrome binary (if not in the default location)
    

    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

    # Open the URL in the browser
    url = "https://www.nofrills.ca/food/pantry/c/28006?navid=flyout-L2-Pantry"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

     # Scroll down to load more products
    body = driver.find_element(By.TAG_NAME, 'body')
    for _ in range(6):  # You may adjust the number of scrolls based on your needs
        body.send_keys(Keys.END)
        time.sleep(2)  # Wait for a moment after each scroll to allow content loading

    # Wait for the additional products to load
    time.sleep(5)  # Adjust the sleep time as needed

    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="product-title"]'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, 'p[data-testid="product-package-size"]')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Nofrills/Nofrills_pantry.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Nofrills/Nofrills_pantry.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()


def IntrFoods():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()

    # Specify the path to the Chrome binary (if not in the default location)
    

    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

    # Open the URL in the browser
    url = "https://www.nofrills.ca/food/international-foods/c/58044?navid=flyout-L2-International-Foods"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

     # Scroll down to load more products
    body = driver.find_element(By.TAG_NAME, 'body')
    for _ in range(6):  # You may adjust the number of scrolls based on your needs
        body.send_keys(Keys.END)
        time.sleep(2)  # Wait for a moment after each scroll to allow content loading

    # Wait for the additional products to load
    time.sleep(5)  # Adjust the sleep time as needed

    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="product-title"]'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, 'p[data-testid="product-package-size"]')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Nofrills/Nofrills_international_foods.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Nofrills/Nofrills_international_foods.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()

def meat():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()

    # Specify the path to the Chrome binary (if not in the default location)
    

    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

    # Open the URL in the browser
    url = "https://www.nofrills.ca/food/meat/c/27998?navid=flyout-L2-Meat"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

     # Scroll down to load more products
    body = driver.find_element(By.TAG_NAME, 'body')
    for _ in range(6):  # You may adjust the number of scrolls based on your needs
        body.send_keys(Keys.END)
        time.sleep(2)  # Wait for a moment after each scroll to allow content loading

    # Wait for the additional products to load
    time.sleep(5)  # Adjust the sleep time as needed

    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="product-title"]'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, 'p[data-testid="product-package-size"]')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Nofrills/Nofrills_meat.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Nofrills/Nofrills_meat.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()

def sea():
    # Update the PATH to the location of your chromedriver executable
    PATH = PATH = "C:\\chromedriver\\chromedriver-win64\\chromedriver.exe"


    # Create ChromeOptions object to configure browser options
    chrome_options = webdriver.ChromeOptions()

    # Specify the path to the Chrome binary (if not in the default location)
    

    # Initialize the Chrome WebDriver with the options
    driver = webdriver.Chrome(options=chrome_options)

    # Open the URL in the browser
    url = "https://www.nofrills.ca/food/fish-seafood/c/27999?navid=flyout-L2-Fish-and-Seafood"
    driver.get(url)

    # Wait for the page to load (you can adjust the timeout if needed)
    wait = WebDriverWait(driver, 20)  # Increase the timeout to 20 seconds

     # Scroll down to load more products
    body = driver.find_element(By.TAG_NAME, 'body')
    for _ in range(6):  # You may adjust the number of scrolls based on your needs
        body.send_keys(Keys.END)
        time.sleep(2)  # Wait for a moment after each scroll to allow content loading

    # Wait for the additional products to load
    time.sleep(5)  # Adjust the sleep time as needed

    product_title_elements = wait.until(
        EC.visibility_of_all_elements_located((By.CSS_SELECTOR, '[data-testid="product-title"]'))
    )

    # Fetch product names
    product_names = [title_element.text.strip() for title_element in product_title_elements]

    # Fetch prices separately
    price_elements = driver.find_elements(By.CSS_SELECTOR, 'p[data-testid="product-package-size"]')
    prices = [price_element.text.strip() for price_element in price_elements]

    # Check if the number of names and prices match
    if len(product_names) == len(prices):
        # Combine names and prices into a dictionary
        product_data = dict(zip(product_names, prices))

        # Write data to a text file
        with open("Grocery_Data/Nofrills/Nofrills_fish_seafood.txt", "w") as file:
            # Write header
            file.write(f"{'Product Name':<50}{'Price':<20}\n")
            file.write("=" * 70 + "\n")

            # Write data in table format
            for product_name, price in product_data.items():
                file.write(f"{product_name:<50}{price:<20}\n")

        print("Data has been written to 'Grocery_Data/Nofrills/Nofrills_fish_seafood.txt'")
    else:
        print("Error: Number of product names and prices do not match.")

    # Close the browser
    driver.quit()

# Call the function
DairyEggs()
FruitVeg()
Pantry()
IntrFoods()
meat()
sea()