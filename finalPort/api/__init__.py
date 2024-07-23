from flask import Flask
"""
Server creation - Serves my personal portfolio
"""

def create_app(config_class='api.config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Import and register routes
    from api.routes import bp as routes
    app.register_blueprint(routes)
    
    return app

app = create_app()
