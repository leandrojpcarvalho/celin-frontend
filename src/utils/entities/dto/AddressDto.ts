import { ApiCepResponse, IAddressDto } from "../../types"

export default class AddressDto implements IAddressDto {
    public address: string;
    public city: string;
    public zipCode: string
    public state: string;

    constructor( data: ApiCepResponse) {
        this.address = data.logradouro;
        this.city = data.localidade;
        this.state = data.uf;
        this.zipCode = data.cep;
    }
}