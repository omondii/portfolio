import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')  or 'final-portfolio' # Check on how to seclude this line in production 
    DEBUG = True

