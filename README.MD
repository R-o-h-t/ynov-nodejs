Raphael MARIE TP2

### Heroku : 

- [https://ynov-b3-jest-matches-api.herokuapp.com/](https://ynov-b3-jest-matches-api.herokuapp.com/ "https://ynov-b3-jest-matches-api.herokuapp.com/")

### /auth

#### POST /login

    {
        "username" : string,
        "password":string
    }

#### POST /register

    {
        "username" : string, (UNIQUE)
        "password" : string,
        "email" : string,
        "role": "admin" | "user"
    }

### /matches

#### POST  admin, user

    {
        "team1" : string,
        "team2" : string,
        "date" : YYYY-MM-DD,
        "score" : "int-int"
    }

#### GET admin, user, guest

    {
        "page" : int,
        "size" : int
    }

#### GET /:id admin, user, guest

#### PUT /:id admin, user

    {
        "team1" : string,
        "team2" : string,
        "date" : YYYY-MM-DD,
        "score" : "int-int"
    }

#### PATCH /:id admin, user

    {
        "team1" : string | null,
        "team2" : string | null,
        "date" : YYYY-MM-DD | null,
        "score" : "int-int" | null
    }

#### DELETE /:id admin

### DELETE /wipe

    clear all stored Users and Matches from the database.
