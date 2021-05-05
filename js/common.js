// 全局通用的一些函数或一开始要执行的全局代码

function $(selecter) {
    return document.querySelector(selecter);
}

function $$(selecter) {
    return document.querySelectorAll(selecter);
}

function width() {
    return document.documentElement.clientWidth;

}

function height() {
    return document.documentElement.clientHeight;
}



// 创建一个轮播图区域
function createCarousel(carouselId, datas) {
    carouselId = document.querySelector(carouselId);
    // 获取各种dom元素
    var carouselCOntainer = carouselId.querySelector('.g_carousel-container');
    var carouselList = carouselId.querySelector('.g_carousel-list');
    var carouselIndicator = carouselId.querySelector('.g_carousel-indicator');
    var carouselPrev = carouselId.querySelector('.g_carousel-prev');
    var carouselNext = carouselId.querySelector('.g_carousel-next');

    var curIndex = 1;
    var timer = null;
    /**
      * 创建轮播图中的各种元素
      */
    function createCarouselElements() {
        datas.forEach((el, i) => {
            carouselList.innerHTML += `
            <li>
               <a href="${el.link}">
                 <img src="${el.image}" alt="">
               </a>
            </li>
            `;
            carouselIndicator.innerHTML += `<li class="${curIndex === i ? "selected" : ""}"></li>`
        });
        carouselList.style.width = datas.length * 100 + '%';
        carouselList.style.left = -curIndex * width() + 'px';

    }
    createCarouselElements();

    // 根据目前的索引，设置正确的状态
    function setStatus() {
        var selected = carouselIndicator.querySelector('.selected');
        if (selected) {
            selected.className = '';
            var ind_chli = carouselIndicator.childNodes;
            var chliAr = [];
            for (var i = 0; i < ind_chli.length; i++) {
                if (ind_chli[i].nodeName === 'LI') {
                    chliAr.push(ind_chli[i]);
                }
            }
            chliAr[curIndex].className = 'selected';
        }
    }



    // 去上一个
    function toPrev() {
        if (curIndex <= 0) return;
        curIndex--;
        carouselList.style.left = -curIndex * width() + 'px';
        setStatus()
    }

    // 去下一个
    function toNext() {
        if (curIndex >= datas.length - 1) return;
        curIndex++;
        carouselList.style.left = -curIndex * width() + 'px';
        setStatus()
    }

    // 开始自动切换
    function start() {
        timer = setInterval(() => {
            if (curIndex >= datas.length - 1) {
                curIndex = -1;
            }
            toNext();
        }, 2000);
    }
    start();
    // 停止自动切换
    function stop() {
        clearInterval(timer);
    }
    // 点击事件
    carouselNext.onclick = toNext;
    carouselPrev.onclick = toPrev;

    // 滑动事件 touchstart  mouchmove  touchend targetTouches(列表)
    carouselList.ontouchstart = (e) => { 
        stop();
        carouselList.style.transition = 'none';
        var dis = e.targetTouches[0].clientX;
        var curDis = 0;
        carouselList.ontouchmove = (e) => {
            e.stopPropagation(); // 阻止事件冒泡  
            carouselList.style.left = -curIndex*width() + (e.targetTouches[0].clientX-dis)+ 'px';
            curDis = e.targetTouches[0].clientX-dis
        }
        carouselList.ontouchend = (e) => {
            carouselList.ontouchmove = null;
            carouselList.style.transition = '0.5s';
            if(curDis > 100){ 
                toPrev();
            }else if (curDis < -100){
                toNext();
            }else {
                carouselList.style.left = -curIndex * width() + 'px';
            } 
            if(curIndex >= datas.length - 1 || curIndex <= 0){
                carouselList.style.left = -curIndex * width() + 'px';
            }
            start();
        }
    }


}