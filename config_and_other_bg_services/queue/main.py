from rabbitmq import RabbitMQ
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
#from dotenv import load_dotenv

# Load environment variables from .env file
#load_dotenv()

# SMTP configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = 'shubhp2610@gmail.com'
SMTP_PASSWORD = 'wrsd mccy ogjn sppd'
SENDER_EMAIL = 'shubhp2610@gmail.com'

def send_email(recipient, subject, message):
    """Send an email using SMTP."""
    try:
        # Create a multipart message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = recipient
        msg['Subject'] = subject

        # Add message body
        msg.attach(MIMEText(message, 'plain'))

        # Connect to SMTP server
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            
        print(f"Email sent successfully to {recipient}")
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

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
        
        print(f"Received email request for: {recipient}")
        print(f"Subject: {subject}")
                    
    except Exception as e:
        print(f"Error processing message: {e}")
        

def main():
    rabbitmq = RabbitMQ()
    print("Starting to consume messages from EmailQueue...")
    rabbitmq.consume("EmailQueue", callback)

if __name__ == "__main__":
    main()

# How to run:
# 1. Create a .env file with your SMTP credentials
# 2. source ./env/bin/activate
# 3. python3 main.py

# from rabbitmq import RabbitMQ
# import json
# def callback(ch, method, properties, body):
#     string = body.decode('utf-8')
#     string = string.replace('{', '{"').replace('=', '": "').replace(', ', '", "').replace('}', '"}')
#     data = json.loads(string_representation)
#     print(f"Received {data['email']}")
#     print(f"Received {data['subject']}")
#     print(f"Received {data['message']}")


# rabbitmq = RabbitMQ()
# rabbitmq.consume("EmailQueue",callback)

# source ./env/bin/activate
# python3 main.py