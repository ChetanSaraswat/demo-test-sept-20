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
      user_id: string;
      email: string;
      name:string;
      bio:string
  }