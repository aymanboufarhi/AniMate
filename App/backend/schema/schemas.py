import math

def anime_serial(anime) -> dict:
    def safe_float(value):
        try:
            float_value = float(value)
            return float_value if not math.isnan(float_value) else None
        except (ValueError, TypeError):
            return None

    return {
        "id": str(anime["_id"]),
        "uid": int(anime["uid"]),
        "title": str(anime["title"]),
        "synopsis": str(anime["synopsis"]),
        "genre": str(anime["genre"]),
        "aired": str(anime["aired"]),
        "episodes": safe_float(anime.get("episodes")),
        "members": int(anime["members"]),
        "popularity": int(anime["popularity"]),
        "ranked": safe_float(anime.get("ranked")),
        "score": safe_float(anime.get("score")),
        "img_url": str(anime["img_url"]),
        "link": str(anime["link"]),
        "clas": safe_float(anime.get("class"))
    }

def list_serial(animes) -> list:
    return [anime_serial(anime) for anime in animes]