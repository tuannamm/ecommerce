import express from 'express';
import { AccessController } from '../../controllers';

const router = express.Router();

router.post('/shop/signup', AccessController.signup);

export default router;
