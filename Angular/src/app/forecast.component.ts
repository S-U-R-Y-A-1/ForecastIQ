import { Component, OnInit } from '@angular/core';
import { ForecastService } from './forecast.service';
import { MetricsParserService } from './metrics-parser.service';

@Component({
  selector: 'app-forecast',
  template: `
    <div *ngIf="metrics">
      <h2>CPU Metrics</h2>
      <table class="metrics-table">
        <thead>
          <tr>
            <th>Metric Name</th>
            <th>Labels</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let metric of metrics">
            <td>{{ metric.name }}</td>
            <td>
              <span *ngFor="let label of getLabelKeys(metric.labels)">
                {{ label }}: {{ metric.labels[label] }}<br>
              </span>
            </td>
            <td>{{ metric.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .metrics-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .metrics-table th, .metrics-table td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
    }
    .metrics-table th {
      background-color: #f2f2f2;
    }
  `]
})
export class ForecastComponent implements OnInit {
  metrics: any[] = [];

  constructor(
    private forecastService: ForecastService,
    private metricsParser: MetricsParserService
  ) {}

  ngOnInit() {
    this.loadMetrics();
  }

  loadMetrics() {
    this.forecastService.getCpuMetrics().subscribe({
      next: (data) => {
        this.metrics = this.metricsParser.parsePrometheusText(data);
      },
      error: (err) => {
        console.error('Error loading metrics:', err);
      }
    });
  }

  getLabelKeys(labels: any): string[] {
    return Object.keys(labels);
  }
}