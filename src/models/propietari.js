const propietari = (sequelize, DataTypes) => {
  const Propietari = sequelize.define('propietari', {
    nom: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Propietari.associate = models => {
    Propietari.belongsToMany( models.Animal, {
      through: models.Propietari_Animal
    });
  };  

  return Propietari;
};

export default propietari;