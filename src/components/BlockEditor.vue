<script setup>
import QuestionEditor from "./QuestionEditor.vue";
import { useTestStore } from "../store/testStore.js";

const testStore = useTestStore();

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const updateQuestion = (index, updatedQuestion) => {
  const updatedQuestions = [...props.block.questions];
  updatedQuestions[index] = updatedQuestion;

  props.block.questions = updatedQuestions;
};

const addQuestion = () => {
  props.block.questions.push({
    id: `q_${Math.floor(Math.random() * 1000000)}`,
    text: "",
    questionType: "singleChoice",
    description: "",
    shuffleAnswers: false,
    answerOptions: [],
  });
};

const deleteBlock = (id) => {
  testStore.deleteBlock(id);
  console.log("BlockEditor:", id);
};

const deleteQuestion = (deletedQuestion) => {
  props.block.questions = props.block.questions.filter((q) => {
    return q.id !== deletedQuestion.id;
  });
};
</script>

<template>
  <div class="flex justify-between gap-24">
    <div class="flex flex-col w-4/5">
      <div class="flex flex-col gap-3">
        <h2 class="text-4xl font-bold">{{ block.title || "Новый блок" }}</h2>
        <h3 class="text-xl mb-14">
          {{ block.description || "Описание блока" }}
        </h3>
      </div>
      <ul class="flex flex-col gap-6 w-full">
        <li
          class="flex flex-col gap-2"
          v-for="(question, index) in block.questions"
          :key="question.id"
        >
          <strong>Вопрос {{ index + 1 }}</strong>
          <QuestionEditor
            :question="question"
            @updateQuestion="
              (updatedQuestion) => updateQuestion(index, updatedQuestion)
            "
            @deleteQuestion="deleteQuestion"
          />
        </li>
      </ul>
    </div>
    <div class="flex flex-col w-1/3">
      <button class="mb-4" @click="addQuestion">Добавить вопрос</button>
      <div class="flex flex-col gap-4">
        <input
          class="text-black"
          v-model="block.title"
          placeholder="Название блока"
        />
        <textarea
          class="text-black"
          v-model="block.description"
          placeholder="Описание блока"
        ></textarea>
        <div class="flex gap-2">
          <input
            v-model="block.config.shuffleQuestions"
            name="shuffleQuestions"
            type="checkbox"
          />
          <label for="shuffleQuestions">Перемешать вопросы в блоке</label>
        </div>
        <button @click="deleteBlock(block.id)" class="bg-red-500">
          Удалить блок
        </button>
      </div>
    </div>
  </div>
</template>
