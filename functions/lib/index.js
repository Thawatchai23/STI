"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.json({
        message: 'Hello from Firebase Cloud Functions!',
        timestamp: new Date().toISOString()
    });
});
//# sourceMappingURL=index.js.map