import csv
import random
from datetime import datetime, timedelta
from faker import Faker

# Initialize Faker for realistic data generation
fake = Faker()

# --- Configuration ---
NUM_CUSTOMERS = 2000
NUM_SHIPMENTS = 2000

# Pre-defined data for foreign key relationships
# These should match the data inserted in the SQL script
SHIPPERS = [
    (1, 'FastShip Logistics'),
    (2, 'Global Express'),
    (3, 'Speedy Delivery Inc.')
]
SERVICE_RATES = [
    ('STD', 'Standard Shipping', 2.50),
    ('EXP', 'Express Shipping', 5.00),
    ('PRI', 'Priority Shipping', 10.00)
]
SHIPMENT_STATUSES = ['Pending', 'In Transit', 'Delivered', 'Delayed', 'Cancelled']

# --- Generate Customers Data ---
def generate_customers_data(num_customers):
    customers_data = []
    for i in range(1, num_customers + 1):
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@{fake.free_email_domain()}"
        city = fake.city()
        country = fake.country()
        customers_data.append([i, first_name, last_name, email, city, country])
    return customers_data

# --- Generate Shipments Data ---
def generate_shipments_data(num_shipments, customer_ids, shipper_ids, service_ids):
    shipments_data = []
    for i in range(1, num_shipments + 1):
        customer_id = random.choice(customer_ids)
        shipper_id = random.choice(shipper_ids)
        service_id = random.choice(service_ids)
        
        weight_kg = round(random.uniform(1, 200), 2) # Weight between 1 and 200 kg
        
        shipment_date = fake.date_between(start_date='-1y', end_date='today')
        
        # Delivery date after shipment date, with some randomness
        delivery_date = shipment_date + timedelta(days=random.randint(1, 30))
        
        status = random.choice(SHIPMENT_STATUSES)
        
        # Calculate shipment cost based on service rate and weight
        service_rate_obj = next(sr for sr in SERVICE_RATES if sr[0] == service_id)
        rate_per_kg = service_rate_obj[2]
        shipment_cost = round(weight_kg * rate_per_kg * random.uniform(0.9, 1.1), 2) # Add some variability
        
        shipments_data.append([
            i, customer_id, shipper_id, service_id, weight_kg, 
            shipment_date.strftime('%Y-%m-%d'), 
            delivery_date.strftime('%Y-%m-%d'), 
            status, shipment_cost
        ])
    return shipments_data

# --- Main Execution ---
if __name__ == "__main__":
    # Generate Customers
    print(f"Generating {NUM_CUSTOMERS} customer records...")
    customers = generate_customers_data(NUM_CUSTOMERS)
    customer_ids = [c[0] for c in customers] # Extract customer_ids for shipments

    with open('customers.csv', 'w', newline='') as csvfile:
        customer_writer = csv.writer(csvfile)
        customer_writer.writerow(['customer_id', 'first_name', 'last_name', 'email', 'city', 'country'])
        customer_writer.writerows(customers)
    print("customers.csv created.")

    # Generate Shipments
    print(f"Generating {NUM_SHIPMENTS} shipment records...")
    shipper_ids = [s[0] for s in SHIPPERS]
    service_ids = [sr[0] for sr in SERVICE_RATES]
    shipments = generate_shipments_data(NUM_SHIPMENTS, customer_ids, shipper_ids, service_ids)

    with open('shipments.csv', 'w', newline='') as csvfile:
        shipment_writer = csv.writer(csvfile)
        shipment_writer.writerow([
            'shipment_id', 'customer_id', 'shipper_id', 'service_id', 'weight_kg', 
            'shipment_date', 'delivery_date', 'status', 'shipment_cost'
        ])
        shipment_writer.writerows(shipments)
    print("shipments.csv created.")

    print("Data generation complete.")
