class StorageService {
    private readonly storage = window.localStorage;

    getItem = (key: string) => {
        return this.storage.getItem(key);
    };

    setItem = (key: string, value: string) => {
        this.storage.setItem(key, value);
    };
}

export const storageService = new StorageService();

