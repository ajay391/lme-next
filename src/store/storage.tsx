// store/storage.ts
import type { Storage } from 'redux-persist';

const createNoopStorage = (): Storage => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const createPersistStorage = (): Storage => {
  if (typeof window !== 'undefined') {
    const storage = require('redux-persist/lib/storage').default;
    return storage;
  } else {
    return createNoopStorage();
  }
};

export default createPersistStorage();
