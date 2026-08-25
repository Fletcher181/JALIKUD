const memoryStore = new Map<string, string>();

export async function getStorageItem(key: string): Promise<string | null> {
  return memoryStore.get(key) ?? null;
}

export async function setStorageItem(key: string, value: string): Promise<void> {
  memoryStore.set(key, value);
}

export async function deleteStorageItem(key: string): Promise<void> {
  memoryStore.delete(key);
}
