export class City {
    cityID: number;
    name: string;
    description: string;
    picture: any;
    rating: number;
    
    constructor(cityID: number, name: string, description: string, picture: any){
        this.cityID=cityID;
        this.name = name;
        this.description = description;
        this.picture = picture;
    }
}