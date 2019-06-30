<template>
  <div v-html="codeWithKey" class="code"/>
</template>

<script>
const replaceString = (word) => `<span class="word">${word}</span>`;

export default {
  name: 'Fragment',
  props: ['code', 'matches'],
  computed: {
    codeWithKey: function() {
      let offset = 0;
      return this.matches.reduce((acc, { indices, text }) => {
        const [start, end] = indices;
        const replace = replaceString(text);
        const pre = acc.substring(offset, offset + start);
        const post = acc.substring(offset + end);
        offset = offset + (replace.length - text.length);
        return pre + replace + post;
      }, this.code || '');
    },
  },
}
</script>

<style>
.code {
  white-space: pre-wrap;
  overflow: visible;
  word-wrap: normal;
  line-height: 20px;
  font-size: .8rem;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  vertical-align: top;

  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  margin: 4px 0;
}

.word {
  font-weight: bold;
  background-color: #fff5b1;
}
</style>
