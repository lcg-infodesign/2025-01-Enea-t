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

function mean(table, colonna) {
  let somma = 0
  for(let i = 0; i < table.getRowCount(); i++) {
    let x = table.getNum(i, colonna)
    somma = somma + x
  }
  let media = somma / table.getRowCount()
  return media
}

function standard_deviation(table, colonna) {
  let mean = mean(table, colonna)
  let somma = 0
  for(let i = 0; i < table.getRowCount(); i++) {
    let x = table.getNum(i, colonna)
    let difference = mean - x
    let square = difference ** 2
    somma = somma + square
  }
  let standev = somma / table.getRowCount()
  return standev
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
        //elimina il valore k
        let pos = indiciMode.indexOf(i)
        if(pos == -1) {
        } else {
          indiciMode.splice(pos)
        }
        //altrimenti non fa nulla
      } else {}
    }
    //quindi alla fine del ciclo:
    //se ha trovato un valore più grande di counter,
    //allora counter non è presente in indiciMode
    //altrimenti dovrebbe esserci
  }
  return indiciMode
}

function setup() {
  createCanvas(400, 400);
  datasetOK = sistemaDataset(originalDataset)
}

function draw() {
  background(220);
}
