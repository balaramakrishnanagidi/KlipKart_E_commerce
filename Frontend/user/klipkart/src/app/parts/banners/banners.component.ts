import { Component, OnInit } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.css'],
    standalone: true,
    imports: [CarouselModule, NgFor]
})
export class BannersComponent implements OnInit {

  constructor(private api: ApiService) { }
  slidesStore: any = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    stagePadding: 50,
    margin: 15,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    },
    nav: false,
  };

  ngOnInit(): void {
    this.fetch_banners();
  }

  fetch_banners() {
    this.api.fetch_banners().subscribe(response => {
      this.slidesStore = response.banners;
    }, error => {
      console.log(error.message);
    });
  }
}
