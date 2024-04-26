import axios from 'axios';

// 用你的OpenAI API密钥替换此处
const apiKey = 'sk-proj-VWExIvjRxapFO5eQ3MblT3BlbkFJ8E1TadZwvjxTaJCjnPWR';

// 设置API请求参数
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};

// 创建生成文本的函数
async function generateText(prompt) {
    const data = {
        prompt: prompt,
        max_tokens: 150
    };

    try {
        // 更新API URL以使用新的格式
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', data, { headers: headers });
        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
        return null;
    }
}

// 主程序入口
async function main() {
    const prompt = "Once upon a time";
    const generatedText = await generateText(prompt);
    console.log('Generated Text:', generatedText);
}

main();
