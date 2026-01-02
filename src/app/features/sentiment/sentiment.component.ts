import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SentimentService } from '../../core/services/sentiment.service';
import { SentimentResponse } from '../../core/models/sentiment-response';
import { MockCarouselComponent } from "../../shared/components/mock-carousel/mock-carousel.component";
import { SentimentMetricsComponent } from "../../shared/components/sentiment-metrics/sentiment-metrics.component";
import { SentimentFormComponent } from "./components/sentiment-form/sentiment-form.component";
import { SentimentResultComponent } from "./components/sentiment-result/sentiment-result.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-sentiment',
  standalone: true,
  imports: [CommonModule, FormsModule, MockCarouselComponent, SentimentMetricsComponent, SentimentFormComponent, SentimentResultComponent, HeaderComponent, FooterComponent],
  templateUrl: './sentiment.component.html',
  styleUrl: './sentiment.component.css'
})
export class SentimentComponent {

 text = '';
  result?: SentimentResponse;

  @ViewChild(SentimentFormComponent)
  formComponent!: SentimentFormComponent;

  constructor(private sentimentService: SentimentService) {}

  analyze(text: string) {
    this.text = text;

    this.sentimentService.analyze(text).subscribe({
      next: res => {
        this.result = res;
        this.formComponent.stopLoading();
      },
      error: () => {
        this.formComponent.stopLoading();
      }
    });
  }

}
