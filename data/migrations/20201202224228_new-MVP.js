exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('pinned_destinations')
    .dropTableIfExists('events')
    .createTable('trips', (table) => {
      table.increments();
      table.string('user_id').references('profiles.id').notNullable();
      table.string('trip_name').notNullable();
      table.unique(['user_id', `trip_name`]);
      table.string('img_url');
    })
    .createTable('trip_items', (table) => {
      table.increments();
      table.string('user_id').references('profiles.id').notNullable();
      table.integer('trip_id').references('trips.id').notNullable();
      table.string('item_name').notNullable();
      table.unique(['user_id', `item_name`]);
      table.datetime('date');
      table.string('lat');
      table.string('lon');
      table.string('notes');
      table.string('img_url');
    });
};

exports.down = function (knex) {
  return knex.schema
    .createTable('events', function (table) {
      table.increments();
    })
    .createTable('pinned_destinations', function (table) {
      table.increments();
    })
    .dropTableIfExists('trips');
};
