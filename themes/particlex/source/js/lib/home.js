mixins.home = {
    mounted() {
        let background = this.$refs.homeBackground;
        let images = background.dataset.images.split(",");
        
        // 1. 初始化：随机选一张作为第一张
        this.bgIndex = Math.floor(Math.random() * images.length);
        background.style.backgroundImage = `url('${images[this.bgIndex]}')`;
        this.menuColor = true;

        // 2. 只有多于一张图时才启动轮换
        if (images.length > 1) {
            this.bgInterval = setInterval(() => {
                // 计算下一张图的索引
                this.bgIndex = (this.bgIndex + 1) % images.length;
                
                // 创建一个临时的图片对象预加载，防止切图时白屏
                let img = new Image();
                img.src = images[this.bgIndex];
                img.onload = () => {
                    // 设置过渡动画效果（如果你CSS没写，这行代码能确保丝滑）
                    background.style.transition = "background-image 1.5s ease-in-out";
                    background.style.backgroundImage = `url('${images[this.bgIndex]}')`;
                };
            }, 5000); // 5000毫秒（5秒）切换一次
        }
    },
    // 养成好习惯：在组件销毁前清除定时器，防止内存泄漏
    beforeUnmount() {
        if (this.bgInterval) {
            clearInterval(this.bgInterval);
        }
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};