import FieldException from "./exceptions/FieldsExceptions";
import { IPhone } from "../types";


export default class Phone implements IPhone{
    public static allDDD: string[];
    private _ddd: number;
    private _number: number;
    private _local: string;

    static {
        fetch('../../../ddd.json')
        .then((response) =>response.json().then((data) => {
            Phone.allDDD = Object.keys(data);
        }))
    }

    constructor(number: string) {
        this._local = "BR";
        this._ddd = 0;
        this._number = 0;
        const tmpDdd = number.slice(0, 2);
        this.setDdd(tmpDdd);
        const tmpNumber = number.slice(2);
        this.setNumber(tmpNumber);
    }

    public get ddd() {
        return this._ddd;
    }

    public get number() {
        return this._number;
    }

    public get local () {
        return this._local;
    }

    public setDdd(ddd: string) {
        console.log(ddd.length, Phone.allDDD.includes(ddd));
        
        if(ddd.length !== 2  || !Phone.allDDD.includes(ddd)) {
            throw new FieldException("O ddd é invalido", "tel");
        }
        this._ddd = parseInt(ddd);
    }

    public setNumber (number: string) {
        const regex = new RegExp("^\d{8,9}$");
        if(regex.test(number)) {
            throw new FieldException("O telefone deve conter 8 ou 9 digitos", "tel");
        }
        this._number = parseInt(number);
    }

    public get getPhone () {
        return this._ddd + " " + this._number;
    }
}