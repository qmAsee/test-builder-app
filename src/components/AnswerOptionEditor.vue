<script setup>
const props = defineProps({
  answerType: {
    type: String,
    required: true,
  },
  answer: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateAnswer", "deleteAnswer"]);

const updateAnswer = (event) => {
  emit("updateAnswer", { ...props.answer, text: event.target.value });
};

const deleteAnswer = () => {
  emit("deleteAnswer", { ...props.answer });
};
</script>

<template>
  <div class="flex gap-3 items-center">
    <div class="flex gap-5" v-if="answerType !== 'openAnswer'">
      <input
        v-if="answerType !== 'openAnswer'"
        :type="answerType === 'singleChoice' ? 'radio' : 'checkbox'"
        name="q_variant"
      />
      <input
        type="text"
        class="h-6"
        :value="answer.text"
        @input="updateAnswer"
        placeholder="введите вариант ответа"
      />
    </div>
    <textarea
      v-if="answerType === 'openAnswer'"
      name="openAnswerTextArea"
      id="openAnswerTextArea"
      placeholder="Ответ"
    ></textarea>
    <button
      class="p-0 w-7 h-7 bg-red-500 text-xs"
      @click="deleteAnswer"
      title="Удалить вариант ответа"
    >
      X
    </button>
  </div>
</template>
