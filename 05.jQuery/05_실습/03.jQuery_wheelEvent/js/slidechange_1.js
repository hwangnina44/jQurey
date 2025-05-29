//slideCahnge,js

//alert('연결');

/* 

마우스 휠 이벤트
- 마우스 휠을 움직일 때 발생하는 이벤트
- 기본 이벤트 = 스크롤 이벤트
- 마우스 휠은 스크롤을 하기 위한 도구 (하드웨어)

*마우스 휠 이벤트명
1)mousewheel : chrom IE/edge 사파리 오페라 브라우저 지원 가능
2)wheel : 표준 코딩에서 사용하는 이벤트 명(ie, 사라피 지원안함)
3)DOMMouseScroll : 파이어폭스 전용 이벤트 명
*/

//전역 변수 설정//

//현재 페이지 번호! (첫 페이지 0 = 초기값)
var pageCount = 0;
const total = 6;
var stat = 0; //스크롤 상태 변경(0-실행전/허용, 1-실행중/잠금)

/////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $(document).on('mousewheel DOMMouseScroll', function () {
        if (stat === 1) return false;
        stat = 1;

        var evt = window.event;


        var delta = evt.wheelDelta ? evt.wheelDelta : evt.detail;

        //!!4. 파이어폭스 브라우저를 위한 처리!
        if (/Firefox/i.test(navigator.userAgent)) {
            delta = -evt.detail;
        }

        if (delta < 0) {

            pageCount++;
            if (pageCount === total) pageCount = total - 1;
        } else {

            pageCount--;
            if (pageCount === -1) {
                pageCount = 0;
            }
        }
        var pageTop = $('.page').eq(pageCount).offset().top;
        console.log('페이지 offset :' + pageTop);
        $('html,body').animate({
            scrollTop: pageTop + 'px'
        }, 800, function () {
            stat = 0;
        });
    });
});