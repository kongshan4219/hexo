const fs = require('fs-extra');
const path = require('path');

// 获取当前脚本所在的目录
const baseDir = path.resolve(__dirname, '..');  // 获取上一级目录，即hexo目录

// 定义相对路径
const srcRelative = 'themes_me';  // 相对于 hexo 目录的路径
const destRelative = 'node_modules';    // 相对于 hexo 目录的路径

// 通过 path.resolve 将相对路径转换为绝对路径
const src = path.resolve(baseDir, srcRelative);
const dest = path.resolve(baseDir, destRelative);

async function copyFiles(src, dest) {
    try {
        console.log(`========================\n=========================\n=========================\n=========================\n=========================\n=========================\n=========================\n=========================`);
        await fs.copy(src, dest);
        console.log(`成功复制文件从 ${src} 到 ${dest}`);
    } catch (err) {
        console.error(`复制时出错: ${err.message}`);
        console.error(`详细错误堆栈: ${err.stack}`);
    }
}

// 执行复制操作
copyFiles(src, dest);
