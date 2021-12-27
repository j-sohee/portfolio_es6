//skip navi
const skip_btn = document.querySelectorAll("#skip a");
skip_btn.forEach((btn,index)=>{
    btn.addEventListener("focusin", e=>{
        e.currentTarget.classList.add("on");
    })
    btn.addEventListener("focusout", e=>{
        e.currentTarget.classList.remove("on");
    })
})

const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();
    
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

const slider = document.querySelector("#slider");
const ul = slider.querySelector("ul");
const lis1 = ul.querySelectorAll("li");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const speed = 500;
const len1 = lis1.length;
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
    ul.style.width = `${100*len1}%`;
    lis1.forEach(li=> li.style.width = `${100/len1}%`);
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
const lis2 = document.querySelectorAll("#navi li");
const lis_arr = Array.from(lis2);
const len2 = sections.length;
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
            lis2.forEach((el,i)=>{
                el.classList.remove("on");
                sections[i].classList.remove("on");
            })

            lis2[index].classList.add("on");
            sections[index].classList.add("on");
        }
    })
})

lis2.forEach((el,index)=>{
    el.addEventListener("click", e=>{
        new Anim(window, {
            prop:"scroll",
            value:posArr[index],
            duration:500
        })
        for(let el of lis2){
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
