import { IAddress, Roles} from "../types";
import AbastractUser from "./AbstractUser";
import Phone from "./Phone";

export class User extends AbastractUser{
    constructor (name: string, email: string, phone: Phone, address: IAddress, role: Roles) {
        super(name, email, phone, address, role);
    }
}

