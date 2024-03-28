import { ApiAllUsers, EndPoints, IUser, IUserCreation } from "./types"
import RequestMaker from "./entities/Request"

export default function useFetchUser() {
  const getAllUsers = async (): Promise<ApiAllUsers[]> => {
    const res = await fetch(RequestMaker.requestApi({ endPoints: 'users' }))
    return await res.json()
  }

  const getAllQuery = async(endPoints: EndPoints, query: string) => {
    const res = await fetch(RequestMaker.requestApi({ endPoints, query }))
    return res.json();
  }

  const postRequestUsers = async (data: IUserCreation): Promise<IUser> => {
    const res = await fetch(RequestMaker.requestApi({ endPoints: 'users', data, method: 'POST' }))
    return res.json();
  }

  return {
    getAllUsers,
    postRequestUsers,
    getAllQuery
  }
}