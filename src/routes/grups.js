import { Router } from 'express';
import models, { sequelize } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  const grups = await req.context.models.Grup.findAll({ include: [models.Animal] });
  return res.send(grups);
});

export default router;