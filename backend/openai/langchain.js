import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const chatModel = new ChatOpenAI({
  apiKey: 'sk-proj-VWExIvjRxapFO5eQ3MblT3BlbkFJ8E1TadZwvjxTaJCjnPWR',
});


const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a well known caring housing agent and you have a MongoDB database with houses data to search."],
    ["user", "{input}"],
  ]);
const chain = prompt.pipe(chatModel);
const result = await chain.invoke({
    input: "The user would like to rent an apartment around the USC campus near dtla with 2 bedrooms and 2 bathrooms. Please create a query for MongoDB to get the most relevant houses data.",
  });

  console.log(result);
