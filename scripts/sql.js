// Sets up the database for users

const sqlite3 = require("sqlite3");
const open = require("sqlite").open;

open({
  filename: "../users.db",
  driver: sqlite3.Database,
}).then((db) => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, ionId INTEGER, ionUsername TEXT, fullName TEXT, displayName TEXT, graduationYear INTEGER, verificationCode TEXT)"
  );
});
