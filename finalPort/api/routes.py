from flask import render_template, Blueprint, url_for, request

bp = Blueprint('routes', __name__)

@bp.route('/')
def home():
    return render_template('index.html')    