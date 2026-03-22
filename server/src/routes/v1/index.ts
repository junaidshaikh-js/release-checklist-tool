import express from 'express';
import releaseRoute from './release.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/releases',
    route: releaseRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
