<template>
  <div @click.stop.prevent="handleClick" class="search-result">
    <p v-if="results.total_count === undefined"></p>
    <p v-else-if="results.total_count === 0">該当なし</p>
    <p v-else>全{{ results.total_count }}件</p>
    <Code
      v-for="code in results.items"
      v-bind:key="code.sha"
      v-bind:code="code"
    />
  </div>
</template>

<script>
import Code from './Code';

export default {
  name: 'SearchResults',
  props: ['results', 'onClickLink'],
  methods: {
    handleClick: function (event) {
      if (event.target.tagName === 'A') {
        this.onClickLink(event.target.href, event.target);
      }
    },
  },
  components: {
    Code,
  },
}
</script>

<style>
.search-result > p {
  margin: 8px 0 4px;
}
</style>
