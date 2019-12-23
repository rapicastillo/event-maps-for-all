# Event Maps for All

Creates an event map for your organization / campaign. Makes it easier for volunteers to find an event!

# Setup 

### Deploy this to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

You wil add your project name, and get the necessary prompts

### Set up scheduled jobs

1. Go to `https://dashboard.heroku.com/apps/<YOUR_APP_NAME>/scheduler` (replace `<YOUR_APP_NAME>` with the name of your app)
2. Add `python manage.py pull_data` to the jobs. Set the frequency of the job

# Development

Frontend's in React and is already included in this package

## IF you'd like to contribute, be sure to do the following:

1. Run `pipenv install`

### .env
```
export DB_NAME=<dbname>
export DB_PASSWORD=
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=root
```

A barebones Django app, which can easily be deployed to Heroku.

This application supports the [Getting Started with Python on Heroku](https://devcenter.heroku.com/articles/getting-started-with-python) article - check it out.

## Running Locally

Make sure you have Python 3.7 [installed locally](http://install.python-guide.org). To push to Heroku, you'll need to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), as well as [Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup).

```sh
$ git clone https://github.com/heroku/python-getting-started.git
$ cd python-getting-started

$ python3 -m venv getting-started
$ pip install -r requirements.txt

$ createdb python_getting_started

$ python manage.py migrate
$ python manage.py collectstatic

$ heroku local
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```sh
$ heroku create
$ git push heroku master

$ heroku run python manage.py migrate
$ heroku open
```
