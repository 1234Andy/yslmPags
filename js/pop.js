var showPop = (function () {
    var container = null;
    function showPop(id) {
        container = $('#'+id);
        container.style.display = '';

        // 控制视频开关
        if(id === 'popVideo'){
            container.querySelector('video').play();
        }
    }

    // 选择qq 微信
    document.querySelector('.pop_login').onclick = function (ev) { 
        ev = ev.target; 
        if(ev.className !== 'pop_login'){
            this.querySelector('.selected').classList.remove('selected');
            ev.classList.add('selected');
        } 
    }

    // 控制所有弹窗关闭按钮
    var popClose = $$('.pop_close');
    for (var i = 0; i < popClose.length; i++) {
        var element = popClose[i];
        element.onclick = function (e) {
            container.style.display = 'none';
            var vid = container.querySelector('video');

            // 控制视频开关
            if(vid){
                vid.pause();
            }
            
        } 
    }
    return showPop;
    
})();