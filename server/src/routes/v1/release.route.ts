import express from 'express';
import { getReleases } from '../../controllers/release.controller';

const router = express.Router();

router.get('/', getReleases);

export default router;
