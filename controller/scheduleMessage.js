const { ConversationModel,MessageModel } = require('../models/ConversationModel')

const cron = require('node-cron');

// Array to store scheduled messages (optional: replace with database for persistence)
const scheduledMessages = [];

const scheduleMessage = (req, res) => {
  const { sender, receiver, message, scheduleTime, importance } = req.body;

  // Validate input
  if (!sender || !receiver || !message || !scheduleTime) {
    return res.status(400).json({ error: 'Sender, receiver, message, and scheduleTime are required.' });
  }

  const scheduledDate = new Date(scheduleTime);
  if (isNaN(scheduledDate.getTime())) {
    return res.status(400).json({ error: 'Invalid schedule time format.' });
  }

  // Schedule the message
  cron.schedule(
    `${scheduledDate.getSeconds()} ${scheduledDate.getMinutes()} ${scheduledDate.getHours()} ${scheduledDate.getDate()} ${scheduledDate.getMonth() + 1} *`,
    async () => {
      try {
        // Check if the conversation exists
        let conversation = await ConversationModel.findOne({
          $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender }
          ]
        });

        // If no conversation exists, create a new one
        if (!conversation) {
          const newConversation = new ConversationModel({
            sender: sender,
            receiver: receiver
          });
          conversation = await newConversation.save();
        }

        // Create a new message
        const newMessage = new MessageModel({
          text:message,
          importance,
          msgByUserId: sender,
        });
        const savedMessage = await newMessage.save();

        // Add the message to the conversation
        await ConversationModel.updateOne(
          { _id: conversation._id },
          { $push: { messages: savedMessage._id } }
        );

        console.log(`Scheduled message sent: ${message}`);
      } catch (error) {
        console.error('Error while scheduling message:', error);
      }
    },
    { timezone: 'Asia/Kolkata' } // Set the timezone to IST
  );

  return res.status(200).json({ message: 'Message scheduled successfully!' });
};

module.exports = scheduleMessage;
