from fastapi import APIRouter
from models.anime import Anime
from config.database import collection_name
from schema.schemas import list_serial
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def get_animes():
    animes = list_serial(collection_name.find())
    return animes