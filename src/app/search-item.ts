export class SearchItem {
    cityId: number;
    placeId: number;
    name: string;
    type: string;

    constructor(cityId: number, placeId: number, name: string, type: string){
        this.cityId = cityId;
        this.placeId = placeId;
        this.name = name;
        this.type = type;
    }
}
