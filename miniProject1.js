const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
console.log('Connected');
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyBtn= document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const UppercaseCheck= document.querySelector("#Uppercase");
const lowercaseCheck= document.querySelector("#Lowercase");
const NumberCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#Symbols");
const Generate= document.querySelector(".Generate");
const indicator= document.querySelector(".indicator-box");
const allCheckBox= document.querySelector("input[type=checkbox]");
const symbols="!@#$%^&*_+-";

let password="";
let passwordLength = 8;
let checkCount = 1;
handleSlider();



// set passwordlength

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.background = color;
}

function getRndInteger(min,max){
     return Math.floor(Math.random()*(max-min)) + min;
}


function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperercase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const random = getRndInteger(0,symbols.length);
    return symbols.charAt(random);
}


function calcStrength(){
    let hasUpper=false;
    let haslow =false;
    let hasNum =false;
    let hasSym = false;
    if(UppercaseCheck.checked) hasUpper=true;
    if (lowercaseCheck.checked) haslower =true;
    if (NumberCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym = true;

    if (hasUpper && haslower &&hasNum && hasSym&& passwordLength>=8){
        setIndicator("#00E500");
    }else if(
        (haslow ||hasUpper) &&
        (hasNum ||hasSym) &&
        passwordLength >=6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";

    }
    catch(e){
        copyMsg.innerText="failed";
    }

}


function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (CheckBox)=>{
        if (CheckBox.checked)
        checkCount++;
    })
    
    if(passwordLength<checkCount){
        password=checkCount;
        handleSlider();
    }
}


         //loop-forEach
// allCheckBox.forEach( (checkbox) => {
//     checkbox.addEventListener('change',handleCheckBoxChange);

// })
inputSlider.addEventListener('input',(e) => {
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value)
     
    copyContent();
})

Generate.addEventListener('click',()=>{
    if(checkCount ==0) 
    return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    // 
    password="";

    
    let funcArr = [];
    if(UppercaseCheck.checked)
       funcArr.push(generateUpperercase);
    
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
         
    }
    if(NumberCheck.checked){
        funcArr.push(generateRandomNumber)
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0;i<funcArr.length;i++){
        password+= funcArr[i]();
    }
    console.log("Compulory Addition Done");

    for(let i=0; i<passwordLength-funcArr.length;i++){
        let randIndex =getRndInteger(0,funcArr.length);
        console.log("randInex" + randIndex);
        password+= funcArr[randIndex]();

    }
    console.log("Remaining Addition Done");
    // password =sufflePassword(Array.from(password));
    console.log("suffling done");

    passwordDisplay.value = password;
    console.log("UI addition done");

    calcStrength();




});
