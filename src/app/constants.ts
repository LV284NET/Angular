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

        static UrlForConfirmEmail: string = Constants.CurrentBackEndHost + 'api/Account/ConfirmUser';

        static UrlForChangePassword: string = Constants.CurrentBackEndHost + 'api/Account/ChangePassword';
    }
    //Constants for SocialAuthService
    static SocialAuthConstants = class {

        static UrlForSocialAuth: string = Constants.CurrentBackEndHost + 'api/Account/AddExternalLogin';

        static UrlForDemoLogin: string = Constants.CurrentBackEndHost + 'api/Account/Login';
    }
    //Constants for CityService
    static CityServiceConstants = class {

        static UrlForGetCityById: string = Constants.CurrentBackEndHost + 'api/City/GetCity';

        static UrlForGetCities: string = Constants.CurrentBackEndHost + 'api/City/GetCities';

        static UrlForGetCitiesCount: string = Constants.CurrentBackEndHost + 'api/City/GetCountCity';

        static UrlForGetTopCities: string = Constants.CurrentBackEndHost + "api/City/GetTopCities";

        static NumberOfTopCities: number = 4;

    }

    //Constants for FavoriteService
    static FavoriteServiceConstants = class {

        static UrlForAddFavoritePlace: string = Constants.CurrentBackEndHost + 'api/Place/AddUserFavoritePlace';

        static UrlForDeleteFavoritePlace: string = Constants.CurrentBackEndHost + 'api/Place/DeleteUserFavoritePlace';

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

        static NumberOfTopPlaces: number = 4;
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
        static UrlForGetPlaceRating: string = Constants.CurrentBackEndHost + 'api/Place/GetPlaceRating';

        static UrlForGetUserRatingOfPlace: string = Constants.CurrentBackEndHost + 'api/Profile/GetUserRatingOfPlace';

        static UrlForSetUserRatingOfPlace: string = Constants.CurrentBackEndHost + 'api/Profile/SetUserRatingForPlace';

        static UrlForDeleteUserRatingOfPlace: string = Constants.CurrentBackEndHost + 'api/Profile/DeleteUserRatingForPlace';
    }

    //Constants for FeedbackComponent
    static FeedbackComponentConstants = class {

        static FormspreeUrl: string = 'https://formspree.io/easytravelsystem284@gmail.com';

    }

    //Constants for data validation
    static DataValidationConstants = class {

        static NamePattern: string = "^[а-яА-ЯёЁa-zA-Zʼ'ї Ї і І є Є-]{2,40}$";

        static PasswordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})';

        static EmailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$';
    }
    
    //Constants for GeolocationService
    static GeolocationServiceConstants = class {

        static GoogleApiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';

        static ApiKey: string = 'AIzaSyBcGmt-Vv3bbUxaYA6y5gga5WTymetm9gY';
    }

    //Constants for using Facebook app
    static FacebookConstants = class {

        static FacebookAppId: string = '1982326058704428';

        static Src: string = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1982326058704428&autoLogAppEvents=1';

    }

    static BlaBlaCarService = class {
        static UrlForApiBlaBlaCar: string = Constants.CurrentBackEndHost + 'api/Services/GetBlaBlaCarRequestResult';
    }
}