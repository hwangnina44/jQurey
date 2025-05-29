///1cutslide-2.js
/* $(document).ready(function(){

    //
    var width = $('#slider').width();
    console.log(width);
    //
    $('#pager li').click(function(){
        
        var ind=$(this).index();
        console.log(ind);
    //
        $('#gallery').animate({
            marginLeft :-width*ind*num
        },800);
    });
}); */


/* 
//슬라이드 하나의 너비 구하기 -width();
클릭대상 : #pager li
슬라이드가 이동하려면, 이동대상은 누구?#gallery
어떻게 이동할까요?


0번을 이동했을 때 : 1번 슬라이드, 0 
1번을 이동했을 때 : 2번 슬라이드, -1200
2번을 이동했을 때 : 2번 슬라이드, -2400
3번을 이동했을 때 : 2번 슬라이드, -3600

>>곱해지는 값을 내가 클릭하는 li의 인덱스 값으로 사용하자! */


 $(function(){
    var imgWidth = $('#gallery img').width();
    console.log(imgWidth);
    stat=0;

    $('#pager li').click(function(){
       
        var idx=$(this).index();
        //이동거리를 px로 사용!!
        /* $('#gallery').animate({
            marginLeft :-(imgWidth*idx)
        },1000);  */
        //이동거리를 %로 사용!
        $('#gallery').animate({
           // marginLeft : -(100*idx)+'%'
           left : -(100*idx)+"%"
        },1000);
        //버튼 변경
        $(this).addClass('active').siblings().removeClass('active');
        

    });
});  


/*  
 $(function(){
    var num= 0;
    var width = $('#gallery').width();
    var widthLi = $('#gallery img').width();
    console.log(width);
   
    $(document).ready(function(){
        
         for(var num=0; num < width-widthLi ; num++){
            
            $('#gallery').animate({
                marginLeft :-num
            },1000);
        }
        num=0; 
    });

});
  */