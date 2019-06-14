import { Router } from 'express';
import models, { sequelize } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  const animals = await req.context.models.Animal.findAll({ include: [models.Grup], order:[['nom','ASC']] });
  return res.send(animals);
});

export default router;