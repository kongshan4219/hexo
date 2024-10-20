const fs = require('fs-extra');
const path = require('path');

// 获取当前脚本所在的目录
const baseDir = path.resolve(__dirname, '..');  // 获取上一级目录，即hexo目录

// 定义相对路径
const htmlDir = path.join(baseDir, '/source/tool/html');
const toolDir = path.join(baseDir, '/source/tool');
const jsDir = path.join(toolDir, 'displayNames.js');

// 递归读取文件夹中的所有 .html 文件
function readHtmlFiles(dir) {
    let htmlFiles = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // 如果是目录，递归读取
            htmlFiles = htmlFiles.concat(readHtmlFiles(fullPath));
        } else if (stats.isFile() && path.extname(fullPath) === '.html') {
            // 如果是文件且扩展名为 .html，加入结果
            htmlFiles.push(fullPath);
        }
    });

    return htmlFiles;
}

async function loadHtml() {
    // 递归获取所有的 .html 文件
    const htmlFiles = readHtmlFiles(htmlDir);

    const displayNames = [];

    htmlFiles.forEach(file => {
        const relativePath = path.relative(htmlDir, file);  // 获取相对路径
        const fileName = path.basename(file, '.html');
        const displayName = fileName.replace(/_/g, ' ').replace(/-/g, ' ');  // 将文件名格式化为更易读的形式
        console.log(displayName);
        displayNames.push(displayName);
    });

    // 将 displayNames 数组写入 JavaScript 文件
    const content = `const displayNames = ${JSON.stringify(displayNames, null, 2)};\n\nexport default displayNames;`;
    fs.writeFileSync(jsDir, content);

    console.log(`Display names have been written to ${jsDir}`);
}

loadHtml();
