import express from 'express';
import { Dept, all as allDept, insertMany as insertDept } from '../models/dept.js';
import { find as findStaff } from '../models/staff.js';

const router = express.Router();

/* GET insert new dept */
router.get('/add/:code', async function(req, res, _next) {
    const dept = new Dept(req.params.code);
    await insertDept([dept]);
    res.send(`${JSON.stringify(dept)}`);
});

/* GET dept listing. */
router.get('/all/', async function(_req, res, _next) {
    const depts = await allDept();
    res.json(depts);
});

/* GET dept listing with staff */
router.get('/all/withstaff/', async function(_req, res, _next) {
    const depts = await allDept();
    const result = depts.map(async dept => {
        const staffs = await findStaff({ dept: dept.code });
        return { code: dept.code, staffs };
    });
    res.send(result);
})

export default router;
