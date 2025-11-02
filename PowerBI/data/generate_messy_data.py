
import csv
import random
from faker import Faker
from faker_commerce import Provider as CommerceProvider
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()
fake.add_provider(CommerceProvider)

# Number of records to generate
NUM_RECORDS = 5000

# --- Configuration ---
COUNTRIES = ['USA', 'usa', 'United States', 'UK', 'United Kingdom', 'Canada', 'canada']
REGIONS = ['North', 'South', 'East', 'West', 'Central']
CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home Goods', 'Sports']
DATE_FORMATS = ['%Y-%m-%d', '%m/%d/%Y', '%d-%b-%y']

# --- Helper Functions ---
def generate_messy_price():
    if random.random() < 0.1: # 10% chance of being messy
        return random.choice(['', 'N/A', 'Error', f'${random.uniform(10, 500):.2f}'])
    return round(random.uniform(10, 500), 2)

def generate_messy_quantity():
    if random.random() < 0.1: # 10% chance of being messy
        return random.choice(['', '-', 'one', 'two'])
    if random.random() < 0.05: # 5% chance of being an outlier
        return random.randint(100, 200)
    return random.randint(1, 10)

def generate_messy_date():
    date = fake.date_between(start_date='-2y', end_date='today')
    return date.strftime(random.choice(DATE_FORMATS))

def generate_messy_string(base_string):
    if random.random() < 0.1: # 10% chance of extra whitespace
        return f'  {base_string}  '
    return base_string

# --- Generate Messy Sales Data ---
def generate_messy_sales_data(file_path, num_records):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['OrderID', 'Product', 'Category', 'Price', 'Quantity', 'OrderDate', 'CustomerID', 'Country', 'Region', 'Salesperson']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for i in range(1, num_records + 1):
            record = {
                'OrderID': i,
                'Product': generate_messy_string(fake.ecommerce_name()),
                'Category': random.choice(CATEGORIES),
                'Price': generate_messy_price(),
                'Quantity': generate_messy_quantity(),
                'OrderDate': generate_messy_date(),
                'CustomerID': f'CUS{random.randint(1000, 9999)}',
                'Country': generate_messy_string(random.choice(COUNTRIES)),
                'Region': random.choice(REGIONS),
                'Salesperson': fake.name()
            }

            # Introduce some missing values
            if random.random() < 0.05:
                record[random.choice(list(record.keys()))] = ''

            writer.writerow(record)

            # Introduce some duplicate rows
            if random.random() < 0.05:
                writer.writerow(record)

if __name__ == "__main__":
    print("Generating messy sales data...")
    generate_messy_sales_data("sales_data.csv", NUM_RECORDS)
    print("Messy sales data generation complete!")
