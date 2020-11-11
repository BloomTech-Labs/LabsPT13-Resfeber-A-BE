exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable('pinned_destinations', function (table) {
      table.increments();
      table.string('user').references("profiles.id").notNullable();
      table.string('destination_name').notNullable()
    })
    .createTable('flagged_destinations', function (table) {
      table.increments();
      table.string('user').references("profiles.id").notNullable();
      table.string('destination_name').notNullable()
    })
    .createTable('events', function (table) {
      table.increments();
      table.string('user').references("profiles.id").notNullable();
      table.string('event_name').notNullable()
      table.datetime('date')
      table.string("notes")
    })
};

exports.down = (knex) => {
  return knex.schema
  .dropTableIfExists('pinned_destinations')
  .dropTableIfExists('flagged_destinations')
  .dropTableIfExists('events')
  .dropTableIfExists('profiles');
};
