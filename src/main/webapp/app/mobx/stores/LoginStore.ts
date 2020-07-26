import { observable, action, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import axios from 'axios';

const loginEndpoint = 'https://gateway.m1payall.com/einvoice/api/user-info/login';

class LoginStore {
  @observable loggedInUser = {
    id: 0,
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    status: '',
    emailVerified: '',
    phoneVerified: '',
    userId: '',
    role: '',
    fullName: '',
    reminderId: '',
    error: '',
    responseStatus: 0
  };

  @action login = async (userName: string, password: string) => {
    const requestBody = {
      phoneNumber: userName,
      password
    };
    await axios
      .post(loginEndpoint, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const successResponse = response.status === 200 || 201;
        if (successResponse) {
          toast.success("You're logged in!");
        }
        runInAction(() => {
          this.loggedInUser = { ...this.loggedInUser, responseStatus: response.status };
          this.loggedInUser = { ...this.loggedInUser, ...response.data };
        });
      })
      .catch((error: any) => {
        const message = error.response.data.error;
        runInAction(() => {
          this.loggedInUser = { ...this.loggedInUser, error: message };
        });
        toast.error(message);
      });
  };
}
export default LoginStore;
