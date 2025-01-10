<script setup>
import { useTestStore } from "../store/testStore.js";
const testStore = useTestStore();

const exportTest = () => {
  console.log(JSON.stringify(testStore.test, null, 2));
};
</script>

<template>
  <header class="flex flex-col justify-between h-28 bg-neutral-500 mb-14">
    <div class="flex justify-between items-center px-36 h-full">
      <h1 class="text-3xl font-bold">Конструктор тестов</h1>
      <button class="bg-green-500" @click="exportTest">
        Сохранить JSON (в консоли)
      </button>
    </div>
    <hr class="border-neutral-400 w-full" />
  </header>
</template>
