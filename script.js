// 获取画布并设置上下文
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// 使画布全屏
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 字符集：包含日文片假名、拉丁字母和数字（经典的黑客帝国字符组成）
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
let columns = canvas.width / fontSize; // 计算列数

// 记录每一列当前的Y坐标（初始在最顶部）
let drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// 绘制代码雨的核心函数
function draw() {
    // 绘制带有透明度的黑色矩形，覆盖整个画布，形成尾迹效果
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 设置文字颜色和字体
    ctx.fillStyle = '#0F0'; 
    ctx.font = fontSize + 'px monospace';

    // 循环遍历每一列
    for (let i = 0; i < drops.length; i++) {
        // 随机获取一个字符
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // 绘制字符
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // 如果字符到达屏幕底部，或者随机触发重置，则将该列的Y坐标拉回顶部
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Y坐标增加，字符下落
        drops[i]++;
    }
}

// 定时器，控制代码雨下落速度 (33毫秒约等于30帧/秒)
setInterval(draw, 33);

// 窗口大小改变时重置画布大小和列数，避免变形
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
});

// 简单交互：按下任意按键改变文字
window.addEventListener('keydown', () => {
    const textContainer = document.getElementById('text-container');
    if (textContainer) {
        textContainer.innerText = "Follow the white rabbit.";
        textContainer.style.animation = "none"; // 停止打字动画
        textContainer.style.borderRight = "none"; // 移除光标
    }
});