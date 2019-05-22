import { Head, NextScript } from 'next/document';

import notifyDuplicatePreload from './notifyDuplicatePreload';
import notifyDuplicateScript from './notifyDuplicateScript';

// override the buggy implement
const _getPreloadDynamicChunks = Head.prototype.getPreloadDynamicChunks;
Head.prototype.getPreloadDynamicChunks = function() {
    const tags = _getPreloadDynamicChunks.call(this);
    if (!tags) {
        return tags;
    }
    const resultTags = [];
    const map = {};
    for (const tag of tags) {
        const url = tag.props.href;
        if (!map[url]) {
            map[url] = true;
            resultTags.push(tag);
        } else if (process.env.NODE_ENV !== 'production') {
            const notifyTag = notifyDuplicatePreload(url);
            resultTags.push(notifyTag);
        }
    }
    return resultTags;
};

// override the buggy implement
const _getDynamicChunks = NextScript.prototype.getDynamicChunks;
NextScript.prototype.getDynamicChunks = function() {
  const tags = _getDynamicChunks.call(this);
  if (!tags) {
    return tags;
  }
  const resultTags = [];
  const map = {};
  for (const tag of tags) {
    const url = tag.props.src;
    if (!map[url]) {
      map[url] = true;
      resultTags.push(tag);
    } else if (process.env.NODE_ENV !== 'production') {
      const notifyTag = notifyDuplicateScript(url);
      resultTags.push(notifyTag);
    }
  }
  return resultTags;
};
