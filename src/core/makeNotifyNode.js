import React from 'react';

let notifyCount = 0;
// notify developer with this bug in console
export default (message) => {
  notifyCount++;
  return React.createElement('script', {
    key: `dev_notify_${notifyCount}`,
    dangerouslySetInnerHTML: {__html: `try{console.warn(${JSON.stringify(message)})}catch(e){}`}
  });
};
