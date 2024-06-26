import axios from 'axios';
import { response } from 'express';

// 用你的OpenAI API密钥替换此处
const apiKey = 'sk-proj-VWExIvjRxapFO5eQ3MblT3BlbkFJ8E1TadZwvjxTaJCjnPWR';

// 设置API请求参数
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};

// 创建生成文本的函数
export async function generateText(prompt) {
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: prompt }
        ],
        max_tokens: 150
    };
    const params = {
        response_format: {type: "json_object"},
    };
    try {
        // 更新API URL以使用新的格式
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers: headers });
        let content = response.data.choices[0].message.content;
        content = JSON.parse(content);
        return content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
        return null;
    }
}

// 主程序入口
// async function main() {
//     const prompt = "Once upon a time";
//     const generatedText = await generateText(prompt);
//     console.log('Generated Text:', generatedText);
// }

// main();
