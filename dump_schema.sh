#!/bin/bash

# Check if OLD_DB_URL is set
if [ -z "$OLD_DB_URL" ]; then
    echo "Error: OLD_DB_URL environment variable is not set."
    echo "Please set OLD_DB_URL before running this script."
    echo "The URL can be found in the Supbase dashboard under:"
    echo "Project Settings / Database / Connection String / URI / Display connection pooler: YES, Mode: Session"
    exit 1
fi

# Execute the Supabase db dump command
mkdir -p ./data
supabase db dump --db-url "$OLD_DB_URL" -f ./data/schema.sql --schema public

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "Database schema dump completed successfully."
    echo "Output was sent to ./data/schema.sql"
else
    echo "Error: Database schema dump failed."
fi
