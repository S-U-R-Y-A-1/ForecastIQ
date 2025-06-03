import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrometheusService } from './prometheus.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cpuUsage: number = 0;

  constructor(private prometheusService: PrometheusService) {
    this.loadCPUData();
    setInterval(() => this.loadCPUData(), 5000);  // Refresh every 5 sec
  }

  loadCPUData() {
    this.prometheusService.getCPUUsage().subscribe((data: any) => {
      this.cpuUsage = data.result[0].value[1];  // Extract CPU value
      this.updateChart();
    });
  }

  chart: any;

updateChart() {
  if (!this.chart) {
    const ctx = document.getElementById('cpuChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Now'],
        datasets: [{
          label: 'CPU Usage %',
          data: [this.cpuUsage],
          borderColor: 'blue'
        }]
      }
    });
  } else {
    this.chart.data.labels.push(new Date().toLocaleTimeString());
    this.chart.data.datasets[0].data.push(this.cpuUsage);
    this.chart.update();
  }
}
}

