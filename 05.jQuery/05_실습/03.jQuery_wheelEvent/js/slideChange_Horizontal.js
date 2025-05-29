//slidehange_horizontal

// 1.전역변수 설정
/* 
>>현재 페이지 카운트 인덱스 번호
>>총 페이지 갯수 인덱스 .lenght
>>휠 이벤트 등록 + 핸들러 강제 멈춤 설정 (mousewheel,DOMMouseScroll)
>>브라우저 환경 값 반환

*/
var pageCount = 0; //현재 페이지 인덱스 번호를 담을 변수
var total;  //$선언을 안했기 떄문에 지역 변수에서 담아주기
            //페이지 총 갯수를 담을 변수, 
var stat = 0;//이벤트 핸들러 실행 제어 (0-실행전/허용,1-실행중/잠금)

$(document).ready(function (){
    total = $('.page').length;
    console.log(total);
    //마우스 휠 이벤트
    $(document).on('mousewheel DOMMouscroll',function(){
        //1.이벤트 핸들러 제어
        if(stat===1) return false;
        stat=1;
        //2.발생한 이벤트 객체 정보 확인! >> window환경 확인
        //$(window).event 가 불가능한 이유는 제이쿼리에 .evnet속성이 없음
        var evt= window.event;
        //3.wheeldelta값 받기! evt.wheelDelta;
        //delta에변수에 값음 담고 = window이벤트에 휠델타값이 있어?
        //true>> evt.wheelDelta 실행 false>> evt.detail 실행!
        var delta = evt.wheelDelta? evt.wheelDelta : evt.detail;
        //4.파이어폭스를 위한 설정
        var browserinfo = navigator.userAgent;
       
        if (/Firefox/i.test(browserinfo)) {
            delta = -evt.detail;
        }
        //5.페이지 이동하기
        //휠 아래-다음, 휠 위 -위로
        
        //페이지 이동을 위해 필요한 값
        //휠 텔타값>>페이지 이동 방향을 확인
        //현재 페이지 ->pageCount 변수값
        //(현재 페이지)문서로부터 떨어진 거리 >> 스크롤 이동값으로 사용하기 위해
        
        //휠 텔타값>>페이지 이동 방향을 확인
        if(delta>0) {
            //페이지에 처음,마지막을 고정해주기위해서 pageCount에 수치로 통제
            pageCount--;
            if(pageCount=== -1){
                pageCount=0;
            }
        } else {
            pageCount++;
            if (pageCount=== total)
                pageCount=total-1;
        }

        var pageLeft= $('.page').eq(pageCount).offset().left;
        //페이지 이동
        $('html,body').animate({
            scrollLeft : pageLeft 
        },800,function(){
            stat=0;//핸들러 실행을 허용상태로 변경!
        });

        menuChg();
    });

     $('.gnb a, .side-pager a').on('click',function(e){
        e.preventDefault();
        //현재 보고 있는 페이지와 pageCount 값 일치 시키기기
        //현재 보고 있는 페이지는? 내가 클릭한 메뉴 페이지
        var idx= $(this).parent().index();
        
        //클릭된 메뉴와 현재페이지를 일치!
        pageCount=idx;
        //페이지 이동거리 구하기
        var pid= $(this).attr('href');
        console.log(pid);
        var pageLeft = $(pid).offset().left;

        //이동
        $('html,body').animate({
            scrollLeft : pageLeft
        },800);
       //메뉴변경
       menuChg();
    });
});




//메뉴 변경 함수
//함수명 : menuChg
//기능 : .gnb와 .side-pager메뉴 동시 변경
function menuChg(){
    $(".gnb li").eq(pageCount).addClass('on').siblings().removeClass('on');
    $(".side-pager li").eq(pageCount).addClass('on').siblings().removeClass('on');
};