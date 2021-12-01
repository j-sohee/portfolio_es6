
const swiper = new Swiper('.inner .dpt1 .right', {

    //페이징 버튼 옵션
    pagination : {
        el : ".swiper-pagination",
        clickable : true
    },
    loop : true, // 순환여부결정
    speed : 500, //슬라이딩 속도
    direction : "horizontal", //슬라이딩방향 vertical:세로
    spaceBetween : 0, // 사이간격( 숫자 px )
    slidesPerview : 1, //하나의 화면 당 보일 패널의 갯수
    grabCursor : true, // 마우스커서모양변경
    //자동롤링
    autoplay : {
        delay : 1000,
        disableOnInteraction : true // false:롤링중에 스와이퍼 되더라도 계속 롤링 //true:롤링중에 스와이퍼 되면 롤링 중지
    }
});


swiper.autoplay.stop();


