export interface loginTypes {
    email: string;
    password: string;
}

export interface signUpTypes {
    name: string;
    email: string;
    role: string;
}

export interface loginApiResponse {
      token: string; 
      user_uuid: string;
      email: string;
      name:string;
      bio:string
  }