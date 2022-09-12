let btn=document.querySelector("#generate_button");
let t=document.querySelector("#color_name");
let arr_gen_btn=document.querySelector("#arr_generate_button")
let arr_t=document.querySelector("#arr_color_name")
let root=document.querySelector(":root");

let div2=document.querySelector(".array_colors");
let nav1=document.querySelector("#st");
let nav2=document.querySelector("#nd");

root.style.setProperty('--default', 'lightblue');

let randNo,randCode="";

nav1.addEventListener("click",function(){
    div2.style.visibility="hidden";
    
    nav2.style.setProperty("color","black");
    nav1.style.setProperty("color","blue")
})

nav2.addEventListener("click",function(){
    div2.style.visibility="visible";    
    div2.style.setProperty("z-index","99");
    nav2.style.setProperty("color","blue");
    nav1.style.setProperty("color","black");
})

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
let arr_of_color=["#070707","40434E","C297B8","FDCFF3","DE89BE"];
arr_gen_btn.addEventListener("click",function(){
    let choice=Math.floor(Math.random()*(arr_of_color.length));
    root.style.setProperty("--array","#"+arr_of_color[choice]);
    arr_t.textContent="#" +arr_of_color[choice];
    root.style.setProperty("--default","#"+arr_of_color[choice]);
})

