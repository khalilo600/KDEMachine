
import csv
from faker import Faker
from faker_commerce import Provider as CommerceProvider
import random
from datetime import datetime

# Initialize Faker
fake = Faker()
fake.add_provider(CommerceProvider)

# Number of records to generate
NUM_USERS = 10000
NUM_PRODUCTS = 10000
NUM_ORDERS = 10000
NUM_EMPLOYEES = 10000
NUM_DEPARTMENTS = 100
NUM_LOCATIONS = 50

# --- Generate users.csv ---
def generate_users(file_path, num_users):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['user_id', 'username', 'email', 'password', 'created_at']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, num_users + 1):
            writer.writerow({
                'user_id': i,
                'username': fake.user_name(),
                'email': fake.email(),
                'password': fake.password(),
                'created_at': fake.date_time_this_decade()
            })

# --- Generate products.csv ---
def generate_products(file_path, num_products):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['product_id', 'name', 'description', 'price', 'created_at']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, num_products + 1):
            writer.writerow({
                'product_id': i,
                'name': fake.ecommerce_name(),
                'description': fake.text(max_nb_chars=200),
                'price': round(random.uniform(10, 500), 2),
                'created_at': fake.date_time_this_decade()
            })

# --- Generate orders.csv ---
def generate_orders(file_path, num_orders, num_users, num_products):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['order_id', 'user_id', 'product_id', 'quantity', 'order_date']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, num_orders + 1):
            writer.writerow({
                'order_id': i,
                'user_id': random.randint(1, num_users),
                'product_id': random.randint(1, num_products),
                'quantity': random.randint(1, 5),
                'order_date': fake.date_time_this_year()
            })

# --- Generate employees.csv ---
def generate_employees(file_path, num_employees, num_departments):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['employee_id', 'first_name', 'last_name', 'email', 'phone_number', 'hire_date', 'job_id', 'salary', 'manager_id', 'department_id']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, num_employees + 1):
            writer.writerow({
                'employee_id': i,
                'first_name': fake.first_name(),
                'last_name': fake.last_name(),
                'email': fake.email(),
                'phone_number': fake.phone_number(),
                'hire_date': fake.date_of_birth(minimum_age=18, maximum_age=60),
                'job_id': f'JOB_{random.randint(1, 20)}',
                'salary': round(random.uniform(40000, 150000), 2),
                'manager_id': random.randint(1, num_employees) if i > 1 else None,
                'department_id': random.randint(1, num_departments)
            })

# --- Generate departments.csv ---
def generate_departments(file_path, num_departments, num_locations):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['department_id', 'department_name', 'manager_id', 'location_id']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, num_departments + 1):
            writer.writerow({
                'department_id': i,
                'department_name': fake.bs().title(),
                'manager_id': random.randint(1, NUM_EMPLOYEES),
                'location_id': random.randint(1, num_locations)
            })

# --- Generate locations.csv ---
def generate_locations(file_path, num_locations):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = ['location_id', 'street_address', 'postal_code', 'city', 'state_province', 'country_id']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, num_locations + 1):
            writer.writerow({
                'location_id': i,
                'street_address': fake.street_address(),
                'postal_code': fake.zipcode(),
                'city': fake.city(),
                'state_province': fake.state(),
                'country_id': fake.country_code()
            })

if __name__ == "__main__":
    print("Generating dummy data...")
    generate_users("SQL/data/users.csv", NUM_USERS)
    generate_products("SQL/data/products.csv", NUM_PRODUCTS)
    generate_orders("SQL/data/orders.csv", NUM_ORDERS, NUM_USERS, NUM_PRODUCTS)
    generate_employees("SQL/data/employees.csv", NUM_EMPLOYEES, NUM_DEPARTMENTS)
    generate_departments("SQL/data/departments.csv", NUM_DEPARTMENTS, NUM_LOCATIONS)
    generate_locations("SQL/data/locations.csv", NUM_LOCATIONS)
    print("Dummy data generation complete!")
