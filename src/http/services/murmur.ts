import { MurmurType } from "../../@types/types"
import { axios_client } from "../client/axios"

export const fetchMurmursByUserId = async (userId) => {
  const data = (await axios_client.get(`/murmurs/my?userId=${userId}`)) as {
    totalCount: number
    murmur: MurmurType[]
  }
  return data;
}

export const fetchMurmursById = async (id) => {
  const data = (await axios_client.get(`/murmurs/find?murmurId=${id}`)) as MurmurType
  return data;
}

export const fetchAllMurmurs = async () => {
  const data = (await axios_client.get('/murmurs')) as MurmurType[]
  return data;
}

export const createMurmur = async (content) => {
  const data = await axios_client.post(`/murmurs`, { content })
  return data;
}

export const likeMurmurById = async (murmurId) => {
  const data = (await axios_client.post(`/murmurs/like?murmurId=${murmurId}`));
  return data;
}