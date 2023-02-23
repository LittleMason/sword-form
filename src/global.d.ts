export {};

declare global {
  interface Window {
    acquireVsCodeApi: any; //全局变量名
  }
}

declare const window: any;
