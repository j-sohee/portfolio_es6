const body = document.querySelector("body");
const main = document.querySelector("#vidGallery");
const key = "AIzaSyAAMk0RKq2aVlltRyS8dlW_Hr1zw8_ouCs";
const playListId = "PL_R5V_bKthTtOskiIsA-w_VcyqRlaLdc0";
const num = 8;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet&playlistId=${playListId}&maxResults=${num}`;

fetch(url)
.then(data=>{
   return  data.json();
})
.then(json=>{
    const items = json.items;

    let result = "";
    items.map(item=>{

        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt.split("T")[0];
        
        if(tit.length > 20) tit = tit.substr(0, 20)+"...";
        if(desc.length > 100) desc = desc.substr(0, 100)+"...";
        result += `
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.standard.url}">
                </a>
                <div class="con">
                    <h2>${tit}</h2>
                    <p>${desc}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;

        main.innerHTML = result;
    })
})

//썸네일 클릭시 팝업생성
main.addEventListener("click", e=>{
    e.preventDefault();
    
    if(e.target.parentElement.nodeName !== "A") return;
    const vidId = e.target.closest("a").getAttribute("href");
    console.log(vidId);
    //console.log(e.target.parentElement.nodeName);

    let pop = document.createElement("aside");
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="close">CLOSE</span>
    `;

    body.append(pop);
});

//팝업 닫기버튼 클릭시 팝업제거
body.addEventListener("click", e=>{
    const pop = body.querySelector("aside");
    if(pop == null) return;

    const close = pop.querySelector("span");
    if(e.target == close) e.target.closest("aside").remove();
})

