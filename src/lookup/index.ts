import express from 'express';
import * as firebase from 'firebase/app';
const router = express.Router();
import 'firebase/firestore';


// Main message send route.
router.post('/', async (req: express.Request, res: express.Response) => {
    const body = req.body;

    const id: string = body.id;

    if (!id) {
        console.error('id not found');
        res.status(400).send('ID not found');
        return;
    }

    const database = firebase.firestore();

    database.collection('/applications').doc(id).get().then(snapshot => {
        if (snapshot.exists) {
            res.send(snapshot.data());
        }
        else {
            console.error('Application not found');
            res.status(404).send('Application not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Server Error');
    });
});

module.exports = router;
