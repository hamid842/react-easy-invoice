import { createContext, useContext } from 'react';
import LoginStore from './LoginStore';

export interface IStore {
  loginStore: LoginStore;
}
export const store: IStore = {
  loginStore: new LoginStore()
};
export const StoreContext = createContext(store);
export const useStore = () => {
  return useContext(StoreContext);
};
