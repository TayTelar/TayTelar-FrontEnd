declare module 'reactjs-social-login' {
    export interface IResolveParams {
      data: {
        code: string;
      };
    }
  
    export function LoginSocialGoogle(props: any): JSX.Element;
    export function LoginSocialFacebook(props: any): JSX.Element;
    export function LoginSocialApple(props: any): JSX.Element;
  }
  