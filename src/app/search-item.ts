import { Router } from '@angular/router';

export class SearchItem {
    cityId: number;
    placeId: number;
    name: string;
    type: string;

    constructor(cityId: number, placeId: number, name: string, type: string, private router: Router){
        this.cityId = cityId;
        this.placeId = placeId;
        this.name = name;
        this.type = type;
    }

    public goToPage() {
        if(this.type == "City") {
            this.goToCityPage();
        }
        else {
            this.goToPlacePage();
        }
    }

    private goToPlacePage() {
        this.router.navigateByUrl(`/city/${this.cityId}/place/${this.placeId}`)
    }

    private goToCityPage() {
        this.router.navigateByUrl(`/city/${this.cityId}`);
    }
}
