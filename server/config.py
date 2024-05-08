
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
from dotenv import load_dotenv

load_dotenv()


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

oauth = OAuth(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ.get("SESSION_SECRET")
app.config["SESSION_TYPE"] = "sqlalchemy"
# app.config["SESSION_SQLALCHEMY_TABLE"] = "sessions"

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")


db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db

migrate = Migrate(app, db)
api = Api(app)
ma = Marshmallow(app)
session = Session(app)
flask_bcrypt = Bcrypt(app)

