import json
import psycopg2

conn_params = {
    "host": "localhost",
    "port": 5432,
    "database": "mydatabase",
    "user": "user",
    "password": "password"
}

def create_query():
    add_reviews_sql = """
    INSERT INTO reviews (ReviewId, GlobalPropertyID, UserId, ReviewTitle, ReviewText, ReviewRating, ReviewDate) VALUES
    """

    add_review_ratings_sql = """
    INSERT INTO review_ratings (ReviewId, Criteria, RatingValue) VALUES
    """

    with open('./reviews/tripadvisor_Dusit Thani Abu Dhabi.json', 'r') as file:
        data = json.load(file)

    for r in data:
        review_id = r['Review Id']
        global_property_id = 100042390
        user_id = r['User ID']
        review_title = r['Review Title'].replace("'", "''")  # Escape single quotes for SQL
        review_text = r['Review Text'].replace("'", "''")  # Escape single quotes for SQL
        review_rating = r['Rating']
        review_date = r['Created Date']

        add_reviews_sql += f"({review_id}, {global_property_id}, '{user_id}', '{review_title}', '{review_text}', {review_rating}, '{review_date}'),\n"

        aditional_ratings = r['Additional Ratings'].split('\n')
        
        if len(aditional_ratings) == 1 and aditional_ratings[0] == '':
            continue

        for additional_rating in aditional_ratings:
            criteria = additional_rating.split(':')[0].strip()
            rating_value = additional_rating.split(':')[1].strip()

            add_review_ratings_sql += f"({review_id}, '{criteria}', {rating_value}),\n"

    add_reviews_sql = add_reviews_sql.rstrip(',\n') + ';'
    add_review_ratings_sql = add_review_ratings_sql.rstrip(',\n') + ';'

    return add_reviews_sql, add_review_ratings_sql

def initialize_db():
    add_reviews_sql, add_review_ratings_sql = create_query()
    try:
        conn = psycopg2.connect(**conn_params)
        cursor = conn.cursor()
        
        cursor.execute(add_reviews_sql)
        cursor.execute(add_review_ratings_sql)
        
        conn.commit()
        print("Reviews and review ratings added successfully.")
        
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    initialize_db()