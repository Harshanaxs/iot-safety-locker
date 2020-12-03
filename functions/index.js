const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const users = db.collection('customers');




exports.addUserRole = functions.https.onCall((data, context) => {
    // get user and add admin custom claim
    return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
          user: true,
          branch:data.branch
        });
      })
      .then(() => {
        return {
          message: `Success! ${data.email} has been made as a User in ${data.branch} Branch.`,
        };
      })
      .catch((err) => {
        return err;
      });
  });


  exports.listnDB = functions.database.ref('/requests/{reqId}/data/{dataId}')
    .onCreate(async (change,context) => {
        console.log(context.params);
        // validate request
        const user =  await users.where("lockerId","==",change.params.lockerId)
                        .get()
                        .then(querySnapshot => querySnapshot.forEach(doc => doc.data()));

                        console.log(user + "This is User");
        
        if(user["fingerprintId"] !== change.params.fingerprintId || user["lockerId"] !== change.params.lockerId){
            console.log("validation faild!" + user["email"]);
            return ;
        }

        // generate randon 4 digits OTP
        function randomDigits(){
            return shuffle( "0123456789".split('') ).join('').substring(0,4);
        }
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
                    
        const msg = {
            subject: 'Safety-locker OTP',
            html:`Hello<br/> Below is your One Time Passcode : ${randomDigits()}`
        }

        const email = user["email"];
        return db.collection("mail").add({
            to:email,
            message:msg
        }).then(() => console.log("Queued email for delivery!"))
        .catch(err => console.log("Error : " + err));
    })

  