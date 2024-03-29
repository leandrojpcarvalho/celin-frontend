import Configs from "../entities/Configs";

export type EndPoints = 'users' | 'teachers' | 'classes' | 'coursees' | 'evaluation';
export type Days = 'monday' | 'tuesday' | 'wendnesday' | 'thursday' | 'friday' | 'saturday';
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Roles = 'user' | 'teacher' | 'student';

type ExcludeFields<T, R extends keyof T> = Omit<T, R>;
type GetFields<T, R extends keyof T> = Pick<T, R>;
type Creation<T, R extends keyof T, P> = ExcludeFields<T, R> & Partial<P>

// #region User Types
export type Availability = {
    [key in Days]: string[];
};

export interface IPhone {
    number: number;
    ddd: number;
    local: string;
    getPhone: string;
}

export interface IAddress {
    address: string,
    zipCode: string,
    city: string,
    state: string,
    complement: string,
    number: number,
    getValues: IAddress
}


export interface IUser {
    id: number,
    name: string,
    email: string,
    accessLevel: string,
    phones: IPhone[]
    address: IAddress,
};

export interface ITeacher extends IUser {
    availability: Availability;
    classRooms: number[]
}

export interface IAddressDto extends ExcludeFields<IAddress, 'complement' | 'number'> { }

export interface IUserCreation extends ExcludeFields<IUser, 'id' | 'accessLevel' | 'phones' | 'address'> {
    address: ExcludeFields<IAddress,'getValues'>,
    phones: string[]
 };

// #endregion

// #region Api Types

export type ApiCepResponse = {
    cep: string,
    logradouro: string,
    uf: string,
    bairro: string,
    localidade: string,
}


export type RequestApi = {
    endPoints: EndPoints,
    query?:string,
    id?: number,
    data?: any,
    method?: Methods,
    headerArray?: [string[]]
}

export interface ApiAllUsers extends GetFields<IUser, 'id'| 'name'| 'email'>  {
    role: string
}

// #endregion