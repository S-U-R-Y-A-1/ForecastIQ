// metrics-parser.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetricsParserService {
  parsePrometheusText(metricsText: string): any[] {
    const results = [];
    const lines = metricsText.split('\n');

    for (const line of lines) {
      // Skip comments and empty lines
      if (line.startsWith('#') || line.trim() === '') continue;
      
      // Parse metric lines (format: "metric_name value")
      const match = line.match(/^([^\s]+)\s+([^\s]+)/);
      if (match) {
        results.push({
          name: match[1],
          value: parseFloat(match[2])
        });
      }
    }

    return results;
  }
}