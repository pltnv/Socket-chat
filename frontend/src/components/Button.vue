<template>
  <button v-bind="$attrs" :class="$style.button">{{ label }}</button>
</template>

<script setup>
const props = defineProps({
  label: String,
});
</script>

<style lang="scss" module>
.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  height: 40px;
  transition: box-shadow 0.2s ease;
}

.button:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transform: translateY(1px);
  border: none;
}

.button:focus {
  outline: none;
}
</style>
