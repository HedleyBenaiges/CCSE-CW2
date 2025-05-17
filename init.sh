#!/bin/bash
export curdir=$(pwd)

sudo cp securecartdb.sql /var/lib/postgresql
cd /var/lib/postgresql

sudo su - postgres -c "psql -U postgres -c 'CREATE DATABASE securecartdb'"
sudo su - postgres -c "psql -U postgres -d securecartdb -f securecartdb.sql"

cd $curdir
