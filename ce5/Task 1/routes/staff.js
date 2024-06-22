import express from 'express';
import { Staff, all as allStaff, insertMany as insertStaff } from '../models/staff.js';

const router = express.Router();

/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req, res, _next) {
    const staff = new Staff(req.params.id, req.params.name, req.params.code);
    await insertStaff([staff]);
    res.send(staff);
});

/* GET staff listing. */
router.get('/all/', async function(_req, res, _next) {
    const staffs = await allStaff();
    res.send(staffs);
});

export default router;
