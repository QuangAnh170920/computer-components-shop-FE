export interface UserInfo {
  id?: number;
  avatar?: string;
  email?: string;
  address?: string;
  fullName?: string;
  phone?: string;
  userType?: number;
  status?: number;
  userGroup?: {
    id?: number;
    name?: string;
    roles?: string
  }
  account?: {
    id?: number;
    username?: string;
  }
  roles?: string
}
