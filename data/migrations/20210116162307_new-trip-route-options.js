exports.up = function (knex) {
  return knex.schema.table('trip_items', (table) => {
    table.dropUnique(['user_id', `item_name`]);
  });
};

exports.down = function (knex) {
  return knex.schema.table('trip_items', (table) => {
    table.unique(['user_id', `item_name`]);
  });
};
