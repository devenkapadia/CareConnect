from rabbitmq import RabbitMQ
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from logging_service import logger
import os
from config import *
print(SMTP_SERVER)
print(SMTP_PORT)
print(SMTP_USERNAME)
print(SMTP_PASSWORD)
print(SENDER_EMAIL)
print(RABBITMQ_USERNAME)
print(RABBITMQ_PASSWORD)
print(RABBITMQ_HOST)
print(RABBITMQ_PORT)
print(LOGSTASH_HOST)
print(LOGSTASH_PORT)
class EmailSender:
    def __init__(self):
        self.server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        self.server.login(SMTP_USERNAME, SMTP_PASSWORD)

    def send_email(self, recipient, subject, message):
        """Send an email using a persistent SMTP connection."""
        try:
            # Create a multipart message
            msg = MIMEMultipart()
            msg['From'] = SENDER_EMAIL
            msg['To'] = recipient
            msg['Subject'] = subject
            msg.attach(MIMEText(message, 'plain'))
            print(f"Sending to {recipient}")
            self.server.send_message(msg)
            logger.info(f"Email sent successfully to {recipient}, subject: {subject}, message: {message}")
            print(f"Email sent successfully to {recipient}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {recipient}: {e}")
            return False

    def close(self):
        self.server.quit()

# Global email sender
email_sender = EmailSender()

def callback(ch, method, properties, body):
    try:
        # Decode and parse the message
        string = body.decode('utf-8')
        string = string.replace('{', '{"').replace('=', '": "').replace(', ', '", "').replace('}', '"}')
        data = json.loads(string)
        
        # Extract email information
        recipient = data['email']
        subject = data['subject']
        message = data['message']
        print(f"Received email request: {recipient}, {subject}, {message}")    
        success = email_sender.send_email(recipient, subject, message)
    
        #if success:
        #    ch.basic_ack(delivery_tag=method.delivery_tag)
        #else:
        #    ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

        logger.info(f"Received email request: {recipient}, {subject}, {message}")
                    
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        #ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

def main():
    rabbitmq = RabbitMQ()
    print("Starting to consume messages from EmailQueue...")
    logger.info("Starting to consume messages from EmailQueue...")
    try:
        rabbitmq.consume("EmailQueue", callback)
    finally:
        print("Closing RabbitMQ connection...")
        logger.info("Closing RabbitMQ connection...")
        email_sender.close()

if __name__ == "__main__":
    main()