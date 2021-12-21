const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();
    
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

const sections = document.querySelectorAll(".myScroll");
const lis = document.querySelectorAll("#navi li");
const lis_arr = Array.from(lis);
const len = sections.length;
const speed = 500;
let posArr = [];
let base = -200;

setPos();
window.addEventListener("resize", ()=>{
    setPos();
    let activeItem = document.querySelector("ul li.on");
    let activeInedx = lis_arr.indexOf(activeItem); 
 
    //모션없이 해당위치로 바로 이동
    window.scroll(0, posArr[activeInedx]);
 })
 
 window.addEventListener("mousewheel", e=>{
    e.preventDefault();
 
    let activeItem = document.querySelector("ul li.on");
    let activeIndex = lis_arr.indexOf(activeItem);
    let targetIndex;
 
    //마우스휠을 올리면(-100)
    if(e.deltaY < 0){
       if(activeIndex == 0) return;
       targetIndex = activeIndex -1;
    }else{
       if(activeIndex == len-1) return;
       //마우스휠을 내리면(100)
       targetIndex = activeIndex +1;
    }
 
    new Anim(window, {
       prop : "scroll",
       value : posArr[targetIndex],
       duration : speed
    })
 }, {passive : false})
 
 

window.addEventListener("scroll", e=>{
    let scroll = window.scrollY || window.pageYOffset;
    sections.forEach((el,index)=>{
        if(scroll >= posArr[index] + base){
            lis.forEach((el,i)=>{
                el.classList.remove("on");
                sections[i].classList.remove("on");
            })

            lis[index].classList.add("on");
            sections[index].classList.add("on");
        }
    })
})

lis.forEach((el,index)=>{
    el.addEventListener("click", e=>{
        new Anim(window, {
            prop:"scroll",
            value:posArr[index],
            duration:500
        })
        for(let el of lis){
            el.classList.remove("on");
        }
        e.currentTarget.classList.add("on");
    })
})

function setPos(){
    posArr = [];
    for(let el of sections){
        posArr.push(el.offsetTop);
    }
}