<div>
    <h1 align='center'> Cafe Critic</h1>
    <p align='center'> Condensed and fun review web application for fellow Cafe hoppers!</p>
    <p align='center'> Check out the website here: (insert)</p>
</div>

## About the Project
INSERT GIF OF THE WEBSITE HERE

Cafe Critic is a platform developed for those who wishes to keep track of their favorite and not-so-favorite cafes. It is built with React, Flask, and SQLAlchemy with the help of variety of other packages. 

In this project, the following frameworks (or libraries) were used:
( LIST THEM )

## Installation
If you wish to view the project locally, please fork and clone the repo. 

After fork and cloning the repo, you will have to do several installation:

Before installation, please create .env file inside both client and server folder. You will need to type these lines inside the server/.env.

   ```
    FLASK_APP=app.py
    FLASK_RUN_PORT=5555
   ```

Move into /server and type these in the terminal:
1. pipenv install && pipenv shell
2. flask run

With the .env file in the server folder, your default routes for backend will be  http://localhost:5555.

Move into /client and type these in the terminal:
1. npm install
2. npm start


This project utilizes Google OAuth sign in feature. Please head over to https://console.cloud.google.com/apis/credentials/oauthclient and create a project. You'll be able to generate OAuth Client ID. Please put the client ID inside the .env file.

In the backend:
```
GOOGLE_CLIENT_ID = 'yourclientid'
```

You'll need to create .env file inside your client folder as well since the frontend uses the client ID.

In the frontend:
```
REACT_APP_GOOGLE_CLIENT_ID = 'yourclientid'
```


## Contribution
If you would like to make any suggestion to make this project better, please feel free to fork the repo and create a pull request! 

1. Fork the repo
2. Create your own branch
3. Commit your suggestion
4. Push to your branch
5. Open a pull request

## License
[MIT](https://choosealicense.com/licenses/mit/)

