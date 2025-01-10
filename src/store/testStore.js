import { defineStore } from "pinia";

export const useTestStore = defineStore("test", {
  state: () => ({
    test: {
      title: "",
      description: "",
      scales: ["TotalScore", "Block1Score"],
      config: {
        shuffleBlocks: false,
        shuffleQuestions: false,
        timeLimit: 30,
        maxAttempts: 1,
      },
      blocks: [],
    },
  }),
  actions: {
    addBlock(block) {
      this.test.blocks.push(block);
    },
    deleteBlock(id) {
      this.test.blocks = this.test.blocks.filter((block) => block.id !== id);
      console.log("store:", id);
    },
  },
});
