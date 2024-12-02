<script setup>
const props = defineProps({
  isOwn: Boolean,
  obj: Object,
});
</script>

<template>
  <div :class="[$style.message, isOwn && $style.messageOwn]">
    <b :class="$style.author">{{ obj.user?.name }}</b>
    <div v-text="obj.message" :class="$style.text" />
    <div v-text="obj.time" :class="$style.time" />
  </div>
</template>

<style lang="scss" module>
.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: auto;
  margin-left: 0;
  gap: 2px;
  min-width: 100px;
  max-width: 50%;
  color: black;
}

.messageOwn {
  margin-right: 0;
  margin-left: auto;
}

.author {
  color: #e3c5c5;
}

.text {
  width: calc(100% - 14px);
  min-height: 30px;
  color: white;
  overflow: hidden;
  word-break: break-all;
  text-align: left;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  background: rgb(111, 47, 103);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 14px 8px;
  border-radius: 12px;
}

.time {
  font-size: 10px;
  width: 100%;
  text-align: right;
  color: #dee6de;
}
</style>
