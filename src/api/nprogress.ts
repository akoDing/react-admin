import NProgress from 'nprogress';
// 提示：若遇到类型错误，可尝试执行 `npm i --save-dev @types/nprogress` 安装类型声明文件，
// 或者添加一个包含 `declare module 'nprogress';` 的新声明(.d.ts)文件

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.3
});
