export class Place {
    placeId: number;
    name: string;
    cityName: string;
    description: string;
    picture: any;

    constructor(placeId: number, name: string, cityName: string, description: string, picture: any){
        this.placeId=placeId;
        this.name = name;
        this.cityName = cityName;
        this.description = description;
        this.picture = picture;
    }
}