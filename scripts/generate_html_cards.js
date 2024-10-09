const fs = require('fs-extra');
const path = require('path');

// 获取当前脚本所在的目录
const baseDir = path.resolve(__dirname, '..');  // 获取上一级目录，即hexo目录

// 定义相对路径
const htmlDir = path.join(baseDir, '/source/tool/html');
const toolDir = path.join(baseDir, '/source/tool');
const jsDir = path.join(toolDir, 'displayNames.js');

async function loadHtml() {
    // 读取文件夹中的所有文件
    const files = fs.readdirSync(htmlDir);

    const displayNames = [];

    files.forEach(file => {
        // 只处理 .html 文件
        if (path.extname(file) === '.html') {
            const fileName = path.basename(file, '.html');
            const displayName = fileName.replace(/_/g, ' ').replace(/-/g, ' ');  // 将文件名格式化为更易读的形式
            console.log(displayName)
            displayNames.push(displayName);
        }
    });

    // 将 displayNames 数组写入 JavaScript 文件
    const content = `const displayNames = ${JSON.stringify(displayNames, null, 2)};\n\nexport default displayNames;`;
    fs.writeFileSync(jsDir, content);

    console.log(`Display names have been written to ${jsDir}`);
}

loadHtml()
