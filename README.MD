Paranormal Database

Project in react in which paranormal events around the world are collected. Registered users can contribute their own reports.




Paranormal Events Routes

Base URL /paranormalEvents

| METHOD  | URI Path                                 | Description                                      |
|---------|------------------------------------------|--------------------------------------------------|
| GET     | /paranormalEvents                               | All Paranormal Events list                |
| GET     | /paranormalEvents/:id                           | Matching ID paranomral event details      |
| POST    | /paranormalEvents/saveEvent                     | Create new event                          |
| PUT     | /paranormalEvents/:id/edit                      | Matching ID paranormal event edit         |
| DELETE  | /paranormalEvents/:id/delete                    | Matching ID event deletion                |


Users routes

Base URL /users

| METHOD  | URI Path                                 | Description               |
|---------|------------------------------------------|---------------------------|
| GET     | /users                                   | All users list            |
| GET     | /users/:id                               | Matching ID user details  |
| PUT     | /users/:id/edit                          | Matching ID user edit     |
| DELETE  | /users/:id/delete                        | Matching ID user deletion |



Auth routes

Base URL /auth

| METHOD  | URI Path                                 | Description               |
|---------|------------------------------------------|---------------------------|
| GET     | /verify                                  | Verify auth token         |
| POST    | /login                                   | Login user                |
| POST    | /signup                                  | Signup user               |


If I accomplish MVP's:

Comments routes

Base URL /comments

| METHOD  | URI Path                                 | Description                                                 |
|---------|------------------------------------------|-------------------------------------------------------------|
| GET     | /comments/:id                            | Get all comments of a paranormal event                      |
| POST    | /comments/create/:id                     | Create new comment in a paranormal event                    |
| PUT     | /comments/edit/:id                       | Matching ID comment edition                                 |
| DELETE  | /comments/delete/:id                     | Matching ID comment deletion                                |# Paranormal-Database-Server
# Paranormal-Database-Server
# Paranormal-Database-Server
