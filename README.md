# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```
### Users list from seeders
When you run all seeders you'll create **20 Users**. **10 AdminUsers** and **10 StandardUsers**.

There are **2 types** of **emails** for users:
1)**'admin@test1.com'**
2)**'user@test1.com'**
*note that the number at the end of the email is the one that will increase up to 10 when create all the users*

The **Password** will be the same for all the **Users**:
- '1234'

Remember that to **Login** you will only need the **email** and **password**.