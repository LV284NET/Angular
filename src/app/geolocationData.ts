export class GeolocationData {

    //#region Private Properties

    private countryName: string;
    private regionName: string;
    private cityName: string;
    private streetName: string;
    private streetNumber: string;
    
    //#endregion

    constructor(){
    }

    //#region Public Methods

    //These methods encapsulate private properties

    public SetCountryName(countryName: string): void{
        this.countryName = countryName;
    }

    public GetCountryName(): string{
        return this.countryName;
    }

    public SetRegionName(regionName: string): void{
        this.regionName = regionName;
    }

    public GetRegionName(): string{
        return this.regionName;
    }
    
    public SetCityName(cityName: string): void{
        this.cityName = cityName;
    }

    public GetCityName(): string{
        return this.cityName;
    }

    public SetStreetName(streetName: string): void{
        this.streetName = streetName;
    }

    public GetStreetName(): string{
        return this.streetName;
    }

    public SetStreetNumber(streetNumber: string): void{
        this.streetNumber = streetNumber;
    }

    public GetStreetNumber(): string{
        return this.streetNumber;
    }

    //#endregion
}