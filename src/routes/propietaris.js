import { Router } from 'express';
import models, { sequelize } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  const propietaris = await req.context.models.Propietari.findAll({ order:[['nom','ASC']] });
  return res.send(propietaris);
});


export default router;