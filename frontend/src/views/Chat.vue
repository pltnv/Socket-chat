<script setup>
import { watch, watchEffect, ref, reactive, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import Chat from "@/components/Chat.vue";
import { io } from "socket.io-client";
import dayjs from "dayjs";

const socket = io.connect("http://localhost:5001");

const { query } = toRefs(useRoute());
const params = ref();

const messages = reactive([]);

const message = ref("");

socket.on("message", (msg) => {
  messages.push(msg.data);
});

function initUser() {
  const searchParams = Object.fromEntries(new URLSearchParams(query.value));
  params.value = { ...searchParams, time: dayjs().format("HH:mm") };
  socket.emit("join", params.value);
}

function sendMessage(message) {
  if (!message) {
    return;
  }

  const searchParams = Object.fromEntries(new URLSearchParams(query.value));
  socket.emit("sendMessage", {
    message: message,
    params: { ...searchParams, time: dayjs().format("HH:mm") },
  });
}

onMounted(() => {
  initUser();
});

watch(
  () => query.value,
  () => console.log("check")
);
</script>

<template>
  <main>
    <Chat :messages="messages" @send-message="sendMessage" />
  </main>
</template>
