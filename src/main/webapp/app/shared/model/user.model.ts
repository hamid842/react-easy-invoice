export interface IUser {
  id?: any;
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  status?: string;
  emailVerified?: string;
  phoneVerified?: string;
  userId?: string;
  role?: string;
  fullName?: string;
  reminderId?: string;
  error?: string;
}

export const defaultValue: Readonly<IUser> = {
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
  error: ''
};
