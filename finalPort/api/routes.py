import os
import base64
from flask import (render_template, Blueprint, jsonify,
                   url_for, send_from_directory, abort)
from dotenv import load_dotenv
import requests
import csv


app = Blueprint('routes', __name__)
load_dotenv()

HubToken = os.getenv('GITHUB_TOKEN')


@app.route('/')
def home():
    """ Serves single page portfolio """
    return render_template('index.html')


@app.route('/downloadcv')
def download_cv():
    """ Resume download view. Downloads the updated cv file
        in the project dir """
    return send_from_directory(directory='static',
                               path='BrianOmondi_CV.pdf', as_attachment=True)


def get_readme(readme_data):
    """ Func to retrieve the readme data passed as an arg and extracts needed
    sections for manipulation
    :param readme_data: returned from fetch_readme
    :return: readme title, content """
    lines = readme_data.split('\n')

    title = lines[0].replace('#', '').strip()
    content = '\n'.join(lines[1:])
    return title, content


@app.route('/fetch_readme/<repo_name>')
def fetch_readme(repo_name):
    """ Fetch the readmes of my github projects directly from github
    :param repo_name: Name of repository to retrieve
    :return: readme title and content """
    headers = {'Authorization': f'token {HubToken}' if HubToken else {}}
    url = f'https://api.github.com/repos/omondii/{repo_name}/readme'
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        readme_data = response.json()
        readme_content = base64.b64decode(readme_data['content']).decode('utf-8')
        # print(readme_content)
        title, excerpt = get_readme(readme_content)
        return jsonify({'title': title, 'content': excerpt})
    else:
        return jsonify({'error': 'Sorry Boss, No Repo matches!'}), 404


def read_blogs(file_name):
    """ Reads individual blog entries in the static/blogs dir
    returns: blog title, preview(1st 100 words), blog content
    """
    file_path = os.path.join('static', 'blogs', file_name)
    if not os.path.exists(file_path):
        abort(404)

    with open(file_path, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        blog_data = next(reader, None)
        if blog_data:
            blog_data['preview'] = blog_data['content'][:100] + '...'
            return blog_data
    return None


def get_all_blogs():
    """ Retrieves all blogs in .csv format 
    Returns: a full list of all blogs
    """
    blogs = []
    for file_name in os.listdir(os.path.join('static', 'blogs')):
        if file_name.endswith('.csv'):
            blog_data = read_blogs(file_name)
            if blog_data:
                blogs.append(blog_data)
    return blogs


@app.route('/blogs')
def fetch_blogs():
    """ View function to fetch All blogs page """
    blog_posts = get_all_blogs()
    return render_template('blogs/blogs.html', blog_posts=blog_posts)


@app.route('/blog/<string:post_id>')
def get_blog(post_id):
    """ Retrieves a single post by it's ID
    Returns: Post content
    """
    file_name = f"{post_id}.csv"
    blog_post = read_blogs(file_name)
    if blog_post:
        return jsonify(blog_post)
    return abort(404, description="Blog post not found")