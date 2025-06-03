from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def get_cpu_usage():
    response = requests.get("http://localhost:9090/api/v1/query?query=process_cpu_seconds_total")

    print("Response from Prometheus:", response)
    return response.json()  # Return the JSON response from Prometheus