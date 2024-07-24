from flask import Flask
from .config import Config
"""
Server creation - Serves my personal portfolio
"""


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Import and register routes
    from .routes import bp as routes
    app.register_blueprint(routes)
    
    return app

app = create_app()
