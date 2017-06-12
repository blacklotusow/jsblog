import getSession from '../common/getSession';
import sendIndex from '../common/sendIndex';
import renderApp from '../common/renderApp';
import hasCachedPath from '../common/hasCachedPath';
import renderArticle from './renderArticle';
import renderIndex from './renderIndex';
import getArticle from './getArticle';
import setCache from './setCache';
import hasArticleChanged from './hasArticleChanged';
import getUid from './getUid';

export default [
  getSession,
  hasCachedPath,
  {
    true: [
      renderApp(),
      renderArticle(),
      renderIndex,
      sendIndex,
      getUid,
      getArticle,
      hasArticleChanged,
      {
        true: [renderArticle(true), setCache],
        false: [],
      },
    ],
    false: [
      getUid,
      getArticle,
      renderApp(),
      renderArticle(),
      renderIndex,
      sendIndex,
      setCache,
    ],
  },
];
