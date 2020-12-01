
exports.up = function(knex) {
    return knex.schema
        .dropTableIfExists('flagged_destinations')
        .table('events', table => {
            table.boolean('flagged').defaultTo(false)
        })
        .table('pinned_destinations', table => {
            table.string('teleport_id')
        })
};

exports.down = function(knex) {
    return knex.schema
        .createTable('flagged_destinations', function (table) {
            table.increments();
            table.string('user').references('profiles.id').notNullable();
            table.string('destination_name').notNullable();
            table.unique(['user', `destination_name`]);
        })
        .table('events', table => {
            table.dropColumn('flagged')
        })
        .table('pinned_destinations', table => {
            table.dropColumn('teleport_id')
        })
};
