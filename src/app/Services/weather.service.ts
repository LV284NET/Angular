import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Constants } from '../constants';
import { Weather } from '../weather/weather.model';
import { WeatherComponent } from '../weather/weather.component';

@Injectable()
export class WeatherService {

    constructor(private _http: Http) { }

    public getWeatherByCity(cityName: string) {
        let url = Constants.WeatherApiConstants.getSearchUrl(cityName);

        return this._http.get(url,)
            .map((res: Response) => {
                console.log("res.json()\n" + res.json());
                console.log("res.json() as Weather\n" + (res.json() as Weather));
                return res.json() as Weather;
            })
            .catch((error: any) => Observable.throw(error.json().error || "Open Weather API error"));
    }
}
