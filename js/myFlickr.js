
class Myflickr{
    constructor(options){
        this.init(options);
        this.bindingEvent();
    }
    
    init(options){
        this.gallery = $(options.frame);
        this.search = $(options.searchFrame);
        this.searchBtn = this.search.find("button");
        this.input = this.search.find("input");
        this.userId = options.user_id;
        this.apiKey = options.api_key;
        this.count = options.count;
        this.type = options.type;
        this.logo = $(options.title);
    }
    
    bindingEvent(){
        this.getList({
            type:this.type,
            user_id: this.userId
        })
        
        this.searchBtn.on("click", ()=>{
        
            let inputs = this.input.val();
        
            if(!inputs){
                alert("검색어를 입력하세요");
                return;
            }
        
            this.gallery.removeClass("on");
            $(".loading").removeClass("off");
        
            this.input.val("");
    
            this.getList({
                type:"search",
                tag : inputs
            });
    
        });

        this.logo.on("click", ()=>{

            this.gallery.removeClass("on");
            $(".loading").removeClass("off");

            this.getList({
                type:"userid",
                user_id:this.userId
            })
        })
        
        $(window).on("keypress", e=>{
            if(e.keyCode == 13){
        
                let inputs = this.input.val();
        
                if(!inputs){
                    alert("검색어를 입력하세요");
                    return;
                }
                this.gallery.removeClass("on");
                $(".loading").removeClass("off");
        
               
                this.input.val("");
                this.getList({
                    type:"search",
                    tag : inputs
                });
            }
        })
        
        $("body").on("click", this.gallery.selector+" article a", e=>{
            e.preventDefault();
        
            let imgSrc = $(e.currentTarget).attr("href");
        
            $("body").append(
                $("<div class='pop'>")
                    .append(
                        $("<img>").attr({src : imgSrc }),
                        $("<span>").text("close")
                    )
            )
        })
        
        $("body").on("click", ".pop span", ()=>{
            $(".pop").remove();
        })
    }
    
    
    
    getList(opt){
        let result_opt = [];
    
        if(opt.type == "interesting"){
            result_opt = {
                url : "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
                dataType : "json",
                data : {
                    api_key : this.apiKey,
                    per_page : this.count,
                    format: "json",
                    nojsoncallback:1,
                    privacy_filter:1,
                }
            }
        }
    
        if(opt.type == "search"){
            result_opt = {
                url : "https://www.flickr.com/services/rest/?method=flickr.photos.search",
                dataType : "json",
                data : {
                    api_key : "c28561608d1c0e9f7db60ecfda79bf27",
                    per_page : 20,
                    format: "json",
                    nojsoncallback:1,
                    privacy_filter:1,
                    tags : opt.tag
                }
            }
        }
    
        if(opt.type == "userid"){
            result_opt = {
                url:"https://www.flickr.com/services/rest/?method=flickr.people.getPhotos", 
                dataType:"json", 
                data:{
                    api_key:"c28561608d1c0e9f7db60ecfda79bf27",
                    per_page:20, 
                    format:"json",
                    nojsoncallback:1, 
                    privacy_filter : 1, 
                    user_id : opt.user_id
                }
            }
        }
    
        $.ajax(result_opt)
        .success(data=>{
    
            let items = data.photos.photo;
    
            this.createList(items);
            this.loadImg();
        })
        
        .error(err=>{
            console.err("데이터를 호출하는데 실패했습니다");
        })
    } 
    
    createList(items){
    
        this.gallery.empty();
    
        $(items).each((index,data)=>{
        
            let text = data.title; 
            if(!data.title){
                text = "No description in this photo";
            }
    
            this.gallery.append(
                $("<article>")
                    .append(
                        $("<div class='list'>")
                            .append(
                                $("<div class='txt'>")
                            .append(
                                $("<p>").text("CATEGORY"),
                                $("<span>").text(data.owner),
                                $("<h2>").text(text)
                            ),
                            $("<a>").attr({
                                href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                                })
                                .append(
                                    $("<img>").attr({ src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg" })
                                )
                            )
                        
                    )
            )
        });
    }
    
    loadImg(){
        let imgNum = 0;
        let photo = this.gallery.find("article").length;
    
        this.gallery.find("article img").each((index,data)=>{
    
            data.onload = ()=>{
                imgNum++;
                console.log(imgNum);
    
                if(imgNum === photo){
    
                    $(".loading").addClass("off");
    
                    new Isotope(this.gallery.selector, {
                        itemSelector : this.gallery.selector+" article",
                        columnWidth : this.gallery.selector+" article",
                        percentPosition : true,
                        transitionDuration : "0.5s"
                    });
    
                    this.gallery.addClass("on");
                    
                }
            }
        });
    }
}
