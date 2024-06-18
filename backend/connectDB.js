const sqlite3 = require('sqlite3').verbose();

const connectDB = () => {

    const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if(err) {
            console.log(err.message);
        }
        else {
            console.log("Connected to the database");

            db.run("CREATE TABLE IF NOT EXISTS MEMBERS ( \
                    MEMBER_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
                    MEMBER_FIRST_NAME NVARCHAR(30), \
                    MEMBER_LAST_NAME NVARCHAR(30), \
                    MEMBER_BIRTHDATE DATE, \
                    MEMBER_COUNTRY NVARCHAR(30), \
                    MEMBER_CITY NVARCHAR(50))");
        }
    });
}

module.exports = connectDB;

