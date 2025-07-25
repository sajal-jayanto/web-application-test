import { UserType } from "../../@types/types"
import { axios_client } from "../client/axios"

export const fetchUser = async (id) => {
  const data = (await axios_client.get(`/users?id=${id}`)) as UserType
  return data
}