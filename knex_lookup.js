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


knex.select().from('famous_people')
.where('first_name', '=', firstname)
.asCallback(function(err, rows) {
  console.log('Searching...');
  if (err) return console.error("Error running query", err);
  console.log(`Found ${rows.length} person(s) by the name '${firstname}':`);
  let counter = 0;
  for (var person in rows) {
    const first = rows[person].first_name;
    const last = rows[person].last_name;
    const birthdate = rows[person].birthdate.toISOString().slice(0,10);
    console.log(`- ${++counter}: ${first} ${last}, born '${birthdate}'`);
  }
  return knex.destroy();
});

