//header 2depth menu
$("#gnb>li").on("mouseenter", function(){
    $(this).find(".gnb_2depth").show();
})
$("#gnb>li").on("mouseleave", function(){
    $(this).find(".gnb_2depth").hide();
})

$("#gnb>li").each(function(index){
    $("#gnb>li").eq(index).find("a").on("focusin", function(){
        $("#gnb>li").eq(index).find(".gnb_2depth").show();     
    });

    $("#gnb>li").eq(index).find("a").last().on("focusout", function(){
        $("#gnb>li").eq(index).find(".gnb_2depth").hide();
    });
});

//gnbMo
var btnCall = document.querySelector(".btnCall");
var menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}
//main scroll
const boxs = document.querySelectorAll(".myScroll");
const btns = document.querySelectorAll("#navi li");
const btns_arr = Array.from(btns);
let posArr = [];
let len = boxs.length;
let baseLine = -300;

setPos();

window.addEventListener("scorll", e=>{
    let scroll = window.scrollY || window.pageYOffset;
    boxs.forEach((el,index)=>{
        if(scroll >= posArr[index] + baseLine){
           

            btns[index].classList.add("on");
            boxs[index].classList.add("on");
        }
    })
})

btns.forEach((el,index)=>{
    el.addEventListener("click", e=>{
        new Anim(window,{
            prop : "scroll",
            value : posArr[index],
            duration:500
        })
        for(let el of btns){
            el.classList.remove("on");
        }
        e.currentTarget.classList.add("on");
    })
})

function setPos(){
    posArr=[];
    for(let el of boxs){
        posArr.push(el.offsetTop);
    }
}


//navi버튼을 클릭했을 때
$("#navi li a").on("click", function(e){
    e.preventDefault();

    let target = $(this).attr("href");
    let targetPos = $(target).offset().top;

    $("html,body").animate({ 
        scrollTop : targetPos 
    }, 1000)
});

//main slider
const $visual = $(".visual");
const $mainTit = $visual.find("#mainTit")
const $mainVisual = $(".visual2 .mainVisual")
const $smallVisual = $visual.find(".smallVisual");
const $next = $(".next");
const $prev = $(".prev");
let num = 0;
let speed = 500;

$mainVisual.find("li").last().prependTo($mainVisual);


$next.on("click", function(e){
    e.preventDefault();

    next_slider($mainVisual);

    $mainTit.find("li.on").addClass("upper");
    $smallVisual.find("li.on").addClass("upper");
    
    
    setTimeout(function(){
        $mainTit.find("li").removeClass("on");
        $mainTit.find("li").removeClass("upper");
        $smallVisual.find("li").removeClass("on");
        $smallVisual.find("li").removeClass("upper");
        if(num<2){
            $mainTit.find("li").eq(num + 1).addClass("on");
            $smallVisual.find("li").eq(num + 1).addClass("on");
            num++;
        }else{
            num = 0;
            $mainTit.find("li").eq(num).addClass("on");
            $smallVisual.find("li").eq(num).addClass("on");
        }
    },speed)
});

$prev.on("click", function(e){
    e.preventDefault();

    prev_slider($mainVisual);

    $mainTit.find("li.on").addClass("upper");
    
    setTimeout(function(){
        $mainTit.find("li").removeClass("on");
        $mainTit.find("li").removeClass("upper");
        if(num>0){
            $mainTit.find("li").eq(num-1).addClass("on");
            num--;
        }else{
            num = 2;
            $mainTit.find("li").eq(num).addClass("on");
        }
    },500)
});

function prev_slider(el){
    el.animate({marginLeft : "0%"}, speed,function(){
        el.css({marginLeft:"-100%"});
        el.find("li").last().prependTo(this);
    });
}
function next_slider(el){
    el.animate({marginLeft : "-200%"},speed,function(){
        el.css({marginLeft:"-100%"});
        el.find("li").first().appendTo(this);
    });
}

//navi
$("#navi li a").on("click", function(e){
    e.preventDefault();
    let target = $(this).attr("href");
    let targetPos = $(target).offset().top;

    $("html,body").animate({
        scrollTop : targetPos
    },1000);
});



//쿠키팝업----------------------------------------------
const popup = document.querySelector("#popup");
const btnClose = popup.querySelector(".close");
const isCookie = document.cookie.indexOf("today=done");

if(isCookie == -1){
    popup.style.display = "block";
}else{
    popup.style.display = "none";
}

btnClose.addEventListener("click", e=>{
    e.preventDefault();

    let isChecked = popup.querySelector("input[type=checkbox]").checked;
    if(isChecked) setCookie("today", "done", 1);
    popup.style.display = "none";
    
})

function setCookie(name, val, due){
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + due);
    const duedate = today.toGMTString();
    document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}