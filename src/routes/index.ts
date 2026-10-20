import express from 'express';
import accessRouter from './access';
import { checkAuth, permission } from '../auth';

const router = express.Router();

// check api key
router.use(checkAuth);
// check permission
router.use(permission('0000'));

router.use('/api/v1', accessRouter);

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello world',
  });
});

export default router;
