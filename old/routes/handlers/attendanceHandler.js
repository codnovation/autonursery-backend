'use strict';

import Children from '../../models/children';

/**
 * @attendance
 * /list:
 *   get:
 *     summary: CRUD Operations for Attendance
 *     tags:
 *       - attendance
 */

let emptyresults = {
    breakfast: 'Empty',
    snackOne: 'Empty',
    lunch: 'Empty',
    snackTwo: 'Empty',
    nap: 'Empty',
    mood: 'Empty',
    participation: 'Empty',
    date: 'Empty',
    wc: 'Empty',
    attended: 'Yes'
};

export class AttendanceHandler {

    // get attendance by child (id) - expand agenda object
    getAttendanceByChild(req, res) {
        Children.findById(req.params.id).populate('agenda')
            .select('agenda')
            .then(agenda => {
                if (agenda.agenda.length === 0) {
                    res.json({
                        agenda: [{
                            breakfast: 'Empty',
                            snackOne: 'Empty',
                            lunch: 'Empty',
                            snackTwo: 'Empty',
                            nap: 'Empty',
                            mood: 'Empty',
                            participation: 'Empty',
                            date: 'Empty',
                            wc: 'Empty',
                            attendance: false
                        }]
                    });
                } else {
                    res.json(agenda);
                }
            })
            .catch(err => {
                res.status(404).json(err);
            });
    }
}
