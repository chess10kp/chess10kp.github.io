let decimal=document.querySelectorAll(".input");
let radio_list=document.querySelectorAll(".radio");


let submit_btn=document.querySelector("#submit");

submit_btn.addEventListener("click", function()
{
    for (let i=0; i<radio_list.length; i++)
    {
        if (radio_list[i].checked && radio_list[i].value=="roman") //for roman converwsion
        {
            for (let j=0; j<decimal.length; j++)
            {
                if (decimal[j].name=="decimal")
                {
                    decimal[j].value=RomanToInt(decimal[i].value)
                }
                else if (decimal[j].name=="binary")
                {
                    decimal[j].value=DecimalToBinary(RomanToInt(decimal[i].value))
                }
            }
        }
        else if(radio_list[i].checked && radio_list[i].value=="decimal") //for decimal conversion
        {
            for (let j=0; j<decimal.length; j++)
            {
                if (j!=i && decimal[j].name=="roman")
                {
                    decimal[j].value=IntToRoman(decimal[i].value)
                }
                else if (j!=i && decimal[j].name=="binary")
                {
                    decimal[j].value=DecimalToBinary(decimal[i].value)
                }
            }
        }
        else if (radio_list[i].checked && radio_list[i].value=="binary")
        {
            for (let j=0; j<decimal.length; j++)
            {
                if (j!=i && decimal[j].name=="roman")
                {
                    decimal[j].value=IntToRoman(BinaryToDecimal(decimal[i].value))
                }
                else if (j!=i && decimal[j].name=="decimal")
                {
                    decimal[j].value=BinaryToDecimal(decimal[i].value)
                }
            }
        }
    }
})

function IntToRoman(value)
{
    let roman = new Array();
    roman = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let decimal = new Array();
    decimal = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

    if (value <= 0 || value >= 4000) 
    {
        
        return "Number needs to be between 0 and 4000 exclusive"};
    var romanNumeral = "";
    for (var i=0; i<roman.length; i++) {
      while (value >= decimal[i]) { 
        value -= decimal[i];
        romanNumeral += roman[i];
      }
    }
    return romanNumeral;

    
}


function RomanToInt(x)
{
    RomVals={"M":1000,"C":100,"D":500,"X":10,"V":5,"I":1}

    let int_val=0;
  
    for (let i=0;i<x.length;i++)
    {
     
        if (i!=0)
        {
            if (RomVals[(x[i-1])]<RomVals[(x[i])])
            {
                int_val+=RomVals[x[i]]-RomVals[x[i-1]];
            }
            else
            {
                int_val+=RomVals[x[i]];
            }
        }
        else
        {
            int_val+=RomVals[x[i]];
        }
       
        
    }
    return int_val;
}

function DecimalToBinary(x)
{
    
    let n="";
    while (x>1)
    {
        n= (Math.floor(x%2)).toString()+n;
        x/=2;

    }

return n;
}

function BinaryToDecimal(x)
{
    let n=0;


    for (let i=0 ;i<=x.length-1;i++)
    {
        n+=Number(x[i])*2**(x.length-i-1)
        
       
    }

    return n;
}