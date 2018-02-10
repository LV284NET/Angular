export class BlaBlaCarInfo {
    LowestPrice: number;
    HighestPrice: number;
    TravelTime: number;
    Distance: number;
    CountOfSuggestions: number;
    Link: string;
    
    constructor(LowestPrice: number, HighestPrice: number, TravelTime: number, Distance: number, CountOfSuggestions: number, Link: string){
        this.LowestPrice = LowestPrice;
        this.HighestPrice = HighestPrice;
        this.TravelTime =TravelTime;
        this.Distance = Distance;
        this.CountOfSuggestions = CountOfSuggestions;
        this.Link = Link;
    }
}