import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,  
  {
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },  
);

const models = {
  Animal: sequelize.import('./animals'),
  Grup: sequelize.import('./grups'),  
  Propietari: sequelize.import('./propietari'),  
  Propietari_Animal: sequelize.import('./propietari_animal'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;