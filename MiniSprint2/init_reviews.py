import psycopg2

conn_params = {
    "host": "localhost",
    "port": 5432,
    "database": "mydatabase",
    "user": "user",
    "password": "password"
}

create_reviews_sql = """
CREATE TABLE IF NOT EXISTS reviews (
    ReviewId SERIAL PRIMARY KEY,
    GlobalPropertyID int NOT NULL,
    UserId int NOT NULL,
    ReviewTitle varchar(255),
    ReviewText text,
    ReviewRating int CHECK (ReviewRating >= 1 AND ReviewRating <= 5),
    ReviewDate timestamp DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (GlobalPropertyID) REFERENCES hotels(GlobalPropertyID),
    FOREIGN KEY (UserId) REFERENCES users(id)
);
"""

create_review_ratings_sql = """
CREATE TABLE IF NOT EXISTS review_ratings (
    RatingId SERIAL PRIMARY KEY,
    ReviewId int NOT NULL,
    Criteria varchar(50),
    RatingValue int CHECK (RatingValue >= 1 AND RatingValue <= 5),

    FOREIGN KEY (ReviewId) REFERENCES reviews(ReviewId) 
);
"""

def initialize_db():
    try:
        conn = psycopg2.connect(**conn_params)
        cursor = conn.cursor()
        
        cursor.execute(create_reviews_sql)
        
        cursor.execute(create_review_ratings_sql)
        
        conn.commit()
        print("Reviews and review ratings tables created successfully.")
        
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    initialize_db()
    print("Database initialization complete.")