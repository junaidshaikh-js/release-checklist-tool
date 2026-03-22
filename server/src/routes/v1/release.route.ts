import express from 'express';
import { getReleases, createRelease } from '../../controllers/release.controller';

const router = express.Router();

router.get('/', getReleases);
router.post('/', createRelease);

export default router;
