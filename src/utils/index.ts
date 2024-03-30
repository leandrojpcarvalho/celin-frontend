import AddressDto from "./entities/dto/AddressDto";
import { EndPoints } from "./types";

export default class Utils {
    private static baseUrlInternalApi = import.meta.env.BASE_URL_API || "http://localhost:8080";
    private static baseUrlCep =  "https://viacep.com.br/ws";
    public static internalApiAcess(endPoint: EndPoints, id?: number, query?: string) {
        if(id) {
            return this.baseUrlInternalApi + "/" + endPoint + "/" + id
        }
        const endsWith = query ? "?"+ query : ''
        
        return `${this.baseUrlInternalApi}/${endPoint}${endsWith}`;
    }
    public static async getAddressByCep (zipCode: string)  {
        const res =  await fetch(`${this.baseUrlCep}/${zipCode}/json/`);
        return new AddressDto(await res.json())
    }
     
}