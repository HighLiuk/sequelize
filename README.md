# Sequelize Tutorial (MySQL)

YouTube link: https://www.youtube.com/watch?v=3qlnR9hK-lQ

## Setup

1. Run the following:

```bash
# Install the Sequelize CLI globally:
npm i -g sequelize-cli

# Start a Node Project
npm init
npm i --save sequelize mysql2

# Initialize Sequelize
sequelize init
```

2. In `config/config.json`, enter the data to connect to the database

3. Create the Database by running:

```bash
sequelize db:create
```

4. Create your first model with migration:

```bash
sequelize model:create --name User --attributes name:string,email:string,role:string
```

## Migrations

To run a migration, type:

```bash
sequelize db:migrate
```

To view the status of the migrations, type:

```bash
sequelize db:migrate:status
```

To rollback a batch of migrations, type:

```bash
sequelize db:migrate:undo
```
