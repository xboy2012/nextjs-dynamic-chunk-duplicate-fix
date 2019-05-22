import makeNotifyNode from './makeNotifyNode';

export default (url) => {
  return makeNotifyNode(
    `<link rel="preload" href="${url}" />\r\n` +
    'is duplicated and ignored by "nextjs-dynamic-chunk-duplicate-fix". \r\n' +
    'Please wait until the issue is fixed [https://github.com/zeit/next.js/issues/7392]'
  );
};
