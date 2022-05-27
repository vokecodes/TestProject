import EncryptedStorage from 'react-native-encrypted-storage';

const SecureStorageManager = {
  async setLocalFavorites(data) {
    let jsonLocalFavorites = await this.getLocalFavorites();
    if (jsonLocalFavorites !== undefined) {
      if (jsonLocalFavorites.includes(data)) {
        let index = jsonLocalFavorites.indexOf(data, 0);
        jsonLocalFavorites.splice(index, 1);
      } else {
        jsonLocalFavorites.push(data);
      }
    } else {
      jsonLocalFavorites = [];
      jsonLocalFavorites.push(data);
    }

    const toStore = JSON.stringify(data);

    try {
      await EncryptedStorage.setItem('@local_favorites', toStore);
    } catch (error) {
      //   console.log('setCustomerData', error);
    }
  },

  async getLocalFavorites() {
    const jsonLocalFavorites = await EncryptedStorage.getItem(
      '@local_favorites',
    );
    return jsonLocalFavorites === undefined || jsonLocalFavorites === null
      ? []
      : JSON.parse(jsonLocalFavorites);
  },

  async getItemInLocalFavorite(item) {
    const items = await this.getLocalFavorites();
    if (!items.length) {
      return false;
    }
    return items.find(it => it === item);
  },

  async eraseData() {
    try {
      await EncryptedStorage.removeItem('@local_favorites');
    } catch (e) {
      //   console.log('eraseData', e);
    }
  },
};

export default SecureStorageManager;
