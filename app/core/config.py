from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings): #A Pydantic class for reading environment variables.
    database_url: str
    app_env: str = "development"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()


