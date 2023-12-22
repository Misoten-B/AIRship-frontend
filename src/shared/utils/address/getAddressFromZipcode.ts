import { getAddress } from '../../lib/zipcode';

const INVALID_ZIPCODE_MESSAGE = '7桁の郵便番号を入力してください';
const NON_EXISTENT_ZIPCODE_MESSAGE = '存在しない郵便番号のようです';

const pattern = /^\d{3}-\d{4}$|^\d{7}$/;

function isValidZipcode(input: string): boolean {
  return pattern.test(toHalfWidth(input));
}

function toHalfWidth(str: string): string {
  return str.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
}

type ResponseAddress = {
  error: false;
  zipcode: string;
  prefectures: string;
  cityAndAddress: string;
};

type ErrorAddress = {
  error: true;
  message: string;
};

export const getAddressFromZipcode = async (
  zipcode: string,
): Promise<ResponseAddress | ErrorAddress> => {
  const fixed = toHalfWidth(zipcode);

  try {
    if (!isValidZipcode(fixed)) {
      return { error: true, message: INVALID_ZIPCODE_MESSAGE };
    }

    const res = await getAddress(fixed);

    if (!res.data.results) {
      return { error: true, message: NON_EXISTENT_ZIPCODE_MESSAGE };
    }

    return {
      error: false,
      zipcode: res.data.results[0].zipcode,
      prefectures: res.data.results[0].address1,
      cityAndAddress:
        res.data.results[0].address2 + res.data.results[0].address3,
    };
  } catch (error) {
    return { error: true, message: 'エラーが発生しました' };
  }
};
