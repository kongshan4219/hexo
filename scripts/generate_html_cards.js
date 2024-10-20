const fs = require('fs-extra');
const path = require('path');

// 获取当前脚本所在的目录
const baseDir = path.resolve(__dirname, '..');  // 获取上一级目录，即hexo目录

// 定义相对路径
const htmlDir = path.join(baseDir, '/source/tool/html');
const toolDir = path.join(baseDir, '/source/tool');
const jsDir = path.join(toolDir, 'displayNames.js');

// 读取html目录下的子目录，并获取其中的index.html文件
async function loadHtml() {
    const directories = fs.readdirSync(htmlDir);

    const displayNames = [];

    directories.forEach(dir => {
        const dirPath = path.join(htmlDir, dir);
        const indexPath = path.join(dirPath, 'index.html');

        // 判断是否为目录且包含index.html文件
        if (fs.statSync(dirPath).isDirectory() && fs.existsSync(indexPath)) {
            const displayName = dir.replace(/_/g, ' ').replace(/-/g, ' ');  // 使用子目录名作为 displayName
            console.log(displayName);
            displayNames.push(displayName);
        }
    });

    // 将 displayNames 数组写入 JavaScript 文件
    const content = `const displayNames = ${JSON.stringify(displayNames, null, 2)};\n\nexport default displayNames;`;
    fs.writeFileSync(jsDir, content);

    console.log(`Display names have been written to ${jsDir}`);
}

loadHtml();
