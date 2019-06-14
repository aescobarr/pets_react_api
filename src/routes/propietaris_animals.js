import { Router } from 'express';
import models, { sequelize } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  const propietaris_animals = await req.context.models.Propietari_Animal.findAll({ include:[models.Animal,models.Propietari],order:[['id','DESC']] });
  return res.send(propietaris_animals);
});

router.delete('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);
  req.context.models.Propietari_Animal.destroy({ where: { id: Number.parseInt(req.params.id) } }).then( async () => {
    const propietaris_animals = await req.context.models.Propietari_Animal.findAll({ include:[models.Animal,models.Propietari],order:[['id','DESC']] });
    return res.send(propietaris_animals);
  });
});

router.post('/', async (req, res) => {
  const id_propietari = req.body.propietari;
  const id_animal = req.body.animal;  
  req.context.models.Propietari.findOne({ include: [models.Animal], where: { id: id_propietari} }).then( propietari => { 
    if(!propietari){
      return res.status(404).send('Not found');
    }
    var animals = [];
    for(var i = 0; i < propietari.animals.length; i++){
      animals.push(propietari.animals[i].id);
    }
    animals.push(id_animal);
    propietari.setAnimals(animals).then( async result => { 
      const propietaris_animals = await req.context.models.Propietari_Animal.findAll({ include:[models.Animal,models.Propietari],order:[['id','DESC']] });
      return res.send(propietaris_animals);
    });
  });
});

export default router;