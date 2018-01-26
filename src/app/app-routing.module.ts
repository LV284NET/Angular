import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceComponent } from './place/place.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, data: { animation: 'main' }  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
<<<<<<< HEAD
  { path: 'cities-list', component: CitiesComponent },
  { path: 'city/:cityId', component: CityComponent},
  { path: 'city/:cityId/place-list', component: PlaceListComponent },
  { path: 'city/:cityId/place/:placeId', component: PlaceComponent },
  { path: 'profile', component: ProfileComponent }
=======
  { path: 'cities-list', component: CitiesComponent,   data: { animation: 'cities-list' }},
  { path: 'city/:cityId', component: CityComponent, data: { animation: 'city/:cityId' }},
  { path: 'city/:cityId/place-list', component: PlaceListComponent, data: { animation: 'city/:cityId/place-list' } },
  { path: 'city/:cityId/place/:placeId', component: PlaceComponent, data: { animation: 'city/:cityId/place/:placeId' } },
  { path: ':Id', component: ProfileComponent, data: { animation: ':Id' } }
>>>>>>> loading-animation
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
