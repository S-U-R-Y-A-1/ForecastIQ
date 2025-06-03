from flask import Flask
from prometheus_client import Gauge, start_http_server, Counter
import logging
import os
import shutil

app = Flask(__name__)

# Define Prometheus metrics globally
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP Requests')
CPU_USAGE = Gauge('cpu_usage_percent', 'Estimated CPU Usage (%)')
MEMORY_USAGE = Gauge('memory_usage_percent', 'Estimated RAM Usage (%)')

def get_cpu_usage():
    """ Placeholder: returns 0 (you can hook in uptime /proc/stat if needed) """
    return 0.0  # Without psutil, real CPU percent is tricky to get

def get_memory_usage():
    """ Returns percentage of memory used using shutil """
    total, used, free = shutil.disk_usage("/")
    # Note: This is disk usage, not RAM. Real RAM % needs psutil or /proc/meminfo
    return (used / total) * 100

@app.route('/health')
def health():
    return "OK", 200

@app.route("/metrics")
def metrics():
    REQUEST_COUNT.inc()
    CPU_USAGE.set(get_cpu_usage())
    MEMORY_USAGE.set(get_memory_usage())
    return "Metrics updated!"

@app.route('/')
def hello():
    REQUEST_COUNT.inc()
    return "Hello World!"

if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

    logging.info("Starting metrics server on port 8000")
    start_http_server(8000)

    logging.info("Starting Flask app on port 5000")
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
