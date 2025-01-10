<script setup>
import AnswerOptionEditor from "./AnswerOptionEditor.vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateQuestion", "deleteQuestion"]);

const addAnswer = () => {
  const newAnswer = {
    id: `opt_${Math.floor(Math.random() * 1000000)}`,
    text: "",
    scaleScores: ['TotalScore', 'Block1Score'],
  };

  const updatedQuestion = {
    ...props.question,
    answerOptions: [...props.question.answerOptions, newAnswer],
  };

  emit("updateQuestion", updatedQuestion);
};

const updateAnswer = (updatedAnswer) => {
  const updatedAnswerOptions = props.question.answerOptions.map((answer) =>
    answer.id === updatedAnswer.id ? updatedAnswer : answer
  );

  emit("updateQuestion", {
    ...props.question,
    answerOptions: updatedAnswerOptions,
  });
};

const deleteAnswer = (deletedAnswer) => {
  const updatedAnswerOptions = props.question.answerOptions.filter(
    (answer) => answer.id !== deletedAnswer.id
  );

  emit("updateQuestion", {
    ...props.question,
    answerOptions: updatedAnswerOptions,
  });
};

const deleteQuestion = (id) => {
  emit("deleteQuestion", { ...props.question });
};

const handleChangeQuestionType = () => {
  if (
    props.question.questionType === "openAnswer" &&
    props.question.answerOptions.length !== 0
  ) {
    props.question.answerOptions = [props.question.answerOptions.pop()];
  } else {
    return;
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-neutral-600 p-8 box-border rounded-xl gap-5 relative"
  >
    <div
      class="flex flex-wrap list-none gap-x-6 gap-y-3 items-center text-black mb-4"
    >
      <input class="h-8" v-model="question.text" placeholder="Текст вопроса" />
      <input
        class="h-8"
        v-model="question.description"
        placeholder="Описание вопроса"
      />
      <select
        @change="handleChangeQuestionType"
        v-model="question.questionType"
      >
        <option value="singleChoice">Один вариант</option>
        <option value="multipleChoice">Несколько вариантов</option>
        <option value="openAnswer">Открытый вопрос</option>
      </select>
      <div class="flex items-center gap-2">
        <input
          v-model="question.shuffleAnswers"
          type="checkbox"
          name="shuffleAnswers"
        />
        <label class="text-white" for="shuffleAnswers">Перемешать ответы</label>
      </div>
      <input type="file" multiple />
      <button
        :disabled="
          question.questionType === 'openAnswer' &&
          question.answerOptions.length >= 1
        "
        @click="addAnswer"
      >
        Добавить вариант ответа
      </button>
      <button
        @click="deleteQuestion(question.id)"
        class="bg-red-500 w-7 h-7 text-xs p-0 absolute top-4 right-4"
        title="Удалить вопрос"
      >
        X
      </button>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex" v-for="answer in question.answerOptions">
        <AnswerOptionEditor
          :key="answer.id"
          :answerType="question.questionType"
          :answer="answer"
          @updateAnswer="updateAnswer"
          @deleteAnswer="deleteAnswer"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
