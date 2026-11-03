import { ChatGoogle } from "@langchain/google";
import express from "express";
import dotenv from "dotenv";
import { TavilySearch } from "@langchain/tavily";
import {context, createAgent} from "langchain";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",

});
  const model = new ChatGoogle( "gemini-3.5-flash-lite")
app.post("/chat",async(req,res)=>{
    const {prompt} = req.body;
    const agent  =  createAgent({
      model,
      tools:[tool]
    })
    const result = await agent.invoke({
      messages:[{
        role:"user",
        content:prompt
      }]
    })

    // console.log(result.messages[result.messages.length -1].content)

return res.json(result.messages[result.messages.length -1].content)

})

// console.log(result.text)



















app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});