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

## first Create User
  open terminal
```
 su - postgres
 CREATE user user1 with password '12345';

```

## you need to create 2 databases
```
CREATE database store owner user1;
CREATE database store_test owner user1;

```
## migration
the migratoin should start automatically whe you run the start command
### if it didn't, run the command
db-migrate up
![ERD](Online_Store_ERD.jpg)

# create ENV file  with variables:
```
DB_HOST=localhost
DB_USER=user1
DB_PASS=12345
DB_NAME=store
DB_TEST_NAME=store_test
DB_PORT=5432
NODE_ENV=dev
BCRYPT_PASSWORD=my_Online-Store
SALT_ROUNDS=10
TOKEN_SECRET=shhhhthisissecretToken

```
> BCRYPT_PASSWORD is the pepper, you can change it to any value
>TOKEN_SECRET is random string used to sign and verivy tokens


*************
## packeges
```
"@types/bcrypt": "^5.0.0",
"@types/body-parser": "^1.19.2",
"@types/joi": "^17.2.3",
"@types/jsonwebtoken": "^8.5.8",
"@types/node-cache": "^4.2.5",
"@types/request": "^2.48.8",
"bcrypt": "^5.0.1",
"cors": "^2.8.5",
"db-migrate-pg": "^1.2.2",
"dotenv": "^14.3.2",
"eslint-plugin-jasmine": "^4.1.3",
"express": "^4.17.2",
"joi": "^17.6.0",
"jsonwebtoken": "^8.5.1",
"node-cache": "^5.1.2",
"pg": "^8.7.1",
"request": "^2.88.2",
"ts-watch": "^1.0.8"
```
