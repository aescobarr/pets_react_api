const grup = (sequelize, DataTypes) => {
  const Grup = sequelize.define('grup', {
    nom: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Grup.associate = models => {
    Grup.hasMany(models.Animal, { onDelete: 'CASCADE' });
  };

  return Grup;
};

export default grup;