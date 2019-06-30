import Vue from 'vue';
import SearchField from './components/SearchField';

/**
 * Githubのリポジトリ内検索
 * @params {String} id マウント先ID
 * @params {Function} options.onClickLink 内部リンククリック時のハンドラ
 * @params {String} options.lang 検索対象言語
 * @params {String} options.repo 検索対象リポジトリ
 */
window.renderSearchRepo = (function() {
  return function renderSearchRepo(id, options = {}) {
    const { onClickLink = () => {}, ...rest } = options;
    new Vue({
      render: h => (
        h(SearchField, {
          props: {
            onClickLink,
            config: rest,
          },
        })
      ),
    }).$mount(`#${id}`)
  }
})();
