const propietari_animal = (sequelize, DataTypes) => {
  const Propietari_Animal = sequelize.define('propietari_animal', { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  Propietari_Animal.associate = models => {
    Propietari_Animal.belongsTo( models.Animal );
    Propietari_Animal.belongsTo( models.Propietari );
  };  

  return Propietari_Animal;
};

export default propietari_animal;