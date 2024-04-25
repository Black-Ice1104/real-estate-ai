import OPENAI_API_KEY from '../../keys.js';
import axios from 'axios';

// 用你的OpenAI API密钥替换此处
const apiKey = OPENAI_API_KEY;

// 设置API请求参数
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};

// 创建生成文本的函数
async function generateText(prompt) {
    const data = {
        model: "gpt-3.5-turbo", // 或选择其他你需要的模型
        prompt: prompt,
        max_tokens: 150
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', data, { headers: headers });
        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error calling OpenAI API:', error.message);
        return null;
    }
}

// 主程序入口
async function main() {
    const prompt = "Hello, how are you?";
    const generatedText = await generateText(prompt);
    console.log('Generated Text:', generatedText);
}

main();
