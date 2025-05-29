//1cutslide-1.js
//alert('연결~')

 $(document).ready(function(){

    //초기설정 - 슬라이드 배치 설정
    //이전 버튼 클릭을 대비하여 마지막 li를 첫번째로 이동
    $('.slider ul li:last').prependTo('.slider ul');

    //li 한칸의 크기 구하기 = 슬라이드 하나의 크기 구하기!
    var liW= $('.slider ul li').width();
    console.log("li하나의 너비"+liW);

    $('.slider ul').css('margin-left',-liW);

    //다음 버튼을 클릭했을때!
    $('.next a').click(function(e){
        e.preventDefault();

        $('.slider ul').animate({
            marginLeft : '-='+liW
        },800,function(){
            //다음(두번째 클릭)을 위한 준비
            //첫번쨰 li를 맨 뒤로 보내기 >>append
            //2)슬라이드 순서 변경에 따른 ul의 위치 조절하기 >>margin
           $('.slider ul li:first').appendTo('.slider ul');
           $('.slider ul').css('margin-left',-liW);
        });
    });

    //이전 버튼을 클릭했을때
    $('.prev a').click(function(evt){
        evt.preventDefault();

        $('.slider ul').animate({
            marginLeft:'+='+liW
        },800,function(){
            //다음을 위한 준비
            $('.slider ul li:last').prependTo('.slider ul');
            $('.slider ul').css('margin-left',-liW);
        });
    });
}); 
