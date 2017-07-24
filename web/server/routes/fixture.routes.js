import { Router } from 'express';
import * as FixtureController from '../controllers/fixture.controller';
const router = new Router();

// Get all Fixtures
router.route('/fixtures/upcoming').get(FixtureController.getUpcomingFixtures);
router.route('/fixtures/all').get(FixtureController.getFixtures);

// Get one fixture by id
router.route('/fixture/:id').get(FixtureController.getFixture);

export default router;
