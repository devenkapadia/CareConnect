import logging
import json
from logstash import TCPLogstashHandler
import os
from config import *
# Create logger
logger = logging.getLogger('app_logstash')
logger.setLevel(logging.INFO)

# Custom JSON formatter
class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            'timestamp': self.formatTime(record, '%Y-%m-%d %H:%M:%S'),
            'level': record.levelname,
            'message': record.msg,
            'service_name': 'email-service'  
        }
        return json.dumps(log_data).encode('utf-8')  

# Set up TCPLogstashHandler
logstash_handler = TCPLogstashHandler(
    host=LOGSTASH_HOST,#'172.17.0.1',
    port=LOGSTASH_PORT,
    message_type='logstash'  # Default type, compatible with JSON codec
)
logstash_formatter = JsonFormatter()
logstash_handler.setFormatter(logstash_formatter)

# Add handler to logger
logger.addHandler(logstash_handler)
