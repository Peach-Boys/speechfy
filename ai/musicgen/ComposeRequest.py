from pydantic import BaseModel

class ComposeRequest(BaseModel):
    userId: int
    studioId: int
    signedUrl: str
    instrumentsString: str
    mood: str
    genre: str
    name: str
    prompt: str
