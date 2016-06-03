jQuery(document).ready(function($) {
    //左侧菜单
    $(".g-menu").click(function(e){
        $(".box-left").toggleClass('ok');
    })

    $(window,"body").click(function(){
        $(".box-left").removeClass('ok');
        $(".hd-personal .box").slideUp();
    })

    $(".box-left li .a1").click(function(){
        $(this).parents("li").toggleClass('on');
        $(this).parents("li").siblings('li').removeClass('on');
        $(this).parents("li").find('dl').stop().slideToggle();
        $(this).parents("li").siblings('li').find('dl').stop().slideUp();
    })


    //
    $(".hd-personal .btn").click(function(){
        $(this).parents(".hd-personal").find('.box').stop().slideToggle();
    })


    $(".box-left,.g-menu,.hd-personal .box,.hd-personal").click(function(e){
        e.stopPropagation();
    })
});