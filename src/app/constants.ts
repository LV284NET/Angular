export class Constants{

    //Pagination
    //How many elements will be on One page
    public static ElementsPerPage = 3;
    //How many pages will be shown in pagination (if 3 will be shown current page
    // -1 and +1 page, if 5 current page +2 and -2)
    public static PagesToShow=5;

    //Constants for Loading Animation
    static LoadingAnimation = class{

        static AnimationUrl: string = '../assets/img/dance.gif';

        static AnimationName: string = 'LoadingProcess';
    }
}