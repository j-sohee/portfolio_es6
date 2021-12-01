
class MyForm{
    constructor(selector,options){
        if(!selector){
            console.error("form 선택자는 필수입력사항입니다.");
            return;
        }
        this.init(selector);
        this.bindingEvent(options);
    }
    
    init(selector){
        this.form = $(selector);
        this.btnSubmit = this.form.find("input[type=submit]");
        this.frame = $(".wrap");
        this.btns = this.frame.find("dl dt a");
        this.boxs = this.frame.find("dl dd");
        this.speed = 500;
        
    }
    
    bindingEvent(options){

        //약관동의 이벤트
        this.btns.on("click", e=>{
            e.preventDefault();
        
            let i = $(e.currentTarget).parent().index();
            let isOn = $(e.currentTarget).hasClass("on");
        
            $(e.currentTarget).removeClass("on");
        
            if(isOn){
                $(e.currentTarget).removeClass("on");
                $(e.currentTarget).parent(i).next().slideUp(this.speed);
            }else{
                $(e.currentTarget).addClass("on");
                $(e.currentTarget).parent(i).next().slideDown(this.speed);
            }
        });
        
        //input_submit
        options.forEach((opt)=>{
            this.btnSubmit.on("click", e=>{
                e.preventDefault();
                if(opt.type == "text"){
                    if(!this.isTxt(opt.name, opt.len)) e.preventDefault();
                }
                if(opt.type == "email"){
                    if(!this.isEmail(opt.name)) e.preventDefault();
                }
                if(opt.type == "password"){
                    if(!this.isPwd(opt.name[0], opt.name[1], opt.len)) e.preventDefault();
                }
            }); 
        });
    }

    //텍스트 인증 함수 정의
    isTxt(name, len){
    
        if(len == undefined) len = 5;
        let txt = $("[name="+name+"]").val();
    
        if(txt.length >= len){
            $("[name="+name+"]").parent().find(".err_txt").remove();
            return true;
        }else{
            $("[name="+name+"]").parent().find(".err_txt").remove();
            $("[name="+name+"]").parent().append(
                $("<div class='err_txt'>").append(
                    "<p>입력항목을 "+len+"글자 이상 입력하세요"
                )
            )
        }
        return false;
    }
    
    //이메일 인증함수 정의
    isEmail(name){
    
        let txt = $("[name="+name+"]").val();
        if(/@/.test(txt)){
            $("[name="+name+"]").parent().find(".err_txt").remove();
            return true;
        }else{
            $("[name="+name+"]").parent().find(".err_txt").remove();
            $("[name="+name+"]").parent().append(
                $("<div class='err_txt'>").append(
                    "<p>@를 포함한 전체 메일주소를 입력하세요."
                )
            );
            return false;
        }
    }
    
    isPwd(name1,name2,len){
        let pwd1 = $("input[name="+name1+"]").val();
        let pwd2 = $("input[name="+name2+"]").val();
    
        let num = /[0-9]/;
        let eng = /[a-zA-z]/;
        let spc = /[~!@#$%^&*()_+\[\]-]/;
    
        if(pwd1 === pwd2 && pwd1.length>=len && num.test(pwd1) && eng.test(pwd1) && spc.test(pwd1)){
            $("input[name="+name1+"]").parent().find(".err_txt").remove();
        }else{
            $("input[name="+name1+"]").parent().find(".err_txt").remove();
            $("[name="+name1+"]").parent().append(
                $("<div class='err_txt'>").append(
                    "<p>비밀번호는 "+len+"글자 이상 영문,특수문자,숫자를 포함해서 동일하게 입력하세요."
                )
            );
            return false;
        }
    }
    
}