import { Router } from '@angular/router';

export class SearchItem {
    cityId: number;
    placeId: number;
    name: string;
    type: string;
    router: Router;

    constructor(cityId: number, placeId: number, name: string, type: string){
        this.cityId = cityId;
        this.placeId = placeId;
        this.name = name;
        this.type = type;
    }

    public goToPage() {
        if(this.type == "City"){
            this.goToPage;
        }
        else{
            this.goToPlacePage;
        }

    }

    private goToPlacePage(){
        this.router.navigateByUrl('/city/{{this.cityId}}/place/{{this.placeId}}')
    }

    private goToCityPage(){
        this.router.navigateByUrl('/city/{{this.cityId}}');
    }
}
