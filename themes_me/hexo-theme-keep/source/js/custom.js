// 等待文档完全加载
document.addEventListener("DOMContentLoaded", function () {
    // 选择所有 <pre> 标签下具有 class="highlight mermaid" 的 <code> 标签
    const codeBlocks = document.querySelectorAll('pre > code.highlight.mermaid');

    codeBlocks.forEach(codeBlock => {
        // 查找 <code> 标签内是否有 <svg>
        const svg = codeBlock.querySelector('svg');

        if (svg) {
            // 获取 <pre> 标签
            const pre = codeBlock.parentElement;

            // 替换 <pre> 的内容为 <svg>
            pre.innerHTML = svg.outerHTML;
        }
    });
});
