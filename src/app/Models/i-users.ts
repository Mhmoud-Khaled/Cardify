// request and response all models
export interface IUsersData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ISupport {
  url: string;
  text: string
}

export interface IUser {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUsersData[];
  support: ISupport
}

export interface IUserDetails {
  data: IUsersData;
  support: ISupport
}

