# Setup
---

### Setup Database

Before running, there must be a postgresql service running
(The database uses postgresql 15)

The bash script `init.sh` should create and restore the database from the dump file `securecartdb.sql`, assuming that postgres is already installed

If the script does not work, try importing the database manually from `securecartdb.sql`.
If the database can not be imported, creating a new one called `securecartdb` should work, althouh this will not contain an admin user.
To create an admin user: register a normal user on the site, and then update the privilege to '1' using postgres.

### Start Server and Client

The server can be run using the command `npm run dev` from the `/server` folder
- If the server does not run, you may need to change the password for the postgres user to `postgres` using the command:
- `sudo su - postgres -c "psql -U postgres -c \"ALTER USER postgres WITH PASSWORD 'postgres'\""`

The client can be run using the command `npm start` from the `/client` folder

# Admin Account
---

The admin account has the email: `admin@admin` and password: `admin`
All other accounts can be created in the registration page
