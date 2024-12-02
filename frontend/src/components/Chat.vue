<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Message from "@/components/Message.vue";
import Button from "@/components/Button.vue";

const { query } = useRoute();
const { name, room } = query;

const props = defineProps({
  messages: Array,
});

const emits = defineEmits(["send-message"]);

let message = ref("");

const handleMessage = () => {
  emits("send-message", message.value);
  message.value = "";
};
</script>

<template>
  <section :class="$style.chat">
    <h2 :class="$style.room">{{ room }}</h2>
    <hr :class="$style.separator" />
    <div :class="$style.body">
      <Message
        v-for="(message, i) in messages"
        :key="`message-key-${i}`"
        :obj="message"
        :isOwn="message.user.name === name"
      />
    </div>
    <footer :class="$style.footer">
      <input v-model.trim="message" :class="$style.input" />
      <Button :label="'Send'" @click="handleMessage" />
    </footer>
  </section>
</template>

<style lang="scss" module>
.chat {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  height: 800px;
  width: 1200px;
  background: white;
  color: black;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.room {
  text-align: left;
  margin: 0;
}

.separator {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: black;
  transform: translateY(-50%);
  border: none;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: calc(100% - 70px);
  overflow-y: auto;
  background: #2f2d2d;
  padding: 6px 8px 30px 6px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(167, 150, 150, 0.6);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
}

.footer {
  display: flex;
}

.input {
  width: 80%;
  height: 100px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
