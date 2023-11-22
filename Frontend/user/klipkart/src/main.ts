    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';
import { loaderInterceptor } from './app/services/loader/loader.interceptor';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, CarouselModule, FontAwesomeModule, ToastrModule.forRoot()),
        BnNgIdleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        // {provide: HTTP_INTERCEPTORS, useClass: loaderInterceptor, multi: true}
    ]
})
  .catch(err => console.error(err));
