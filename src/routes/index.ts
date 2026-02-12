import express from 'express';
import accessRouter from './access';

const router = express.Router();

router.use('/api/v1', accessRouter);

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello world',
  });
});

export default router;
