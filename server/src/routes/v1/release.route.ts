import express from 'express';
import { getReleases, createRelease, getReleaseById, updateRelease } from '../../controllers/release.controller.js';

const router = express.Router();

router.get('/', getReleases);
router.post('/', createRelease);
router.get('/:id', getReleaseById);
router.patch('/:id', updateRelease);

export default router;
