import axios from 'axios';

type ResponseAddress = {
  address1: string;
  address2: string;
  address3: string;
  zipcode: string;
};

type Response = {
  results: ResponseAddress[] | null;
  status: number;
};

const URL = 'https://zipcloud.ibsnet.co.jp/api/search';

export const getAddress = async (zipcode: string) =>
  await axios.get<Response>(URL, { params: { zipcode } });
