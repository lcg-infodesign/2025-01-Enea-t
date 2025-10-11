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

function setup() {
  createCanvas(400, 400);
  datasetOK = sistemaDataset(originalDataset)
}

function draw() {
  background(220);
}
