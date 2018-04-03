const pg = require("pg");
const settings = require("./settings"); //settings.json
const firstname = process.argv[2];

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.post,
  ssl       : settings.ssl,
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
    client.query('SELECT * FROM famous_people WHERE first_name = $1', [firstname], (err, res) => {
      if (err) {
        return console.error("error running query", err);
      } else {
        console.log('Searching...');
        console.log(`Found ${res.rowCount} person(s) by the name '${firstname}':`);
        let counter = 0;
        for (var person in res.rows) {
          const date = new Date(res.rows[person].birthdate);
          const year = date.getFullYear();
          let day = date.getDate();
          if (day < 10) {
            day = `0${day}`;
          }
          let month = date.getMonth() + 1;
          if (month < 10) {
            month = `0${month}`;
          }
          const first = res.rows[person].first_name;
          const last = res.rows[person].last_name;
          console.log(`- ${++counter}: ${first} ${last}, born '${year}-${month}-${day}'`);
        }
        client.end();

      }
    });
  }
});