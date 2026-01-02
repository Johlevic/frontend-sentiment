import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit {

  @ViewChild('stackDetails') stackDetails!: ElementRef<HTMLDetailsElement>;
  @ViewChild('metricsDetails') metricsDetails!: ElementRef<HTMLDetailsElement>;

  ngAfterViewInit() {
    this.updateDetailsState();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDetailsState();
  }

  private updateDetailsState() {
    const isDesktop = window.innerWidth >= 768; // md breakpoint

    [this.stackDetails, this.metricsDetails].forEach(ref => {
      if (!ref) return;

      if (isDesktop) {
        ref.nativeElement.open = true;
      } else {
        ref.nativeElement.open = false;
      }
    });
  }

}
