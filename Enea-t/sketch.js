let originalDataset //il dataset che ci ha dato il prof
let datasetOK //il dataset filtrato pronto per essere utilizzato

function preload() {
  originalDataset = loadTable("dataset.csv", "csv", "header")
}

//funzione che filtra il dataset secondo le regole date
function sistemaDataset(table) {
  for(let i = 0; i < table.getRowCount(); i++) { //per ogni riga
    let valore1 = table.getNum(i, "column0") // prende il valore della column0
    let valore3 = table.getNum(i, "column3") //prende il valore della column3
    //il valore della column0 deve essere >0
    //il valore della column3 deve essere multiplo di 3 (valore3 % 3 = 0)
    //impongo una condizione: se le due regole non sono ENTRAMBE verificate
    //allora elimino la riga corrispondente
    if(valore1 <= 0 || valore3 % 3 != 0) {
      table.removeRow(i)
      i-- //se una riga viene eliminata l'indice di quelle successive slitta
      //quindi è necessario diminuire l'indice di 1 prima di procedere
      //per evitare di saltare una riga
    }
  }
  return table
}

//funzione di debug per visualizzare una colonna del dataset sistemato
//con i vaori in ordine crescente
function logColonna(table, colonna) {
  let arr = []
  for (let i = 0; i < table.getRowCount(); i++) {
    let v = parseFloat(table.getString(i, colonna));
    if (!isNaN(v)) arr.push(v);
  }
  arr.sort((a, b) => a - b);
  return arr
}

function mean(table, colonna) {
  let somma = 0
  for(let i = 0; i < table.getRowCount(); i++) {
    let x = table.getNum(i, colonna)
    somma = somma + x
  }
  let media = somma / table.getRowCount()
  return media
}

function standardDeviation(table, colonna) {
  let meanValue = mean(table, colonna)
  let somma = 0
  for(let i = 0; i < table.getRowCount(); i++) {
    let x = table.getNum(i, colonna)
    let difference = meanValue - x
    let square = difference ** 2
    somma = somma + square
  }
  let standevSquared = somma / table.getRowCount()
  return Math.sqrt(standevSquared)
}

function mode(table, colonna) {
  let countersArray = [] //conterrà i counter di ogni valore della colonna
  //conto quante volte ricorre ogni valore
  for(let i = 0; i < table.getRowCount(); i++) {
    let x = table.getNum(i, colonna)
    let counter = 0
    for(let k = 0; k < table.getRowCount(); k++) {
      let val = table.getNum(k, colonna)
      if(val == x) {
        counter++
      } else {}
    }
    //per ogni valore della colonna viene generato
    //un counter che viene salvato in countersArray
    countersArray.push(counter)
    //countersArray contiene tanti valori quanti quelli della colonna
    //posso accedervi tramite indice del valore
  }
  let indiciMode = [] //conterrà gli indici delle mode
  for(let i = 0; i < table.getRowCount(); i++) {
    //per ogni valore in countersArray
    let counter = countersArray[i]
    //Aggiunge momentaneamente i a indiciMode
    indiciMode.push(i)
    //il valore viene confrontato con tutti gli altri
    for(let k = 0; k < table.getRowCount(); k++) {
      let confronto = countersArray[k]
      //Ogni volta che incontra un valore più grande toglie i da indiciMode
      if(confronto > counter) {
        //elimina il valore i
        let pos = indiciMode.indexOf(i)
        if(pos == -1) {
        } else {
          indiciMode.splice(pos, 1)
        }
        //altrimenti non fa nulla
      } else {}
    }
    //quindi alla fine del ciclo:
    //se ha trovato un valore più grande di counter,
    //allora counter non è presente in indiciMode
    //altrimenti dovrebbe esserci
  }
  let modeProvvisorio = [] //conterrà le mode
  //ogni moda si ripeterà tante volte quante
  //è presente nella colonna
  for(let i = 0; i < indiciMode.length; i++) {
    let indice = indiciMode[i]
    let x = table.getNum(indice, colonna)
    modeProvvisorio.push(x)
  }
  //elimino le ripetizioni
  let mode = []
  for (let i = 0; i < modeProvvisorio.length; i++) {
    let x = modeProvvisorio[i];
    if (!mode.includes(x)) {
      mode.push(x);
    }
  }
  return mode
}

function median(table, colonna) {
  let orderedArray = []
  for (let i = 0; i < table.getRowCount(); i++) {
    let v = parseFloat(table.getString(i, colonna));
    if (!isNaN(v)) orderedArray.push(v);
  }
  orderedArray.sort((a, b) => a - b);
  let mid = Math.floor(orderedArray.length / 2);
  if (orderedArray.length % 2 === 1) {            // odd number of elements
    return orderedArray[mid];
  } else {                                 // even → average the two middles
    return (orderedArray[mid - 1] + orderedArray[mid]) / 2;
  }
}

function setup() {
  createCanvas(530, 400);
  frameRate(10)
  datasetOK = sistemaDataset(originalDataset);
}

function draw() {
  background(220);
  let mean1 = mean(datasetOK, 0);
  let stanDev2 = standardDeviation(datasetOK, 1)
  let mode3 = mode(datasetOK, 2)
  let median4 = median(datasetOK, 3)
  let mean5 = mean(datasetOK, 4)
  let stanDev5 = standardDeviation(datasetOK, 4)
  
  fill(10);
  noStroke()
  textSize(20);

  //Media della prima colonna
  text("La media della prima colonna è " + mean1, 20, 30);
  
  //Standard deviation della seconda colonna
  push()
  translate(0, 80)
  text("Deviazione standard della seconda colonna:", 20, 0);
  let width = 4.5
  for(let i = 0; i <= (width * 100); i += (width * 10)) {
    rect(20 + i, 20, 1, 10)
    textSize(10)
    text(i/width, 15 + i, 40)
  }
  fill(50, 100, 255)
  rect(stanDev2 * width + 20, 15, 2, 20)
  pop()

  //Moda della terza colonna
  push()
  translate(0, 160)
  text("Mode della terza colonna:", 20, 0)
  let distance = 5.5
  for(let i = 0; i < mode3[0]; i++) {
    fill(50, 100, 255)
    circle( 20 + i * distance,20,4.5)
  }
  for(let i = 0; i < mode3[1]; i++) {
    fill(50, 100, 255)
    circle( 20 + i * distance,40,4.5)
  }
  pop()

  //Mediana della quarta colonna
  push()
  translate(0, 240)
  text("Mediana della quarta colonna:", 20, 0)
  rect(20, 30, 450, 1)
  triangle(
    20, 30,
    40, 25,
    40, 35
  )
  triangle(
    470, 30,
    450, 25,
    450, 35
  )
  rect(245, 25, 1, 10)
  textSize(10)
  text("0", 243, 45)
  distance = 30
  for(let i = 0; i < median4; i++) {
    noFill()
    stroke(50, 100, 255)
    strokeWeight(2)
    arc(260 + i * distance, 30, 30, 30, radians(180), 0)
  }
  pop()
  
  //Media e deviazione standard della quinta colonna
  push()
  translate(0, 320)
  text("La quinta colonna ha le seguenti proprietà:", 20, 0)
  text("- Media: " + mean5, 20, 25)
  text("- Deviazione standard: " + stanDev5, 20, 50)
  pop()
}