import {
  SQSClient,
  SendMessageCommand,
  SendMessageBatchCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  DeleteMessageBatchCommand,
} from "@aws-sdk/client-sqs";
import winston from "winston";
import retry from "async-retry";

import { generateUUIDv4 } from "@/lib/utils/generateUUID";

// Initialize SQS client
const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Initialize logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Helper to check if queue is FIFO
const isFIFOQueue = (queueUrl) => queueUrl.endsWith(".fifo");

// Push message to SQS (supports both FIFO and Standard queues)
export const pushToSQS = async ({
  queueUrl,
  messageBody,
  messageGroupId,
  messageDeduplicationId,
  messageAttributes,
}) => {
  if (!queueUrl || !messageBody) {
    throw new Error("Missing required parameters: queueUrl or messageBody");
  }

  const isFIFO = isFIFOQueue(queueUrl);

  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messageBody),
    MessageAttributes: messageAttributes || {},
    ...(isFIFO && {
      MessageGroupId: messageGroupId || generateUUIDv4(),
      MessageDeduplicationId: messageDeduplicationId || generateUUIDv4(),
    }),
  };

  return retry(
    async () => {
      try {
        const command = new SendMessageCommand(params);
        await sqsClient.send(command);
        logger.info("Message pushed to SQS successfully", { params });
      } catch (error) {
        logger.error("Error pushing message to SQS", { error });
        throw new Error("Error pushing message to SQS");
      }
    },
    {
      retries: 3,
      minTimeout: 1000,
      maxTimeout: 5000,
    },
  );
};

// Push batch of messages to SQS
export const pushBatchToSQS = async ({ queueUrl, messages }) => {
  if (!queueUrl || !messages || messages.length === 0) {
    throw new Error("Missing required parameters: queueUrl or messages");
  }

  const params = {
    QueueUrl: queueUrl,
    Entries: messages.map((msg, index) => ({
      Id: index.toString(),
      MessageBody: JSON.stringify(msg.body),
      MessageGroupId: msg.messageGroupId || generateUUIDv4(),
      MessageDeduplicationId: msg.messageDeduplicationId || generateUUIDv4(),
    })),
  };

  try {
    const command = new SendMessageBatchCommand(params);
    await sqsClient.send(command);
    logger.info("Batch messages pushed to SQS successfully", { params });
  } catch (error) {
    logger.error("Error pushing batch messages to SQS", { error });
    throw new Error("Error pushing batch messages to SQS");
  }
};

// Fetch messages from SQS
export const fetchFromSQS = async ({
  queueUrl,
  maxNumberOfMessages = 1,
  visibilityTimeout = 180,
  waitTimeSeconds = 0,
}) => {
  if (!queueUrl) {
    throw new Error("Missing required parameter: queueUrl");
  }

  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxNumberOfMessages,
      VisibilityTimeout: visibilityTimeout,
      WaitTimeSeconds: waitTimeSeconds,
    };

    const command = new ReceiveMessageCommand(params);
    const data = await sqsClient.send(command);

    logger.info("Messages fetched from SQS successfully", { data });
    return data.Messages || [];
  } catch (error) {
    logger.error("Error fetching messages from SQS", { error });
    throw new Error("Error fetching messages from SQS");
  }
};

// Fetch batch of messages from SQS
export const fetchBatchFromSQS = async ({
  queueUrl,
  maxNumberOfMessages = 10,
}) => {
  return fetchFromSQS({ queueUrl, maxNumberOfMessages });
};

// Delete message from SQS
export const deleteFromSQS = async ({ queueUrl, receiptHandle }) => {
  if (!queueUrl || !receiptHandle) {
    throw new Error("Missing required parameters: queueUrl or receiptHandle");
  }

  try {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };

    const command = new DeleteMessageCommand(params);
    await sqsClient.send(command);

    logger.info("Message deleted from SQS successfully", { params });
  } catch (error) {
    logger.error("Error deleting message from SQS", { error });
    throw new Error("Error deleting message from SQS");
  }
};

// Delete batch of messages from SQS
export const deleteBatchFromSQS = async ({ queueUrl, receiptHandles }) => {
  if (!queueUrl || !receiptHandles || receiptHandles.length === 0) {
    throw new Error("Missing required parameters: queueUrl or receiptHandles");
  }

  try {
    const params = {
      QueueUrl: queueUrl,
      Entries: receiptHandles.map((receiptHandle, index) => ({
        Id: index.toString(),
        ReceiptHandle: receiptHandle,
      })),
    };

    const command = new DeleteMessageBatchCommand(params);
    await sqsClient.send(command);

    logger.info("Batch messages deleted from SQS successfully", { params });
  } catch (error) {
    logger.error("Error deleting batch messages from SQS", { error });
    throw new Error("Error deleting batch messages from SQS");
  }
};

// Fetch messages from dead-letter queue (DLQ)
export const fetchFromDLQ = async ({
  deadLetterQueueUrl,
  maxNumberOfMessages = 1,
}) => {
  return fetchFromSQS({ queueUrl: deadLetterQueueUrl, maxNumberOfMessages });
};
