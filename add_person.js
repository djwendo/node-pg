const settings = require("./settings"); //settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user      : settings.user,
    password  : settings.password,
    database  : settings.database,
    host      : settings.hostname,
    port      : settings.post,
    ssl       : settings.ssl
  }
});
const firstname = process.argv[2];
const lastname = process.argv[3];
const date = process.argv[4];

knex('famous_people').insert({first_name: firstname, last_name: lastname, birthdate: date}).returning('*')
.asCallback((err, insertResults) => {
  console.log('Adding...')
  if (err) return console.error("Error running query", err);
  console.log(`Added ${firstname} ${lastname} to database`);
  return knex.destroy();
});

