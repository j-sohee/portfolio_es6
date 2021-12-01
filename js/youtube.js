
class Youtube{
    constructor(option){
        this.init(option);
        this.bindingEvent();
    }
    
    init(option){
    
        if(option.frame === undefined){
            console.error("frame속성값은 필수 입력사항입니다.");
            return;
        }
        if(option.key == undefined){
            console.error("key값은 필수 입력값입니다.");
            return;
        }
        if(option.playlist === undefined){
            option.playlist = "PL_R5V_bKthTtOskiIsA-w_VcyqRlaLdc0"
        }
        if(option.num === undefined){
            opt.num = 6;
        }
    
        this.selector = option.frame;
        this.playlist =  option.playList;
        this.key = option.key;
        this.num = option.num;
    }
    
    bindingEvent(){
        this.getYoutube();
    
        //썸네일 클릭시 팝업호출
        $("body").on("click", this.selector+" article a", e=>{
            e.preventDefault();
            this.cratePop(e.currentTarget);
        });
    
        $("body").on("click", ".vidpop span", ()=>{
            $(".vidpop").remove();
        })
    }
    
    getYoutube(){
        $.ajax({
            url:"https://www.googleapis.com/youtube/v3/playlistItems",
            dataType : "jsonp",
            data : {
                part : "snippet",
                key : this.key,
                maxResults : this.num,
                playlistId : this.playlist
            }
        })
        .success(data=>{
        
            let items = data.items;
        
            $(items).each((_, data)=>{
        
                let txt = data.snippet.description; //본문
                let tit = data.snippet.title; // 타이틀
                let len = txt.length;
                let titLen = tit.length;
                let date = data.snippet.publishedAt;
                date = date.split("T")[0];
        
                if( len >  70){
                    txt = txt.substr(0, 80) + "...";
                }
                if( titLen > 50){
                    tit = tit.substr(0, 50) + "...";
                }
        
                $(this.selector)
                    .append(
                        $("<article>")
                            .append(
                                $("<a>").attr({ href : data.snippet.resourceId.videoId})
                                        .append(
                                            $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                         ),
                                $("<div class='btns'>")
                                .append(
                                    $("<a>").attr({ href : data.snippet.resourceId.videoId})
                                            .text("VIEW")
                                ),
                                $("<div class='con'>")
                                        .append(
                                            $("<h3>").text(tit),
                                            $("<p>").text(txt)
                                        )
                            )
                    )
            });
        });
        // .error(err=>{
        //     console.error(err); 
        // });
    }
    
    cratePop(item){
        let vidId = $(item).attr("href");
        
        $("body")
            .append(
                $("<div class='vidpop'>")
                    .append(
                        $("<iframe>").attr({
                            src : "https://www.youtube.com/embed/"+vidId,
                            frameborder : 0,
                            width:"100%",
                            height: 600
                        }),
                        $("<span>").text("close")
                    )
            )
    }
}

