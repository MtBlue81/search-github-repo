<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop.prevent>
          <h3 class="modal-header">
            <p>APIアクセストークン設定</p>
          </h3>
          <p class="sub-description">privateリポジトリにアクセスする場合に設定してください</p>
          <p class="sub-description">ローカルストレージに保存されます</p>
          <div class="modal-body">
            <input class="token-input" type="text" v-model="token" @keydown.enter="handleSave"/>
          </div>
          <div class="modal-footer">
            <Button @click="handleSave" v-bind:disabled="isSaveButtonDisabled">保存</Button>
            <Button @click="$emit('close')" class="button-cancel">キャンセル</Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from './Button';
export const TOKEN_KEY = 'search-field-token'

export default {
  name: 'TokenDialog',
  data: () => ({
    token: '',
  }),
  methods: {
    handleSave: function() {
      localStorage.setItem(TOKEN_KEY, this.token);
      this.$emit('close', this.token);
    },
  },
  computed: {
    isSaveButtonDisabled: function() {
      return this.token.length === 0;
    },
  },
  created: function() {
    this.token = localStorage.getItem(TOKEN_KEY) || '';
  },
  components: {
    Button,
  },
}
</script>

<style>
.token-input {
  width: 100%;
  line-height: 1.6;
  box-sizing: border-box;
  padding: 2px 4px;
}

.button-cancel {
  color: #6c757d;
  border-color: #6c757d;
}

.modal-container h3 {
  margin: 4px 0;
  color: #42b983;
}

.modal-container p {
  margin: 0;
}

.modal-body {
  margin: 12px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer > * {
  margin-left: 4px;
}

.sub-description {
  font-size: .7rem;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 360px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
