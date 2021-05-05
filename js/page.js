var pageIndex = 1; // 当前显示的页面索引
var pages = $$(".page_container .page"); // 拿到所有页面的元素
var nextIndex = null; // 下一个页面额索引

// 设置静止状态下的各种样式
function setStatic() {
    nextIndex = null;
    for (let i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (i === pageIndex) {
            page.style.zIndex = 1;

        } else {
            page.style.zIndex = 10;
        }

        page.style.top = (i - pageIndex) * height() + "px";
    }
}

setStatic();

/*
  移动中
*/
function moving(dis) {
    for (let i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (i !== pageIndex) {
            page.style.top = (i - pageIndex) * height() + dis + "px";

        }

    }

    if (dis > 0 && pageIndex > 0) {
        nextIndex = pageIndex - 1;
    } else if (dis < 0 && pageIndex < pages.length - 1) {
        nextIndex = pageIndex + 1;
    } else {
        nextIndex = null;
    }
}

/*
  移动完成
*/
function finishMove() {
    if (nextIndex === null) {
        setStatic();
        return;
    }
    var nextPage = pages[nextIndex];
    nextPage.style.transition = ".5s";
    nextPage.style.top = 0;

    setTimeout(() => {
        pageIndex = nextIndex;
        nextPage.style.transition = "";
        setStatic();

    }, 500);

}

/*
  滑动事件
*/

var pageContainer = $(".page_container");
pageContainer.ontouchstart = function (e) {
    var y = e.touches[0].clientY;
    pageContainer.ontouchmove = function (e) {
        var dis = e.touches[0].clientY - y;
        dis = Math.abs(dis) < 30 ? dis = 0 : dis;
        moving(dis);
    }

    pageContainer.ontouchend = function () {
        finishMove();
        pageContainer.ontouchmove = null;
    }

}

/*
  点击跳转
*/
function shouPage(index) {
    var nextPage = pages[index];
    if(index < nextIndex){
        nextPage.style.top = - height() + "px"
    }else if(index > nextIndex){
        nextPage.style.top =   height() + "px"
    }else {
        pageIndex = pageIndex === 0 ? pageIndex++ : pageIndex--; 
        setStatic();
        nextPage.style.top = - height() + "px"
    }

    nextPage.clientHeight;
    nextIndex= index;
    finishMove() 


}