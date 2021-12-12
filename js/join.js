class Validation {
    constructor(selector, arr){
       this.form = document.querySelector(selector);
       this.btnSubmit = document.querySelector("input[type=submit]");
 
       arr.forEach(opt =>{
          this.btnSubmit.addEventListener("click", e=>{
             if(opt.type==="text"){
                if(!this.isTxt(opt.name, opt.len)) e.preventDefault();
             }
             if(opt.type==="email"){
                if(!this.isEmail(opt.name, opt.len)) e.preventDefault();
             }
             if(opt.type==="check"){
                if(!this.isCheck(opt.name)) e.preventDefault();
             }
             if(opt.type==="select"){
                if(!this.isSelect(opt.name)) e.preventDefault();
             }
             if(opt.type==="password"){
                if(!this.isPwd(opt.name[0], opt.name[1], opt.len)) e.preventDefault();
             }
          })
       })
    }
 
    isTxt(name, len){
        const input = this.form.querySelector(`[name=${name}]`);
        const txt = input.value;
        if(txt.length > len){
           const errMsgs = input.closest("td").querySelectorAll("p");
           if(errMsgs.length > 0) input.closest("td").querySelctor("p").remove();
           return true;
        }else{
           const errMsgs = input.closest("td").querySelectorAll("p");
           if(errMsgs.length> 0) input.closest("td").querySelctor("p").remove();
           const errMsg = document.createElement("p");
           errMsg.append(`입력항목을 ${len}글자 이상 입력하세요.`);
           input.closest("td").append(errMsg);
  
           return false;
        }
     }
 
    isEmail(name, len){
       const input = this.form.querySelector(`[name=${name}]`);
       const txt = input.value;
 
       if(txt.length > len && /@/.test(txt)){
          const errMsgs = input.closest("td").querySelectorAll("p");
          if(errMsgs.length > 0) input.closest("td").querySelctor("p").remove();
          return true;
       }else{
          const errMsgs = input.closest("td").querySelectorAll("p");
          if(errMsgs.length > 0) input.closest("td").querySelctor("p").remove();
          const errMsg = document.createElement("p");
          errMsg.append(`@를 포함한 전체 이메일 주소를 ${len}글자 이상 입력하세요.`);
          input.closest("td").append(errMsg);
 
          return false;
       }
    }
 
    isCheck(name){
       const inputs = this.form.querySelectorAll(`[name=${name}]`);
       let isChecked = false;
 
       for(let input of inputs){
          if(input.checked) isChecked = true;
       }
 
       if(isChecked){
          const errMsgs = inputs[0].closest("td").querySelectorAll("p");
          if(errMsgs.length > 0) inputs[0].closest("td").querySelctor("p").remove();
          return true;
       }else{
          const errMsgs = inputs[0].closest("td").querySelectorAll("p");
          if(errMsgs.length > 0) inputs[0].closest("td").querySelctor("p").remove();
          const errMsg = document.createElement("p");
          errMsg.append(`필수 입력항목을 하나이상 체크해주세요.`);
          inputs[0].closest("td").append(errMsg);
 
          return false;
       }
    }
 
    isSelect(name){
       const sel = this.form.querySelector(`[name=${name}]`);
       const sel_index = sel.options.selectedIndex;
       const val = sel.options[sel_index].value;
 
       if(val !== ""){
          const errMsgs = sel.closest("td").querySelectorAll("p");
          if(errMsgs.length > 0) sel.closest("td").querySelctor("p").remove();
          return true;
       }else{
          const errMsgs = sel.closest("td").querySelectorAll("p");
          if(errMsgs.length > 0) sel.closest("td").querySelctor("p").remove();
          const errMsg = document.createElement("p");
          errMsg.append(`항목을 선택해주세요`);
          sel.closest("td").append(errMsg);
 
          return false;
       }
    }
 
    isPwd(name1, name2, len){
       const pwd1 = this.form.querySelector(`[name=${name1}]`);
       const pwd2 = this.form.querySelector(`[name=${name2}]`);
       const pwd1_val = pwd1.value;
       const pwd2_val = pwd2.value;
 
       const num = /[0-9]/;
       const eng = /[a-zA-z]/;
       const spc = /[!@#$%^&*()_]/;
 
       if(pwd1_val === pwd2_val && pwd1_val.length > len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){
          const errMsgs = pwd1.closest("td").querySelectorAll("p");
          if(errMsgs.length > 0 ) pwd1.closest("td").querySelector("p").remove();
          return true;
       }else{
          const errMsgs = pwd1.closest("td").querySelectorAll("p");
          if(errMsgs.length > 0 ) pwd1.closest("td").querySelector("p").remove();
 
          const errMsg = document.createElement("p");
          errMsg.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 모두 포함해서 동일하게 입력하세요.`);
          pwd1.closest("td").append(errMsg);
 
          return false;
 
       }
    }
 }