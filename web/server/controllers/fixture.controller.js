import Fixture from '../models/fixture';

export function getFixtures(req, res) {
    Fixture.find().sort('-startTime').exec((err, fixtures) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ fixtures });
    });
}

export function getUpcomingFixtures(req, res) {
    Fixture.find({
        'startTime': {
            '$gte': new Date()
        }
    }, 'name startTime category subCategory eventId displayed suspended markets').sort('-startTime').exec((err, fixtures) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ fixtures });
    });
}

export function getFixture(req, res) {
    Fixture.findOne({ eventId: req.params.id }).exec((err, fixture) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ fixture });
    });
}