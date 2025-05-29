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
var pageCount = 0; //변수의 이름은 이용하는 용어로
var total; //총 페이지 갯수

//총 페이지 수가 고정된 값이라면 상수선언가능! >>상수는값의 재할당(변경) 불가!
//const total = 7;
var stat = 0; //스크롤 상태 변경(0-실행전/허용, 1-실행중/잠금)

/////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {

    //총페이지 갯수 읽어오기!
    total = $('.page').length;
    console.log(total);
    $(document).on('mousewheel DOMMouseScroll', function () {
        //console.log('휠 움직이는 중~~');
        //1. 휠 이벤트 핸들러 제어하기
        //이벤트 핸들러가 실행되는 동안 스크롤 잠금 (다른 이벤트 핸들러가 실행되지 못하게 하겠다.)
        //제어문 입장 확인!

        if (stat === 1) return false;
        stat = 1; //개표 표를 사용!



        //!!2.브라우저 구분  - 발생한 이벤트(객체) 정보 확인
        var evt = window.event;
        console.log(evt); //wheelDelta

        //!!3.wheelDelta값 구하기 -브라우저별로 구분해서 값 반환받기!
        /* 
        wheelDelta
        - chrome, ie/Edge 에서 사용
        - 오페라, 파이어폭스 브라우저는 detail 사용
        - 마우스 흴 이벤트 발생 시, 스크롤 이동방향, 이동거리를 리턴해 주는 속성
        - 양수(+)는 윗 방향, 음수(-)는 아랫방향으로 휠 이동
        - click 이벤트에서 wheelDelta 를 적용하면 클릭된 횟수 리턴!
        */

        var delta = evt.wheelDelta ? evt.wheelDelta : evt.detail;
        //이벤트객체의 속성값을 가지고 있음.거기서 wheelEelta있니?
        //delta= evt.wheelDelta ? evt.wheelDelta : evt.detail;
        console.log('마우스윌 델타 값:' + delta);



        //!!4. 파이어폭스 브라우저를 위한 처리!
        //파이어폭스는 델타값이 반대로 반환!(스크롤 뱡향이 반대)
        //마우스 휠이 아래로 이동하면(+),마우스 휠이 위로 이동하면 음수(-)
        if (/Firefox/i.test(navigator.userAgent)) {
            //브라우저에 하위 객체 네비게이터는 정보를 반환하는 속성을 가지고있다. test()>>속성
            delta = -evt.detail;
            console.log('파이어폭스 detail : ' + delta);
        }
        /* 
        브라우저 구분을 위한 if문 조건식 풀이
        1)자바스크립트의 정규표현식
        >>찾고자하는 문자 또는 문자패턴/플래그
        *플래그에 사용할 수 있는 값
        i igonre case : 대소문자를 구별하지 않고 검색
        g golbal : 문자열 내의 모든 패턴 검색
        m multi line : 문자열의 행이 바뀌더라도 검색
        2)test(문자열)
        -문자열과 정규표현식이 일치하는 문자가 있으면 true,없으면 flase 반환
        3)navigator.userAgent : 현재 브라우저 객체정보를 리턴!해줘!////브라우저 객체 속성
        

        //!!5.마우스휠 이벤트로 페이지 이동하기
        //마우스 휠 이동방향 ->아래,다음 페이지 //-
        //마우스 휠 이동방향 ->위, 이전 페이지 // +
        */
        if (delta < 0) {
            //음수,아랫방향으로 휠 이동,다음페이지
            pageCount++;
            if (pageCount === total) pageCount = total - 1;
        } else {
            //양수, 윗방향, 이전 페이지
            pageCount--;
            if (pageCount === -1) {
                pageCount = 0;
            }
        }

        console.log("현재 페이지번호"+pageCount)
        //if else문을 통해 이동할 페이지 순번 반환!
        //이동할 페이지 위치 확인 -> 스크롤의 위치값으로 사용
        var pageTop = $('.page').eq(pageCount).offset().top;
        console.log('페이지 offset :' + pageTop);
        //페이지 이동!!
        $('html,body').animate({
            scrollTop: pageTop + 'px'
        }, 800, function () {
            stat = 0; //스크롤 허용 상태로 변경!
        });

        //메뉴 변경 -gkatn 호출
        //menuchg();
        menuChg2(pageCount);

    });//mousewheel 핸들러(=이벤트)
    $('.gnb a, .side-pager a').on ('click',function(e){
        //a의 기능 막기
        e.preventDefault();
        //클릭된 메뉴와 현재 페이지 번호 일치 시키기!
        //클릭 이후에 휠 이벤트가 발생할 경우, 현재 페이지를 기준으로 이동이하므로 실제 보여지는 페이지와 현재 페이지 번호를 일치 시켜주는 것이 필요!
        var idx= $(this).parent().index();
        console.log("클릭된 a 부모(li) index값:"+idx);
        pageCount=idx;

    
        console.log("변경된페이지 번호:"+pageCount);
        //스크롤 이동거리 구하기2 -pageCount
        var pageTop= $('.page').eq(pageCount).offset().top;
        //var pageTop= $('.page').eq(idx).offset().top;



        //스크롤에 이동거리 구하기 1 - 클릭된 a 의  href값 활용하기
/*         var pid = $(this).attr('href');
        console.log(pid);
        var pageTop = $(pid).offset().top; 
        console.log('페이지가 문서로 부터 떨어진거리 : '+pageTop); */
        //이동
        $('html,body').animate({
            scrollTop : pageTop
        },800);
       //메뉴변경
       //menuChg();
       menuChg2 (pageCount);
    });

});






//메뉴 변경 함수
//함수명 : menuChg
//기능 : .gnb와 .side-pager메뉴 동시 변경
function menuChg (){
    $(".gnb li").eq(pageCount).addClass('on').siblings().removeClass('on');
    $(".side-pager li").eq(pageCount).addClass('on').siblings().removeClass('on');
};

//메뉴 변경 함수
//함수명 : menuChg2
//기능 : .gnb와 .side-pager메뉴 동시 변경//매개변수를 사용
function menuChg2 (n){
    
    $(".gnb li").eq(n).addClass('on').siblings().removeClass('on');
    $(".side-pager li").eq(n).addClass('on').siblings().removeClass('on');
};