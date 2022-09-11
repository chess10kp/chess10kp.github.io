let btn=document.querySelector("#generate_button");
let t=document.querySelector("#color_name");
let arr_gen=document.querySelector("#arr_generate_button")
let arr_t=document.querySelector("#arr_color_name")
let root=document.querySelector(":root");

root.style.setProperty('--default', 'lightblue');

let randNo,randCode="";
btn.addEventListener("click",function(){
    randCode="";
    for (let i=0;i<6;i++){
        randNo=Math.floor(Math.random()*16);
        if (randNo>9)
        {
            switch(randNo)
            {
                case 10: 
                    randCode+="a";
                    break;
                case 11:
                    randCode+="b";
                    break;
                case 12:
                    randCode+="c";
                    break;
                case 13:
                    randCode+="d";
                    break;
                case 14:
                    randCode+="e";
                    break;
                case 15:
                    randCode+="f";
                    break;
            }
        }
        else
        {
            randCode+=(randNo.toString());
        }
        root.style.setProperty("--default","#"+randCode);
        t.textContent="#"+randCode;
    }

})