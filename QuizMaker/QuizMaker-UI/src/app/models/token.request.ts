export class TokenRequest{
      constructor(
      public username: string,
      public password: string,
      public client_id: string,
      public grant_type: string,
      public client_secret: string){}
}