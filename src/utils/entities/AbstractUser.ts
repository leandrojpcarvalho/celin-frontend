import { IAddress, IPhone, Roles } from "../types";
import FieldException from "./exceptions/FieldsExceptions";
import Phone from "./Phone";

export default abstract class AbastractUser {
    public  static users: AbastractUser[] = [];
    public  address: IAddress | undefined;
    public  name: string | undefined;
    public  email: string | undefined;
    public  phones: IPhone[] = [];
    private role: Roles =  'user'

    constructor (name: string, email: string, phone: Phone, address: IAddress, role: Roles) {
        this.setAddress(address);
        this.setName(name);
        this.setEmail(email);
        this.setPhone(phone);
        this.setRole(role);
        AbastractUser.users.push(this);
        console.log(AbastractUser.users);
    }

    setAddress(address: IAddress) {
        this.address = address;
    }

    setName(name: string) {
        const regex = new RegExp("\\b\\w{2,25}\\s\\w{2,25}\\b");
        if(!regex.test(name)) {
            throw new FieldException('the name is invalid the patterner need be name and lastname');
        }
        this.name = name;
    }

    public setPhone(phone: Phone) {
        if(!this.phones.includes(phone)) {
            this.phones.push(phone);
        }
    }
    public setEmail(email: string) {
        console.log(email);
        
        const regex = new RegExp("^[a-zA-Z0-9._%+-]{1,25}@[a-zA-Z0-9.-]{1,25}\.com$");
        if(!regex.test(email)) {
            throw new FieldException('the email need follow a@a.com');
        }
        this.email = email;
    }

    public setRole(role: Roles) {
        this.role = role;
    }

    get getValues() {
        return {
            address: this.address?.getValues as IAddress,
            name: this.name as string,
            email: this.email as string,
            phones: this.phones.map((phone) => phone.getPhone),
            role: this.role as Roles
        }
    }   
}