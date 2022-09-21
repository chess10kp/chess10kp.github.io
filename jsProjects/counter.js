let counter=document.querySelector("#counter_val");

let b1=document.querySelector("#b1");
let b2=document.querySelector("#b2");
let b3=document.querySelector("#b3");

let current_count=0;

b1.addEventListener("click",function(){
    current_count++;
    counter.textContent=current_count;
})

b2.addEventListener("click",function(){
    current_count=0;
    counter.textContent=0;
})

b3.addEventListener("click",function(){
    if (current_count!=0){
    current_count--;
    counter.textContent=current_count;}
})