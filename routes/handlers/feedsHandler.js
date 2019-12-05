import Event from '../../models/event';
import Children from '../../models/children';
import User from '../../models/user';

/**
 * @feeds
 * /list:
 *   get:
 *     summary: CRUD Operations for feeds
 *     tags:
 *       - feeds
 */

export class FeedsHandler {

  // get all
  async get(req, res) {
    let obj = {
      requests: [],
    };

    // await Children.find({ parents: req.params.id }).populate('Agenda').select('Agenda')
    // .then(results => {
    //   results.agenda.map(a => {
    //     obj.requests.push(a);
    //     return;
    //   })
    // });

    // get user with expanded messages
    await User.findById(req.params.id).populate('messages').select('messages').then(results => {
      results.messages.map(a => {
        a.title = "Message";
        obj.requests.push(a);
        return;
      })
    });

    // get requests of user
    await User.findById(req.params.id).populate('requests').select('requests')
    .then(results => {
      results.requests.map(a => {
      obj.requests.push(a);
      return;
      })
    });

    res.json(obj);
  }
}
