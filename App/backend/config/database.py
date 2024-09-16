from pymongo import MongoClient

client = MongoClient("")

db = client.anime_db
collection_name = db["anime_col"]