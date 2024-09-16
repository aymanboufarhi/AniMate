from pydantic import BaseModel

class Anime(BaseModel) :
    uid: int
    title: str
    synopsis: str
    genre: str
    aired: str
    episodes: float
    members: int
    popularity: int
    ranked: float
    score: float
    img_url: str
    link: str
    clas: int