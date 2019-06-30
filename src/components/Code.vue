<template>
  <div class="code-wrapper">
    <h3>
      <a v-bind:href="code.html_url">{{ code.path }}</a>
    </h3>
    <Fragment
      v-for="match in code.text_matches"
      v-bind:key="match.fragment"
      v-bind:code="match.fragment"
      v-bind:matches="match.matches"
    />
  </div>
</template>

<script>
import Fragment from './Fragment';

export default {
  name: 'Code',
  props: ['code'],
  components: {
    Fragment,
  },
}
</script>

<style>
.code-wrapper h3 {
  font-size: 14px;
  color: #0366d6;
}

.code-wrapper {
  margin: 12px;
  padding: 4px;
}
</style>
