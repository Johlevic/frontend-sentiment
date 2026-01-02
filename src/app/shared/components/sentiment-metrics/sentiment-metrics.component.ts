import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sentiment-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sentiment-metrics.component.html',
  styleUrl: './sentiment-metrics.component.css'
})
export class SentimentMetricsComponent {

   metrics = {
    positive: 65,
    neutral: 20,
    negative: 15,
    total: 120
  };

}
