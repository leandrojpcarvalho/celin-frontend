import { IAddress } from "../types";
import AddressDto from "./dto/AddressDto";
 

export default class Address implements IAddress {
    private _address: string;
    private _zipCode: string;
    private _city: string;
    private _state: string;
    private _complement: string;
    private _number: string;

    constructor({address, city, state, zipCode}: AddressDto, complement: string, number: string) {
        this._address = address;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
        this._complement = complement;
        this._number = number;
    }

    get address () {
        return this._address;
    }

    get zipCode () {
        return this._zipCode;
    }

    get city () {
        return this._city;
    }
    get state () {
        return this._state;
    }

    get complement () {
        return this._complement;
    }

    get number () {
        return this._number;
    }

    setZipCode ({address, city, state, zipCode}: AddressDto) {
        this._address = address;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
        return this.getValues
    }

    setComplement(complement: string) {
        this._complement = complement
    }

    setNumber (number: string) {
        this._number= number;
    }

    get getValues () {
        return {
            address: this.address,
            city: this.city,
            complement: this.complement,
            number: this.number,
            state: this.state,
            zipCode: this.zipCode,
        }
    }
    
}