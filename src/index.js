import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import uuidv4 from 'uuid/v4';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models
  };
  next();
});

app.use('/animals', routes.animals);
app.use('/grups', routes.grups);
app.use('/propietaris', routes.propietaris);
app.use('/propietaris_animals', routes.propietaris_animals);

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createGrupsWithAnimals();
    createPropietaris();
  }
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  });
});

const createPropietaris = async() => {
  await models.Propietari.create(
    {
      nom: 'Andrea'
    }  
  );
  await models.Propietari.create(
    {
      nom: 'Jose'
    }  
  );
  await models.Propietari.create(
    {
      nom: 'Pepe'
    }  
  );
  await models.Propietari.create(
    {
      nom: 'Luis'
    }  
  );
  await models.Propietari.create(
    {
      nom: 'Eva'
    }  
  );
}

const createGrupsWithAnimals = async () => {
  await models.Grup.create(
    {
      nom: 'Gat',
      animals: [
        { nom: 'Persa blau' },
        { nom: 'Scottish fold' }
      ]
    },
    {
      include: [models.Animal],
    },
  );
  await models.Grup.create(
    {
      nom: 'Gos',
      animals: [
        { nom: 'Pastor alemany' },
        { nom: 'Terrier' }
      ]
    },
    {
      include: [models.Animal],
    },
  );
  await models.Grup.create(
    {
      nom: 'Ocell',
      animals: [
        { nom: 'Periquito' },
        { nom: 'Pardal' },
        { nom: 'Oriol' }
      ]
    },
    {
      include: [models.Animal],
    },
  );
};