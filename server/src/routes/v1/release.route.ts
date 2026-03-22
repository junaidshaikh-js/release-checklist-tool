import express from 'express';
import { getReleases, createRelease, getReleaseById } from '../../controllers/release.controller';

const router = express.Router();

router.get('/', getReleases);
router.post('/', createRelease);
router.get('/:id', getReleaseById);

export default router;
