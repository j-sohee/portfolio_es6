const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();
    
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

//slider
const slider = document.querySelector("#visual #slider");
const ul = slider.querySelector("ul");
const slider_lis = ul.querySelectorAll("li");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slider_len = slider_lis.length;
let enableClick = true;

init();

next.addEventListener("click", e=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        nextSlide();
    }
})

prev.addEventListener("click", e=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        prevSlide();
    }
})

function init(){
    ul.style.width = `${100*slider_len}%`;
    slider_lis.forEach(li=> li.style.width = `${100/slider_len}%`);
    ul.style.left = "-100%";
    ul.prepend(ul.lastElementChild);
}

function nextSlide(){
    new Anim(ul, {
        prop : "left",
        value : "-200%",
        duration: speed,
        callback : ()=>{
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    })
}

function prevSlide(){
    new Anim(ul, {
      prop: "left",
      value: "0%",
      duration: speed,
      callback: ()=>{
         ul.style.left= "-100%";
         ul.prepend(ul.lastElementChild);
         enableClick = true;
      }
   })
}

//scroll
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