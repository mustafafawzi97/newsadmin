const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
admin.initializeApp();
// Automatically allow cross-origin requests
app.use(cors({
    origin: true
}));


exports.sendToTopic = functions.https.onRequest((request, response) => {
    const mtitle = request.body.title;
    const mcontent = request.body.content;

    const payload = {
        notification: {
            title: mtitle,
            body: mcontent
        }
    };
    fcm.sendToTopic('news', payload);
    response.send("Done");
});