import { db } from '../Config/db';

export default {

    registerToken: (notification_token) => {
        tokenRef = db.ref('tokens/' + notification_token);
        tokenRef
            .set({
                notification_token: notification_token,
                time: new Date(Date.now()).toLocaleString(),
            });
    },

};
