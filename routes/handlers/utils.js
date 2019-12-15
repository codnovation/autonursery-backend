'use strict';
import moment from "moment";
import models from "../../models";

let Utils = {
    capitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    },

    convertDate(date) {
        return moment(date).format('LL');
    },

    convertTime(time) {
        return moment(time).format('LLL');
    },

    async checkIfExist(model, id) {
        return models[model].exists({_id: id});
    }
};

module.exports = Utils;