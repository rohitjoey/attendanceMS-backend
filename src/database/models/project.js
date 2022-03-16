const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate({ User, Project_User }) {
      this.belongsToMany(User, {
        through: Project_User,
        foreignKey: "project_id",
      });
      // Movie.belongsToMany(Actor, { through: 'ActorMovies' });
    }
  }

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      submission_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      project_lead: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    { sequelize, timestamps: false, tableName: "project", modelName: "Project" }
  );
  return Project;
};
