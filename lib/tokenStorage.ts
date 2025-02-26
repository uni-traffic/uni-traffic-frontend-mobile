import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const setItem = async (key: string, value: string): Promise<void> => {
  await setItemAsync(key, value);
};

const getItem = async (key: string): Promise<string | null> => {
  try {
    const token = await getItemAsync(key);

    return token ? token : null;
  } catch {
    return null;
  }
};

const deleteItem = async (key: string) => {
  try {
    await deleteItemAsync(key);
  } catch {
    console.error("Error deleting item");
  }
};

export { setItem, getItem, deleteItem };
