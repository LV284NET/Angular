export class Place {
    placeId: number;
    name: string;
    cityName: string;
    description: string;
    picture: any;
    cityId: number;
    rating: number;

    constructor(placeId: number, name: string, cityName: string, description: string, picture: any, cityId?: number, rating?: number){
        this.placeId=placeId;
        this.name = name;
        this.cityName = cityName;
        this.description = description;
        this.picture = picture;
        this.cityId=cityId;
        this.rating=rating;
    }
}