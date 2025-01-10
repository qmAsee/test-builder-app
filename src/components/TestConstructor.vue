<script setup>
import BlockEditor from "./BlockEditor.vue";
import { useTestStore } from "../store/testStore.js";

const testStore = useTestStore();
const test = testStore.test;

const addBlock = () => {
  testStore.addBlock({
    id: `block_${Math.floor(Math.random() * 1000000)}`,
    title: "",
    description: "",
    config: { shuffleBlocks: false, shuffleQuestions: false },
    questions: [],
  });
  console.log(testStore.test);
};
</script>

<template>
  <div class="flex flex-col gap-16">
    <div class="flex flex-col gap-6 bg-neutral-800 p-6 box-border rounded-xl">
      <div class="flex gap-6">
        <div class="flex flex-col">
          <label for="testTitle">Название теста</label>
          <input
            v-model="test.title"
            type="text"
            placeholder="Название теста"
            name="testTitle"
          />
        </div>
        <div class="flex flex-col">
          <label for="testDescription">Описание теста</label>
          <input
            v-model="test.description"
            type="text"
            placeholder="Описание теста"
            name="testDescription"
          />
        </div>
      </div>
      <div class="flex gap-6">
        <button class="w-56 bg-neutral-600" @click="addBlock">
          Добавить блок
        </button>
        <div class="flex flex-col">
          <label class="" for="timeLimit">Лимит времени (мс)</label>
          <input
            type="number"
            v-model="test.config.timeLimit"
            class="h-6 text-black"
            name="timeLimit"
          />
        </div>
        <div class="flex flex-col">
          <label class="" for="maxAttempts">Максимум попыток</label>
          <input
            type="number"
            v-model="test.config.maxAttempts"
            class="h-6 text-black"
            name="maxAttempts"
          />
        </div>
        <div class="flex flex-col">
          <div class="flex gap-2">
            <input
              class="flex"
              v-model="test.config.shuffleBlocks"
              name="shuffleBlocks"
              type="checkbox"
            />
            <label for="shuffleBlocks">Перемешать блоки</label>
          </div>
          <div class="flex gap-2">
            <input
              class="flex"
              v-model="test.config.shuffleQuestions"
              name="shuffleQuestions"
              type="checkbox"
            />
            <label for="shuffleQuestions">Перемешать вопросы</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <h2 class="text-5xl font-bold">
        {{ test.title.length === 0 ? "Новый тест" : test.title }}
      </h2>
      <h3 class="text-2xl">
        {{
          test.description.length === 0 ? "Описание теста" : test.description
        }}
      </h3>
    </div>

    <article
      class="bg-neutral-500 p-10 rounded-xl box-border"
      v-for="block in test.blocks"
      :key="block.id"
    >
      <BlockEditor :block="block" />
    </article>
  </div>
</template>

<style scoped></style>
