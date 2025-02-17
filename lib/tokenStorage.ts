import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

const setToken = async (token: string,): Promise<void> => {
  await setItemAsync('accessToken', token);
};

const getToken = async (): Promise<string | null> => {
  try {
    const token = await getItemAsync('accessToken');

    return token ? token : null;
  } catch {
    return null;
  }
}

const deleteToken = async () => {
  try {
    await deleteItemAsync('accessToken');
  } catch {
    console.error('Error deleting token');
  }
}

export { setToken, getToken, deleteToken };
