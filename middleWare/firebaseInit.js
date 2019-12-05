import FCM from 'fcm-node';

var serverKey = require('./firebase-adminSDK.json');

var fcm = new FCM(serverKey);


let message = {
    to: 'registration_token',
    collapse_key: 'your_collapse_key',

    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    },

    data: {
        my_key: 'my value',
        my_another_key: 'my another value'
    }
}

fcm.send(message, (err, response) => {
    if (err) {
        console.log('Something has gone wrong!')
    } else {
        console.log('Successfully sent with response: ', response)
    }
})

//NOT Currently USED 
