import { Expo } from "expo-server-sdk";
import * as mongoUtils from "../utils/mongo.utils";

// Create a new Expo SDK client
let expo = new Expo();

export async function pushNotificationService(message) {
  const response = await mongoUtils.find("expo-push-tokens");
  const somePushTokens = response.map(token => token.pushToken);

  let messages = [];
  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: message.sound || "default",
      body: message.body,
      data: message.data || {}
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  })();

  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const receiptId in receipts) {
          const { status, message, details } = receipts[receiptId];
          if (status === "ok") {
            console.log("receipts are fine");
            continue;
          } else if (status === "error") {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  })();
}
