export class User{
    Email: string;
    FirstName: string;
    LastName: string;
    Guid: string;

    constructor(email: string, firstName: string, lastName: string, guid: string) {
        this.Email = email;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Guid = guid;
    }
}