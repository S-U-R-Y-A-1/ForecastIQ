import pandas as pd
from prometheus_api_client import PrometheusConnect
from prophet import Prophet
import plotly

# Connect to Prometheus
prom = PrometheusConnect(url="http://localhost:9090")

# Fetch CPU metrics (last 24 hours)
cpu_data = prom.custom_query_range(
    query='100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)',
    start_time=pd.Timestamp.now() - pd.Timedelta(days=1),
    end_time=pd.Timestamp.now(),
    step=300  # 5-minute intervals
)

# Save to CSV
df = pd.DataFrame(cpu_data[0]['values'], columns=['timestamp', 'cpu'])
df.to_csv('cpu_metrics.csv', index=False)


# Load data
df = pd.read_csv('cpu_metrics.csv')
print(df.head())
df['ds'] = pd.to_datetime(df['timestamp'], unit='s')  # <-- KEY FIX
df['y'] = df['cpu']  # Prophet requires these column names
print(df.head())

# Train model
model = Prophet(daily_seasonality=True)
model.fit(df)

# Predict next 12 hours
future = model.make_future_dataframe(periods=12, freq='H')
forecast = model.predict(future)

# Save results
forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_csv('cpu_forecast.csv')

from prophet.plot import plot_plotly
plot_plotly(model, forecast).show()