import sys
sys.setrecursionlimit(1500)

from flask import Flask, url_for, redirect, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_session import Session
from flask_bcrypt import Bcrypt
from os import environ
from requests_oauthlib import OAuth2Session
from authlib.integrations.flask_client import OAuth
import os


app = Flask(__name__)
oauth = OAuth(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///critics.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ECHO"] = True
app.secret_key = environ.get("SESSION_SECRET")
app.config["SESSION_TYPE"] = "sqlalchemy"
# app.config["SESSION_SQLALCHEMY_TABLE"] = "sessions"

# GOOGLE_CLIENT_ID = environ.get("GOOGLE_CLIENT_ID", None)
# GOOGLE_CLIENT_SECRET = environ.get("GOOGLE_CLIENT_SECRET", None)

db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db

migrate = Migrate(app, db)
api = Api(app)
ma = Marshmallow(app)
session = Session(app)
flask_bcrypt = Bcrypt(app)

google = oauth.register(
    name='google',
    client_id="1043251127291-45mscbh11d51040eeinopn9be09qlg1k.apps.googleusercontent.com",
    client_secret="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",
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    # userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'email profile'},
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration'
)
