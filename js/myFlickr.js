const main = document.querySelector("section");
const frame = document.querySelector("#gallery"); 
const input =document.querySelector(".search");
const btn = document.querySelector("button");
const loading = document.querySelector(".loading");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.people.getPhotos";
const method2 = "flickr.photos.search";
const user_id = "194106842@N02";
const key = "c28561608d1c0e9f7db60ecfda79bf27";
const per_page = 50; 
const format = "json"; 

const url1 = `${base}method=${method1}&api_key=${key}&user_id=${user_id}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

callData(url1);

function callData(url){
    frame.innerHTML="";
    loading.classList.remove("off");
    frame.classList.remove("on");

    fetch(url)
    .then(data=>{
       let result = data.json(); 
       return result; 
    })
    .then(json=>{   
       let items = json.photos.photo;   
       createList(items);
       delayLoading();
       
    })
    
 }

 function createList(items){
    let htmls =""; 
    
    //배열의 갯수만큼 반복
    items.map(data=>{
       console.log(data);      
 
       let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
       let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
 
       htmls+=`
             <li class="item">
                <div>
                    <h2>${data.title}</h2>
                    <a href="${imgSrcBig}">
                        <img class="thumb" src="${imgSrc}" alt="">
                    </a>
                    <p>${data.owner}</p>
                    <span>Lorem ipsum dolor sit.</span>
                </div>
             </li>
       `;
    }); 
 
    frame.innerHTML = htmls; 
 }

 function delayLoading(){
    //동적으로 생성된 이미지의 전체 갯수를 구함 
    const imgs = frame.querySelectorAll("img"); 
    const len = imgs.length; 
    let count = 0; 
 
    //이미지 갯수만큼 반복을 돌면서 
    for(let el of imgs){
       //각 이미지가 로딩이 완료되면 1씩 count값 증가 
       el.onload =()=>{
          count++; 
 
          //모든 이미지가 로딩이 완료되면 isoLayout 함수 호출 
          if(count === len) isoLayout(); 
       }

       let thumb = el.closest(".item").querySelector(".thumb");
       thumb.onerror = e =>{
          e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "default.jpg"); 
       }

    }
 }

function isoLayout(){
    loading.classList.add("off");
    frame.classList.add("on"); 

    new Isotope("#gallery",{
        itemSelector :".item", 
        columnWidth : ".item", 
        transitionDuration : "0.5s"
    })
}