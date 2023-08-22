/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
const {
  onDocumentWritten,
  onDocumentCreated,
} = require("firebase-functions/v2/firestore");
// const { getAuth } = require("firebase-admin/auth");

initializeApp();
// const auth = getAuth();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.getAllBoats = onRequest(async (request, response) => {
  logger.info("Get All Boats", { structuredData: true });
  const db = getFirestore();
  const snapshot = await db.collection("/boats").get();
  // owner: auth.currentUser.uid,
  response.json({
    msg: "Those are the Boats",
    boats: snapshot.docs.map((doc) => doc.data()),
  });
});

exports.addMessage = onRequest(async (request, response) => {
  logger.info("add message", { structuredData: true });
  const doc = await getFirestore().collection("/messages").add({
    original: request.body.message,
  });
  response.json({ msg: "Message added", id: doc.id });
});

exports.makeUppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  /**
   * @type {string}
   */
  const original = event.data.data().original;
  logger.log("Uppercasing", event.params.documentId, original);
  const uppercase = original.toUpperCase();
  return event.data.ref.set({ uppercase }, { merge: true });
});

exports.createBoat = onRequest(async (request, response) => {
  logger.info("Create Boat!", { structuredData: true });
  const db = getFirestore();
  const doc = await db.collection("/boats").add({
    name: request.body.name,
    length: request.body.length,
    color: request.body.color,
  });
  // owner: auth.currentUser.uid,
  response.json({ msg: "Boat created", id: doc.id });
});

// background functions

// functions.firestore.onDocumentCreated("/boats", () => {
//   console.log("a document was created");
// });
// functions.firestore.onDocumentWritten("/boats", () => {
//   console.log("a document was written");
// });

// functions.identity.beforeUserCreated(() => {
//   console.log("creating user");
// });

// functions.storage.onObjectFinalized(() => {
//   console.log("file uploaded");
// });
