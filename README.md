# LOGIN_LOGOUT
An application has been built using NodeJs and Express . It’s totally a Backend Project which contains a certain Restful API using Express .

The application is used to create new users and save its credentials in Database.

It also deals with login and logout of users and maintains the details of users during last login and logout .

## RUN the following commands in the terminal to use this app locally
-[Install `nodeJs`](https://nodejs.org/en/download/)
-[Install `mongoDB Compass`](https://www.mongodb.com/try/download/community)
-[Install `mongoDB compass`](https://www.mongodb.com/products/tools/compass)

Then run following commands.

`STEP 1` - Install all dependencies
'npm install'

`STEP 2` - Start server
'node index.js'


## Using its Docker Image
- Setup [Docker](https://docs.docker.com/compose/gettingstarted/)
- Setup [Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)
- Then run the following commands
```
  docker build -t <your-image-name> .
   ```
```
docker run -p 4000:4000 -d <your-image-name>
   ```