
class Myflickr{
   constructor(){
      this.body = document.querySelector("body");
      this.frame = document.querySelector("#gallery"); 
      this.input =document.querySelector(".search");
      this.searchBtn = document.querySelector(".searchBtn");
      this.resetBtn = document.querySelector(".resetBtn");
      this.loading = document.querySelector(".loading");
      this.base = "https://www.flickr.com/services/rest/?";
      this.method1 = "flickr.people.getPhotos";
      this.method2 = "flickr.photos.search";
      this.user_id = "194606222@N04";
      this.key = "c28561608d1c0e9f7db60ecfda79bf27";
      this.per_page = 20; 
      this.format = "json"; 

      this.url1 = `${this.base}method=${this.method1}&api_key=${this.key}&user_id=${this.user_id}&per_page=${this.per_page}&format=${this.format}&nojsoncallback=1`;

      this.callData(this.url1);

      this.searchBtn.addEventListener("click", e=>{
         let tag = this.input.value;
         if( tag == "") return; 
      
         const url = `${this.base}method=${this.method2}&api_key=${this.key}&per_page=${this.per_page}&format=${this.format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
      
         this.callData(url);
      });
      
      this.resetBtn.addEventListener("click", e=>{
         this.callData(this.url1);
      })
      
      this.input.addEventListener("keypress", e=>{
         if(e.key == "Enter"){
            console.log(e.key);
            let tag = this.input.value;
            if( tag == "") return;

            const url = `${this.base}method=${this.method2}&api_key=${this.key}&per_page=${this.per_page}&format=${this.format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
            
            this.callData(url);
         }
      });
   
      
      this.frame.addEventListener("click", e=>{
         e.preventDefault();
         if(e.target !== e.target.closest(".item").querySelector(".thumb")) return;
         let target = e.target.closest(".item");
         let imgSrc = target.querySelector("a").getAttribute("href");
      
         let pop = document.createElement("aside");
         let pops = `
                     <img src="${imgSrc}">
                     <span class="close">CLOSE</span>
         `;
         pop.innerHTML = pops;
         document.querySelector("body").append(pop);
      })
      
      this.body.addEventListener("click", e=>{
         let target = e.target.closest("aside");
         if(target !== null){
            let close = target.querySelector(".close");
            if(e.target == close) target.remove();
         }
      })
      
   }
   callData(url){
      this.frame.innerHTML="";
      this.loading.classList.remove("off");
      this.frame.classList.remove("on");
  
      fetch(url)
      .then(data=>{
         let result = data.json(); 
         return result; 
      })
      .then(json=>{   
         let items = json.photos.photo;  
         this.createList(items);
         this.delayLoading();
      })
   }
   createList(items){
      let htmls =""; 
      
      //????????? ???????????? ??????
      items.map(data=>{ 
   
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
   
      this.frame.innerHTML = htmls; 
   }
  
   delayLoading(){
      //???????????? ????????? ???????????? ?????? ????????? ?????? 
      const imgs = this.frame.querySelectorAll("img"); 
      const len = imgs.length; 
      let count = 0; 
   
      //????????? ???????????? ????????? ????????? 
      for(let el of imgs){
         //??? ???????????? ????????? ???????????? 1??? count??? ?????? 
         el.onload =()=>{
            count++; 
   
            //?????? ???????????? ????????? ???????????? isoLayout ?????? ?????? 
            if(count === len) this.isoLayout(); 
         }
  
         let thumb = el.closest(".item").querySelector(".thumb");
         thumb.onerror = e =>{
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "default.jpg"); 
         }
  
      }
   }
   isoLayout(){
      this.loading.classList.add("off");
      this.frame.classList.add("on"); 
  
      new Isotope("#gallery",{
          itemSelector :".item", 
          columnWidth : ".item", 
          transitionDuration : "0.5s"
      })
  }
}







