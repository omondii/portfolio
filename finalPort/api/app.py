from . import create_app
import os


port = int(os.getenv('PORT', 3000))
app = create_app()

if __name__ == '__main__':
    app.run(port=port)
