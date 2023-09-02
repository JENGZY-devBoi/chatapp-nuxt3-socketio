<template>
  <div class="h-screen w-full bg-gray-200 grid place-items-center font">
    <div class="w-[500px] h-[500px] flex flex-col gap-y-2">
      <h1 class="text-center text-5xl font-bold gradient">CHAT JENG</h1>

      <div class="bg-white rounded-md shadow flex-grow p-5 overflow-y-auto">
        <div class="flex flex-col gap-y-3">
          <div 
            v-for="item,idx of messages" :key="idx" 
            class="flex w-full bg-blue"
            :class="{
              'justify-end': item.user_id === socket.id,
              'justify-start': item.user_id !== socket.id
            }"
          >
            <div class="flex">
              <div 
                class="rounded-xl min-w-32 shadow-md px-4 py-2"
                :class="{
                  'bg-green-500 text-white order-last': item.user_id === socket.id,
                  'bg-white-200 text-gray-500': item.user_id !== socket.id
                }"
              >
                {{ item.message }}
              </div>
  
              <div 
                class="text-gray-400 text-xs mt-1 self-end"
                :class="{
                  'text-end pr-2': item.user_id === socket.id,
                  'text-start pl-2': item.user_id !== socket.id
                }"
              >
                {{ dayjs(item.create_at).format('HH:mm') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form 
        @submit.prevent="onSubmitSendMessage"
        class="rounded-md flex gap-x-1"
      >
        <input 
          v-model="inputMessage.message"
          type="text" 
          placeholder="Aa"
          maxlength="40"
          class="p-3 border-none rounded-md flex-grow !outline-none text-gray-500 text-[18px]" 
        />

        <button type="submit" class="bg-green-500 rounded-md py-2 px-5 text-white ">
          send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault("Asia/Bangkok");

  import { io } from 'socket.io-client';
  const socket = io('http://localhost:8080');

  const messages = ref([]);

  const inputMessage = reactive({
    message: ''
  });
  
  onMounted(() => {
    socket.on('connect', () => {
      console.log('have connect');
    });
  });

  socket.on('new-message', (message) => {
    messages.value.push(message);
  })

  const onSubmitSendMessage = () => {
    console.log(inputMessage.message)

    socket.emit('send-message', {
      user_id: socket.id,
      message: inputMessage.message,
    });

    inputMessage.message = ''; // CLEAR
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap');

  .font {
    font-family: 'Chakra Petch', sans-serif;
  }

  .gradient {
    background: #0E88CF;
    background: linear-gradient(to bottom right, #0E88CF 23%, #CF00BA 78%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>