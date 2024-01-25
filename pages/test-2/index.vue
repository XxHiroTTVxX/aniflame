<template>
  <div class="container-ai">
    <h1>Anime AI Assistant</h1>
  </div>
</template>

<script setup>
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  modelName: "mistral-tiny",
});


const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  ["human", "{input}"],
]);
const chain = prompt.pipe(model);
const response = await chain.invoke({
  input: "Hello",
});
console.log("response", response);

</script>

<style>
.container-ai {
  margin-top: 8rem;
  margin-left: 4rem;
}
</style>