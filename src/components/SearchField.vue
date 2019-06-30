<template>
  <div>
    <div class="form-container">
      <form @submit.prevent="handleSearch" class='search-form'>
        <input type="text" v-model="keyword" class="search-field"/>
        <Button v-bind:disabled="isSearchButtonDisabled">検索</button>
      </form>
      <Button @click="showModal = true" class="token-button">トークン</Button>
      <TokenDialog v-if="showModal" @close="handleSettingToken"/>
    </div>
    <transition name="slide-fade">
      <p v-if="searching">Loading...</p>
      <SearchResults
        v-else
        v-bind:results="results"
        v-bind:onClickLink="onClickLink"
      />
    </transition>
  </div>
</template>

<script>
import SearchResults from './SearchResults';
import TokenDialog, { TOKEN_KEY } from './TokenDialog';
import Button from './Button';
import axios from 'axios';

const url = 'https://api.github.com/search/code';
const query = (word, lang, repo) =>
 `q=${word}${lang ? `+language:${lang}` : ''}${repo ? `+repo:${repo}` : ''}`;
const ACCEPT_TYPE = 'application/vnd.github.v3.text-match+json';
let token = localStorage.getItem(TOKEN_KEY);

export default {
  name: 'searchField',
  props: ['onClickLink', 'config'],
  methods: {
    handleSearch: function() {
      if (!this.keyword) return;
      this.searching = true;
      const headers = {Accept: ACCEPT_TYPE};
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }
      axios.get(
        `${url}?${query(this.keyword, this.config.lang, this.config.repo)}`, { headers }
      ).then((res) => {
        this.results = res.data;
      }).catch((e) => {
        alert(`${e.response.data.message}\n${e.toJSON().message}`);
      }).finally(() => this.searching = false);
    },
    handleSettingToken: function(_token) {
      this.showModal = false;
      if (_token) {
        token = _token;
      }
    },
  },
  data: () => ({
    showModal: false,
    searching: false,
    keyword: '',
    results: {},
  }),
  computed: {
    isSearchButtonDisabled: function() {
      return this.keyword.length === 0;
    },
  },
  components: {
    SearchResults, TokenDialog, Button,
  },
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-enter {
  transform: translateY(-30px);
  opacity: 0;
}

.form-container {
  display: flex;
}

.search-form {
  display: flex;
  flex-grow: 1;
  max-width: 50%;
}

.search-field {
  flex-grow: 1;
  margin-right: 4px;
  font-size: 1.2rem;
  padding: 2px 4px;
}

.token-button {
  margin: 0 4px;
}
</style>
