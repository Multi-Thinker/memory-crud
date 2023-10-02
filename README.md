# What

we are using turbo repo to hold both frontend and backend you can access
`turbo` cli or refer to doc for all list of features 


# Frontend 
#### installations
`yarn` or `npm i` inside `frontend` folder or on the root 

#### structure & instructions
resides inside apps/frontend, holds the following
1. redux/reducers redux/actions
2. hooks 
3. apps/add apps/edit apps/page apps/components 

you may start it using `npm run dev` or `yarn dev`
and test it using `yarn test`

PORT 3000
# Backend 

#### what
is using `nestjs` to avail `migrations` `database` `services` `swaggers` `tests` and more layers. you may use `nest` cli or refer to the docs
#### installation
`yarn` or `npm i` inside `backend` folder or on the root 

### structure & instructions 

1. tests 
2. src
3. src/database src/dto <-- user object, and database actions 
4. src/pipe <-- request middleware validations
5. src/users <-- controller
6. app.module.ts app.service.ts main.ts <-- primary to spawn and handle database and services

you may start it using `npm run dev` or `yarn dev`
and test it using `yarn test`

PORT 3001

#### Info 

backend is using sqlite3 memory database that is using DTO to spawn and validate
users/data on each process start, so we can easily test,debug,run our application, 


#### PS: 

since we are using `turbo`
you may run the pipeline command on root to run and trigger both apps in one go 
such as `yarn dev` in root would run on both `frontend` and `backend`
same goes for `test`