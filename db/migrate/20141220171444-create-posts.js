'use strict';
module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      tags: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      fileName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      file: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('Posts').done(done);
  }
};
