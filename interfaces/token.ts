export interface IToken {
  sub: string;
  iat: number;
  role: [{ authority: "string" }];
}
