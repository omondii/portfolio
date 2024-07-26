from setuptools import setup, find_packages

setup(
    name='portfolio',
    versions='1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        # 'pytest',
    ],
    entry_points={
        'console_scripts': [
            'portfolio=wsgi:app',
        ],
    },
    author='Brian Omondi',
    author_email='omondiibrian00@gmail.com',
    description='My personal portfolio website written in flask/html',
    url=''
)