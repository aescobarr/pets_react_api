const animal = (sequelize, DataTypes) => {
  const Animal = sequelize.define('animal', {
    nom: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Animal.associate = models => {
    Animal.belongsTo(models.Grup);
    Animal.belongsToMany( models.Propietari, {            
      through: models.Propietari_Animal
    });
  };

  return Animal;
};

export default animal;