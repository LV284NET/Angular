export class Constants {

    static CurrentBackEndHost: string = 'https://localhost:44317/';

    // 'https://localhost:4200/WebApi/'

    //Constants for Pagination
    static PaginationConstants = class {

        //How many elements will be on One page
        static ElementsPerPage: number = 3;

        //How many pages will be shown in pagination (if 3 will be shown current page
        // -1 and +1 page, if 5 current page +2 and -2)
        static PagesToShow: number = 5;
        
        //The first page of different lists
        static FirstPage: number = 1;
    }

    //Constants for SpinnerComponent
    static SpinnerComponentConstants = class {

        static AnimationUrl: string = '../assets/img/LoadingAnimations/dance.gif';

        static AnimationName: string = 'LoadingProcess';
    }

    //Constants for AuthorizationService
    static AuthorizationServiceConstants = class {

        static UrlForAuthorization: string = Constants.CurrentBackEndHost + 'Token';

        static UrlForRegistration: string = Constants.CurrentBackEndHost + 'api/Account/Register';

        static UrlForConfirmEmail: string = Constants.CurrentBackEndHost + 'api/Account/Confirm';

        static UrlForChangePassword: string = Constants.CurrentBackEndHost + 'api/Account/ChangePassword';
    }

    //Constants for CityService
    static CityServiceConstants = class {

        static UrlForGetCityById: string = Constants.CurrentBackEndHost + 'api/GetCity';

        static UrlForGetCities: string = Constants.CurrentBackEndHost + 'api/GetCities';

        static UrlForGetCitiesCount: string = Constants.CurrentBackEndHost + 'api/GetCountCity';

        static UrlForGetTopCities: string = Constants.CurrentBackEndHost + "api/City/GetTopCities";

    }

    //Constants for FavoriteService
    static FavoriteServiceConstants = class {

        static UrlForAddFavoritePlace: string = Constants.CurrentBackEndHost + 'api/Place/AddFavoritePlace';

        static UrlForDeleteFavoritePlace: string = Constants.CurrentBackEndHost + 'api/Place/DeleteFavoritePlace';

        static UrlForGetFavoritePlaces: string = Constants.CurrentBackEndHost + 'api/Profile/GetFavoritePlaces';
    }

    //Constants for PlacesService
    static PlacesServiceConstants = class {

        static UrlForGetPlaces: string = Constants.CurrentBackEndHost + 'api/Place/GetPlacesPageByCityId';

        static UrlForGetFilteredPlaces: string = Constants.CurrentBackEndHost + 'api/Place/GetFilteredPlacesByCityId';

        static UrlForGetPlace: string = Constants.CurrentBackEndHost + 'api/Place/GetPlaceById';

        static UrlForGetTopPlacesByCityId: string = Constants.CurrentBackEndHost + 'api/Place/GetTopPlacesByCityId';

        static UrlForGetPlacesCount: string = Constants.CurrentBackEndHost + 'api/Place/GetCountPlaces';

        static UrlForGetCountFromFilteredPlaces: string = Constants.CurrentBackEndHost + 'api/Place/GetCountFromFilteredPlaces';

        static UrlForGetPlaceFilters: string = Constants.CurrentBackEndHost + 'api/Place/GetPlaceFilters';

        
    }

    //Constants for ProfileService
    static ProfileServiceConstants = class {

        static UrlForGetFavoritePlaces: string = Constants.CurrentBackEndHost + 'api/Profile/GetFavoritePlaces';

        static UrlForGetUserInfo: string = Constants.CurrentBackEndHost + 'api/Profile/GetUserInfo';
    }

    //Constants for SearchCitiesAndPlaces
    static SearchCitiesAndPlacesServiceConstants = class {

        static UrlForSearchCitiesAndPlaces: string = Constants.CurrentBackEndHost + 'api/Search/GetSuggestions';

    }

        //Constants for RatingService
        static RatingServiceConstants = class {            
            static UrlForGetCityRating: string = Constants.CurrentBackEndHost + '';
            
            static UrlForGetPlaceRating: string = Constants.CurrentBackEndHost + 'api/Place/GetPlaceRating';
            
            static UrlForGetUserRatingOfPlace: string = Constants.CurrentBackEndHost + 'api/Profile/GetUserRatingOfPlace';
            
            static UrlForSetUserRatingOfPlace: string = Constants.CurrentBackEndHost + 'api/Profile/SetUserRatingForPlace';
            
            static UrlForDeleteUserRatingOfPlace: string = Constants.CurrentBackEndHost + 'api/Profile/DeleteUserRatingForPlace';
        }
}