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

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cities-list', component: CitiesComponent },
  { path: 'city/:id', component: CityComponent },
  { path: 'place-list', component: PlaceListComponent },
  { path: 'place/:id', component: PlaceComponent }
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
