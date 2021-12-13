class Youtube{
    constructor(selector,opt){
        this.body = document.querySelector("body");
        this.main = document.querySelector(selector);
        this.key = opt.api_key;
        this.playListId = opt.playList;
        this.num = opt.count;
        this.url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${this.key}&part=snippet&playlistId=${this.playListId}&maxResults=${this.num}`;

        this.createList(this.url);
        this.main.addEventListener("click", e=> this.createPop(e));
        this.body.addEventListener("click", e=> this.removePop(e))
    }

    createList(url){
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
            })
            
            this.main.innerHTML = result;
        })
    }
    createPop(e){
        e.preventDefault();
        
        if(e.target.parentElement.nodeName !== "A") return;
        const vidId = e.target.closest("a").getAttribute("href");
        //console.log(e.target.parentElement.nodeName);
    
        let pop = document.createElement("aside");
        pop.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
            <span class="close">CLOSE</span>
        `;
    
        this.body.append(pop);
    }
    removePop(e){
        const pop = this.body.querySelector("aside");
        if(pop == null) return;
    
        const close = pop.querySelector("span");
        if(e.target == close) e.target.closest("aside").remove();
    }
}





