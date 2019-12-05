import FoodMenu from '../../models/foodMenu';
import Food from '../../models/food';

/**
 * @foodmenu
 * /list:
 *   get:
 *     summary: CRUD Operations for foodmenu
 *     tags:
 *       - foodmenu
 */

const options = {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric'
}

function getDate(day, month, year) {
    console.log(new Date(Date.UTC(year, month - 1, day, 0, 0, 0)));
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}

export class FoodMenuHandler {

    // get all
    get(req, res) {
        FoodMenu.find({}).populate('food').then(results => {
            res.json(results);
        });
    }

    // get one food menu by id
    getOne(req, res) {
        FoodMenu.findById(req.params.id).populate('food').then(results => {
            console.log(results);
            res.json(
                {
                    food: results.food,
                    day: getDate(results.day),
                });
        })
            .catch(err => {
                res.send(err);
            });
    }

    // get food menu at a selected date
    getOneByDate(req, res) {
        let d = new Date(req.params.date);
        FoodMenu.findOne({day: getDate(d.getDate(), d.getMonth() + 1, d.getFullYear())})
            .populate('food')
            .then(results => {
                if (!results) {
                    res.json({
                        "food": [],
                        "_id": null,
                        "day": req.params.date
                    });
                }
                res.json(results);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }

    // add food menu by date
    add(req, res) {
        let d = new Date(req.body.day);
        FoodMenu.create({
            day: getDate(d.getDate(), d.getMonth() + 1, d.getFullYear()),
            food: req.body.food
        }).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }

    // update food menu by date
    update(req, res) {
        let d = new Date(req.body.day);
        FoodMenu.findByIdAndRemove(req.params.id).then(() => {
            FoodMenu.create({
                day: getDate(d.getDate(), d.getMonth() + 1, d.getFullYear()),
                food: req.body.food
            }).then(result => {
                res.json(result);
            }).catch(err => {
                res.json(err);
            });
        }).catch(err => {
            res.json(err);
        });
    }

    // get food into food menu
    getFood(req, res) {
        FoodMenu.findById(req.params.id).populate('food').select('food').then(results => {
            res.json(results);
        });
    }

    // get Food into food menu by id
    addFoodMenuFood(req, res) {
        FoodMenu.findById(req.params.id).then(foodmenu => {
            Food.create({
                name: req.body.name,
            }).then(foodie => {
                foodmenu.food.push(foodie._id);
                foodmenu.save((err, updateFoodMenu) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        FoodMenu.populate(updateFoodMenu, {path: 'food'}).then(some => {
                            res.json(some);
                        });
                    }
                });
            });
        });
    }

    // delete food menu by id
    deleteById(req, res) {
        FoodMenu.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }
}
