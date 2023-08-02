//IMC data
const data = [
    {
      min: 0,
      max: 18.4,
      classification: 'Abaixo de 18,5',
      info: 'Abaixo do peso',
      obesity: 'Grau 0'
    },
    {
      min: 18.5,
      max: 24.9,
      classification:'Entre 18,6 e 24,9',
      info: 'Peso ideal',
      obesity: 'Grau 0'
    },
    {
      min: 25,
      max: 29.9,
      classification: 'Entre 25,0 e 29,9',
      info: 'Sobrepeso' ,
      obesity: 'Grau 0'
    },
    {
        min: 30,
        max: 34.9,
        classification: 'Entre 30 e 34,9',
        info: 'Obesidade Leve',
        obesity: 'Grau I'
    },
    {
      min: 35.0,
      max: 39.9,
      classification: 'Entre 35 e 39,9',
      info: 'Obesidade Severa',
      obesity: 'Grau II'
    },
    {
      min: 40,
      max: 99,
      classification: 'Entre 40 e 99',
      info: 'Obesidade Mórbida',
      obesity: 'Grau III'
    }
];

// seleção de elementos

const imcTable = document.querySelector("#imc-table")
const heightInput = document.querySelector("#height")
const weightInput = document.querySelector("#weight")
const calcBtn = document.querySelector("#calc-btn")
const clearBtn = document.querySelector("#clear-btn")

const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info span")
const backBtn = document.querySelector("#back-btn");


// Funções

function createTable(data){
    data.forEach((item) =>{
        const div = document.createElement("div")
        div.classList.add("table-data")

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    })
}

function clearInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = ""
    imcInfo.classList = ""
}

function validDigits(text){
    return text.replace(/[^0-9,]/g,"")
}

  

function calcImc (height, weight){
    const imc = (weight/ (height*height)).toFixed(1);
    return imc;
}

function showOrHideResult() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
  }

// Inicialização

createTable(data);

// Eventos

[heightInput, weightInput].forEach((el)=>{
    el.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value);

        e.target.value = updateValue;
    })
})

clearBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    clearInputs();
})

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");
  
  
    if (!weight || !height) return;
  
    const imc = calcImc(height, weight);
    let info;
  
    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;
      }
    });
  
    if (!info) return;
  
    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch(info){

        case "Abaixo do peso":
            imcNumber.classList.add("low")
            imcInfo.classList.add("low");
            break;
        case "Peso ideal":
            imcNumber.classList.add("good")
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("medium")
            imcInfo.classList.add("medium");
            break;
        case "Obesidade Leve":
            imcNumber.classList.add("medium-low")
            imcInfo.classList.add("medium-low");
            break;
        case "Obesidade Severa":
            imcNumber.classList.add("medium-high")
            imcInfo.classList.add("medium-high");
            break;
        case "Obesidade Mórbida":
            imcNumber.classList.add("high")
            imcInfo.classList.add("high");
            break;
    }

    showOrHideResult();

})


backBtn.addEventListener("click", ()=>{
    clearInputs();
    showOrHideResult();
})
