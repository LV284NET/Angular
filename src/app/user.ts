export class User{
    Email: string;
    FirstName: string;
    LastName: string;

    constructor(email: string, firstName: string, lastName: string) {
        this.Email = email;
        this.FirstName = firstName;
        this.LastName = lastName;
    }
}