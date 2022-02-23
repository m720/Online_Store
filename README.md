# Online Store
 Online Store with node and typescript.

# build script
  npm run build

# run eslint
  npm run lint

# run prettier
  npm run prettier

# build and test script
 npm run test

# run project
 node ./build

# start project
 npm run start

# run port
http://localhost:3000

# database
## you need to create 2 databases
store
store_test
## migration
the migratoin should start automatically whe you run the start command
### if it didn't, run the command
db-migrate up
![ERD](Online_Store_ERD.jpg)

# create ENV file  with variables:
```
DB_HOST
DB_USER
DB_PASS
DB_NAME
DB_TEST_NAME
DB_PORT
NODE_ENV
BCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SECRET
```
> NODE_ENV should be dev
