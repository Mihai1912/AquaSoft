import psycopg2

conn_params = {
    "host": "localhost",
    "port": 5432,
    "database": "mydatabase",
    "user": "user",
    "password": "password"
}

create_hotels_sql = """
CREATE TABLE IF NOT EXISTS hotels (
    GlobalPropertyID int PRIMARY KEY,
    SourcePropertyID varchar(50),
    GlobalPropertyName varchar(260),
    GlobalChainCode varchar(10),
    PropertyAddress1 text,
    PropertyAddress2 text,
    PrimaryAirportCode varchar(10),
    CityID int,
    PropertyStateProvinceID int,
    PropertyZipPostal varchar(20),
    PropertyPhoneNumber varchar(40),
    PropertyFaxNumber varchar(30),
    SabrePropertyRating decimal(3, 1),
    PropertyLatitude decimal(9, 6),
    PropertyLongitude decimal(9, 6),
    SourceGroupCode varchar(10),

    FOREIGN KEY (CityID) REFERENCES cities(CityID),
    FOREIGN KEY (PropertyStateProvinceID) REFERENCES regions(PropertyStateProvinceID)
);
"""

create_cities_sql = """
CREATE TABLE IF NOT EXISTS cities (
    CityID SERIAL PRIMARY KEY,
    CityName varchar(100),
    Country varchar(50)
);
"""

create_regions_sql = """
CREATE TABLE IF NOT EXISTS regions (
    PropertyStateProvinceID SERIAL PRIMARY KEY,
    PropertyStateProvinceName varchar(100)
);
"""


create_users_role_sql = """
CREATE TABLE IF NOT EXISTS users_role (
    id SERIAL PRIMARY KEY,
    role varchar(50) NOT NULL
);
"""

create_users_sql = """
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username varchar(50),
    email varchar(50),
    password varchar(255),
    role_id int,

    FOREIGN KEY (role_id) REFERENCES users_role(id)
);
"""


def sql_str(value):
    value = value.strip()
    return f"'{value.replace("'", "''")}'" if value else 'NULL'

def sql_num(value):
    return value.strip() if value.strip() != '' else 'NULL'

def sql_phone(value):
    value = value.strip()
    if value == '':
        return 'NULL'
    
    parts = [part.strip() for part in value.split('/')]
    
    if any(any(c.isalpha() for c in part) for part in parts):
        return 'NULL'
    
    cleaned_parts = [''.join(c for c in part if c.isdigit() or c == '+') for part in parts]
    
    cleaned_value = '/'.join(cleaned_parts)
    return f"'{cleaned_value}'"


def pars_csv():
    with open("All CSL Properties with Global Ids and GDS Ids (Active)_Jun25_1.csv", 'r', encoding='utf-16') as file:
        columns = file.readline().replace(" ", "").replace("\n", "").split('\t')

        columns_index = {col: i for i, col in enumerate(columns)}

        cities_number = 0
        regions_number = 0

        cities_index = {}
        regions_index = {}

        for line in file:
            
            insert_hotels_sql = "INSERT INTO hotels (GlobalPropertyID, SourcePropertyID, GlobalPropertyName, GlobalChainCode, PropertyAddress1, PropertyAddress2, PrimaryAirportCode, CityID, PropertyStateProvinceID, PropertyZipPostal, PropertyPhoneNumber, PropertyFaxNumber, SabrePropertyRating, PropertyLatitude, PropertyLongitude, SourceGroupCode) VALUES "

            values = line.replace("\n", "").split('\t')
            if len(values) != len(columns):
                continue

            city_key = values[columns_index["PropertyCityName"]].strip()
            region_key = values[columns_index["PropertyState/Province"]].strip()

            # Add city
            if city_key not in cities_index:
                cities_index[city_key] = cities_number
                insert_cities_sql = "INSERT INTO cities (CityID, CityName, Country) VALUES "
                insert_cities_sql += f"({cities_number}, {sql_str(city_key)}, {sql_str(values[columns_index['PropertyCountryCode']])});"
                
                try:
                    with psycopg2.connect(**conn_params) as conn:
                        with conn.cursor() as cursor:
                            cursor.execute(insert_cities_sql)
                            conn.commit()
                except Exception as e:
                    print(f"Error inserting city: {e}")

                cities_number += 1

            # Add region
            if region_key not in regions_index:
                regions_index[region_key] = regions_number
                insert_regions_sql = "INSERT INTO regions (PropertyStateProvinceID, PropertyStateProvinceName) VALUES "
                insert_regions_sql += f"({regions_number}, {sql_str(region_key)});"

                try:
                    with psycopg2.connect(**conn_params) as conn:
                        with conn.cursor() as cursor:
                            cursor.execute(insert_regions_sql)
                            conn.commit()
                except Exception as e:
                    print(f"Error inserting region: {e}")


                regions_number += 1

            insert_hotels_sql += f"""(
                {sql_num(values[columns_index['GlobalPropertyID']])},
                {sql_str(values[columns_index['SourcePropertyID']])},
                {sql_str(values[columns_index['GlobalPropertyName']])},
                {sql_str(values[columns_index['GlobalChainCode']])},
                {sql_str(values[columns_index['PropertyAddress1']])},
                {sql_str(values[columns_index['PropertyAddress2']])},
                {sql_str(values[columns_index['PrimaryAirportCode']])},
                {cities_index[city_key]},
                {regions_index[region_key]},
                {sql_str(values[columns_index['PropertyZip/Postal']])},
                {sql_phone(values[columns_index['PropertyPhoneNumber']])},
                {sql_phone(values[columns_index['PropertyFaxNumber']])},
                {sql_num(values[columns_index['SabrePropertyRating']])},
                {sql_num(values[columns_index['PropertyLatitude']])},
                {sql_num(values[columns_index['PropertyLongitude']])},
                {sql_str(values[columns_index['SourceGroupCode']])}
            );"""

            try: 
                with psycopg2.connect(**conn_params) as conn:
                    with conn.cursor() as cursor:
                        cursor.execute(insert_hotels_sql)
                        conn.commit()
            except Exception as e:
                print(f"Error inserting data: {e}")

drop_users_sql = """
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_role CASCADE;
"""

add_users_role_sql = """
INSERT INTO users_role (role) VALUES
('Hotel Manager'),
('Traveler'),
('Administrator'),
('Data Operator');
"""

def initialize_db():
    try:
        with psycopg2.connect(**conn_params) as conn:
            with conn.cursor() as cursor:
                # cursor.execute(create_cities_sql)
                # cursor.execute(create_regions_sql)
                # cursor.execute(create_hotels_sql)
                cursor.execute(drop_users_sql)
                cursor.execute(create_users_role_sql)
                cursor.execute(add_users_role_sql)
                cursor.execute(create_users_sql)
                conn.commit()
                print("Database initialized successfully.")
    except Exception as e:
        print(f"Error: {e}")

    # insert_cities_sql, insert_regions_sql, insert_hotels_sql = pars_csv()

if __name__ == "__main__":
    initialize_db()

