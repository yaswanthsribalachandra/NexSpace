from pymongo import MongoClient
import certifi

from config import settings

client = MongoClient(
    settings.mongo_uri,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client["linkmanager"]

# Collections
users_collection = db["users"]
links_collection = db["links"]
otp_collection = db["otp"]