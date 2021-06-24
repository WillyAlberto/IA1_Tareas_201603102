var tablero = [
    new Array(8), new Array(8), new Array(8), new Array(8),
    new Array(8), new Array(8), new Array(8), new Array(8)
];

var Accion = {
    MIN: 1,
    MAX: 0
}

//Verificar movimientos
function Norte(matriz, fila, col, ficha, movs){
    let pivote = matriz[--fila][col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        fila--;
        if(fila < 0){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function Sur(matriz, fila, col, ficha, movs){
    let pivote = matriz[++fila][col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        fila++;
        if(fila > 7){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function Este(matriz, fila, col, ficha, movs){
    let pivote = matriz[fila][++col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        col++;
        if(col > 7){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function Oeste(matriz, fila, col, ficha, movs){
    let pivote = matriz[fila][--col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        col--;
        if(col < 0){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

//DIAGONAL
function Norteste(matriz, fila, col, ficha, movs){
    let pivote = matriz[--fila][++col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        col++;
        fila--;
        if(fila < 0 || col > 7){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function Noroeste(matriz, fila, col, ficha, movs){
    let pivote = matriz[--fila][--col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        col--;
        fila--;
        if(fila < 0 || col < 0){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function Sureste(matriz, fila, col, ficha, movs){
    let pivote = matriz[++fila][++col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        col++;
        fila++;
        if(fila > 7 || col > 7){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function Suroeste(matriz, fila, col, ficha, movs){
    let pivote = matriz[++fila][--col];
    let bandera = false;
    
    while(pivote!='2' && pivote!=ficha){
        bandera = true;
        col--;
        fila++;
        if(fila > 7 || col < 0){
            break;
        }
        pivote = matriz[fila][col];
    }
    if(bandera) movs.push(fila+""+col);
}

function formar_matriz(estado){
    //Pasar de lineal a cuadratica
    let fila = 0, col = 0;
    for(let i in estado) {
        tablero[fila][col] = parseInt(estado[i]);

        col++;
        if(col%8 === 0){
            col = 0;
            fila++;
        }
    }
    console.log(tablero)
}

function calcMovimientos(turno){
    let movs = [];
    for(fila=0; fila<8; fila++){
        for(col=0; col<8; col++){
            let ficha = tablero[fila][col];

            if(ficha == turno){
                if(fila > 1) Norte(tablero,fila,col,ficha,movs);
                if(fila < 6) Sur(tablero,fila,col,ficha,movs);
                if(col < 6) Este(tablero,fila,col,ficha,movs);
                if(col > 1) Oeste(tablero,fila,col,ficha,movs);

                if(fila > 1 && col < 6) Norteste(tablero,fila,col,ficha,movs);
                if(fila > 1 && col > 1) Noroeste(tablero,fila,col,ficha,movs);
                if(fila < 6 && col < 6) Sureste(tablero,fila,col,ficha,movs);
                if(fila < 6 && col > 1) Suroeste(tablero,fila,col,ficha,movs);
                
                console.log(movs,fila,col)
            }
        }
    }

    
    
    var bot = document.getElementById("bot");


    document.body.innerHTML = pintarTablero() + "<br><br>Resultado: " + movs[0] + "<br>";
        document.body.appendChild(bot);
    

    
}

function analizar(turno, estado){
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('turno'));
    console.log(urlParams.get('estado'));
    //Mostramos los valores en consola:
    
    formar_matriz(estado);
    calcMovimientos(turno);
    let a = document.getElementsByTagName("html");
    console.log(a)
    
    
    
}

function pintarTablero(){
    let cuerpo = "";
    cuerpo += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    cuerpo += "&nbsp;0&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;7<br>"
    cuerpo += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________________<br>"
    for(var i=0; i<8; i++) {
        cuerpo += (i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
        for(var j=0; j<8; j++) {
            cuerpo += "|  " + tablero[i][j] + "  ";
        }
        cuerpo += "|<br>";
    }
    return cuerpo;
}

function agregar(){
    var fila = parseInt(prompt("Fila"));
    var columna = parseInt(prompt("Columna"));
    var valor = parseInt(prompt("Valor"));
    tablero[fila][columna] = valor;
    console.log('--------------------')
    var posicion = calcMovimientos(0);


    //var bot = document.body.firstChild.nextSibling;
 //   var bot = document.getElementById("bot");


   // document.body.innerHTML = pintarTablero() + "<br><br>Resultado: " + posicion + "<br>";
    //document.body.appendChild(bot);
}

entrada = "2222222222222222222222222221022222201222222222222222222222222222"//"2222222222222222222222222221022222201222222222222222222222222222"
analizar(0,entrada);
Resultado = 53