import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    secundary: string;

    background: string;
    currentLine: string;
    selection: string;
    foreground: string;
    comment: string;
    cyan: string;
    green: string;
    orange: string;
    pink: string;
    purple: string;
    red: string;
    yellow: string;

    text: string;
  }
}
