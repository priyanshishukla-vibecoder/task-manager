from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings): #A Pydantic class for reading environment variables.
    database_url: str
    app_env: str = "development"

    model_config = SettingsConfigDict(env_file=".env")
    secret_key: str = "change-this-secret-key"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30


settings = Settings()


