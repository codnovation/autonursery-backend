import RequestSchema from '../../models/requests';

// import serverKey from '../../serverKey';

/**
 * @request
 * /list:
 *   get:
 *     summary: CRUD Operations for request
 *     tags:
 *       - request
 */

export class RequestHandler {

    // get all
    get(req, res) {
        RequestSchema.find({}).then(results => {
            res.json(results);
        });
    }

    // add request
    add(req, res) {
        RequestSchema.create({
            status: req.body.status,
            priority: req.body.priority,
            title: req.body.title,
            description: req.body.description,
            due: req.body.due,
        }).then(request => {
            res.json(request);
        }).catch(err => {
            res.send(err);
        });
    }

    // update request by id
    update(req, res) {
        RequestSchema.findByIdAndUpdate(req.params.id, {
            status: req.body.status,
            priority: req.body.priority,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            rcvr: req.body.rcvr
        }).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // delete by id
    deleteById(req, res) {
        RequestSchema.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.status(400).json(err);
            });
    }

    // update(req, res) {
    //   RequestSchema.findByIdAndUpdate(req.params.id, req.body).then(result => {
    //     res.json(result);
    //   })
    //   .catch(err => {
    //     res.json(err);
    //   });
    // }
}

// import FCM from 'fcm-node';
//
// const fcm = new FCM(serverKey);


// let message = {
//         to: 'registration_token',
//         collapse_key: 'your_collapse_key',
//
//         notification: {
//             title: 'Title of your push notification',
//             body: 'Body of your push notification'
//         },
//
//         data: {
//             my_key: 'my value',
//             my_another_key: 'my another value'
//         }
//     }
//
// fcm.send(message, (err, response) => {
//   if (err) {
//     console.log('Something has gone wrong!')
//   } else {
//     console.log('Successfully sent with response: ', response)
//   }
// });
