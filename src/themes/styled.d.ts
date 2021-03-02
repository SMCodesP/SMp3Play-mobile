import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secundary: string;

    background: string;
    secundaryBackground: string;

    text: string;
    secundaryText: string;
    tertiaryText: string;
    fifthText: string;
    inverseText: string;

    light: string;
  }
}
