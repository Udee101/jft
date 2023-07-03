# Jobs4Techies

[Jobs4Techies](https://jobs4techies.vercel.app) is a job posting platform aimed at making tech related jobs easily accessible to other freelancers and/or job seekers in the tech space. The idea is for people to repost jobs from other job posting sites on Jobs4techies, thereby expanding the job's reach to others in need of the opportunities.


### How it works

For a new user, the user will register by filling the registration form, then login. After which, the user will be able to create, edit and delete job posts.


### Technologies used
#### Frontend
- VueJs
- CSS
#### Backend
- NodeJs (Express)
- Typescript
- Postgresql

## Run Locally

Clone the project

```bash
  git clone https://github.com/Udee101/jft
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Create the .env file for the environment variables.
```bash
  touch .env
```
Input all the necessary environment variables used in the server.

Start the backend

```bash
  npm run dev
```

The backend will start running on port 5001,then display this message in the console: 

```console
  Data Source has been initialized
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the frontend

```bash
  npm run dev
```

The frontend will launch on port 5173
