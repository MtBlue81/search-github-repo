<template>
  <button class="sgr-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style>
.sgr-button {
  color: #007bff;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  background-color: transparent;
  border: 1px solid #007bff;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
}

.sgr-button:disabled {
  cursor: default;
  opacity: 0.4;
}
</style>
