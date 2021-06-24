/*
let params = new URLSearchParams(document.location.search.substring(1));
const turno = params.get("turno");
const estado = params.get("estado");


document.addEventListener("DOMContentLoaded", function() {
    let body = document.getElementsByTagName("body")[0];
    body.innerHTML = "24";
});


let params = new URLSearchParams(document.location.search.substring(1));
let turno = params.get("turno");
let estado = params.get("estado");
*/

var tablero = new Array(2);     // Tablero
tablero[0] = new Array(8);      // Fila 1
tablero[1] = new Array(8);      // Fila 2
tablero[2] = new Array(8);      // Fila 3
tablero[3] = new Array(8);      // Fila 4
tablero[4] = new Array(8);      // Fila 5
tablero[5] = new Array(8);      // Fila 6
tablero[6] = new Array(8);      // Fila 7
tablero[7] = new Array(8);      // Fila 8

var heuristica = new Array(
        new Array(120, -20,  20,   5,   5,  20, -20, 120), 
        new Array(-20, -40,  -5,  -5,  -5,  -5, -40, -20), 
        new Array(20,  -5,  15,   3,   3,  15,  -5,  20), 
        new Array(5,  -5,   3,   3,   3,   3,  -5,   5), 
        new Array(5,  -5,   3,   3,   3,   3,  -5,   5), 
        new Array(20,  -5,  15,   3,   3,  15,  -5,  20), 
        new Array(-20, -40,  -5,  -5,  -5,  -5, -40, -20), 
        new Array(120, -20,  20,   5,   5,  20, -20, 120))

function pintarTablero(){
    let cuerpo = "";
    cuerpo += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
    cuerpo += "&nbsp;1&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;8<br>"
    cuerpo += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________________<br>"
    for(var i=0; i<8; i++) {
        cuerpo += (i+1)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
        for(var j=0; j<8; j++) {
            cuerpo += "|  " + tablero[i][j] + "  ";
        }
        cuerpo += "|<br>";
    }
    return cuerpo;
}
function llenarTablero(entrada){
    var columna = 0;
    var fila = 0;
    for(let i=0; i<64; i++){
        tablero[fila][columna] = parseInt(entrada[i]);
        if(i==7 || i==15 || i==23 || i==31 || i==39 || i==47 || i==55){
            fila++;
            columna = 0;
        }else{
            columna++;
        }
    }
}

function izquierda(fila, columna, pieza, lis){
    try{
        if(columna != 0 || columna != 1){
            let piezaIzquierda = tablero[fila][columna-1]
            if(piezaIzquierda == 2 || piezaIzquierda == pieza){
                return lis;
            }else if(piezaIzquierda != pieza){  // Movimiento inicia valido
                let inc = columna-2;
                for(let x=0; x<8; x++){
                    let col = inc-x;
                    let piezaIzquierdaActual = tablero[fila][col];
                    if(piezaIzquierdaActual == 2){
                        lis.push((fila+1) + "" + (col+1));
                        return lis;                    
                    }else if(piezaIzquierdaActual == pieza || col == 0){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}
function derecha(fila, columna, pieza, lis){
    try{
        if(columna != 7 || columna != 6){
            let piezaDerecha = tablero[fila][columna+1]
            if(piezaDerecha == 2 || piezaDerecha == pieza){
                return lis;
            }else if(piezaDerecha != pieza){  // Movimiento inicia valido
                let inc = columna+2;
                for(let x=0; x<8; x++){
                    let col = inc+x;
                    let piezaDerechaActual = tablero[fila][col];
                    if(piezaDerechaActual == 2){
                        lis.push((fila+1) + "" + (col+1));
                        return lis;                    
                    }else if(piezaDerechaActual == pieza || col == 7){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}
function arriba(fila, columna, pieza, lis){
    try{
        if(fila != 0 || fila != 1){
            let piezaArriba = tablero[fila-1][columna]
            if(piezaArriba == 2 || piezaArriba == pieza){
                return lis;
            }else if(piezaArriba != pieza){  // Movimiento inicia valido
                let inc = fila-2;
                for(let x=0; x<8; x++){
                    let fil = inc-x;
                    let piezaArribaActual = tablero[fil][columna];
                    if(piezaArribaActual == 2){
                        lis.push((fil+1) + "" + (columna+1));
                        return lis;                    
                    }else if(piezaArribaActual == pieza || fil == 0){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}
function abajo(fila, columna, pieza, lis){
    try{
        if(fila != 7 || fila != 6){
            let piezaAbajo = tablero[fila+1][columna]
            if(piezaAbajo == 2 || piezaAbajo == pieza){
                return lis;
            }else if(piezaAbajo != pieza){  // Movimiento inicia valido
                let inc = fila+2;
                for(let x=0; x<8; x++){
                    let fil = inc+x;
                    let piezaAbajoActual = tablero[fil][columna];
                    if(piezaAbajoActual == 2){
                        lis.push((fil+1) + "" + (columna+1));
                        return lis;                    
                    }else if(piezaAbajoActual == pieza || fil == 7){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}

function izquierdaArriba(fila, columna, pieza, lis){
    try{
        if( (columna != 0 || columna != 1) && (fila != 0 || fila != 1) ){
            let piezaDiagonal = tablero[fila-1][columna-1]
            if(piezaDiagonal == 2 || piezaDiagonal == pieza){
                return lis;
            }else if(piezaDiagonal != pieza){  // Movimiento inicia valido
                let incC = columna-2;
                let incF = fila-2;
                for(let x=0; x<8; x++){
                    let col = incC-x;
                    let fil = incF-x;
                    let piezaDiagonalActual = tablero[fil][col];
                    if(piezaDiagonalActual == 2){
                        lis.push((fil+1) + "" + (col+1));
                        return lis;                    
                    }else if(piezaDiagonalActual == pieza || col == 0 || fil == 0){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}
function izquierdaAbajo(fila, columna, pieza, lis){
    try{
        if( (columna != 0 || columna != 1) && (fila != 7 || fila != 6) ){
            let piezaDiagonal = tablero[fila+1][columna-1]
            if(piezaDiagonal == 2 || piezaDiagonal == pieza){
                return lis;
            }else if(piezaDiagonal != pieza){  // Movimiento inicia valido
                let incC = columna-2;
                let incF = fila+2;
                for(let x=0; x<8; x++){
                    let col = incC-x;
                    let fil = incF+x;
                    let piezaDiagonalActual = tablero[fil][col];
                    if(piezaDiagonalActual == 2){
                        lis.push((fil+1) + "" + (col+1));
                        return lis;                    
                    }else if(piezaDiagonalActual == pieza || col == 0 || fil == 7){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}
function derechaArriba(fila, columna, pieza, lis){
    try{
        if( (columna != 7 || columna != 6) && (fila != 0 || fila != 1) ){
            let piezaDiagonal = tablero[fila-1][columna+1]
            if(piezaDiagonal == 2 || piezaDiagonal == pieza){
                return lis;
            }else if(piezaDiagonal != pieza){  // Movimiento inicia valido
                let incC = columna+2;
                let incF = fila-2;
                for(let x=0; x<8; x++){
                    let col = incC+x;
                    let fil = incF-x;
                    let piezaDiagonalActual = tablero[fil][col];
                    if(piezaDiagonalActual == 2){
                        lis.push((fil+1) + "" + (col+1));
                        return lis;                    
                    }else if(piezaDiagonalActual == pieza || col == 7 || fil == 0){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
    
}
function derechaAbajo(fila, columna, pieza, lis){
    try{
        if( (columna != 7 || columna != 6) && (fila != 7 || fila != 6) ){
            let piezaDiagonal = tablero[fila+1][columna+1]
            if(piezaDiagonal == 2 || piezaDiagonal == pieza){
                return lis;
            }else if(piezaDiagonal != pieza){  // Movimiento inicia valido
                let incC = columna+2;
                let incF = fila+2;
                for(let x=0; x<8; x++){
                    let col = incC+x;
                    let fil = incF+x;
                    let piezaDiagonalActual = tablero[fil][col];
                    if(piezaDiagonalActual == 2){
                        lis.push((fil+1) + "" + (col+1));
                        return lis;                    
                    }else if(piezaDiagonalActual == pieza || col == 7 || fil == 7){
                        break;
                    }
                }
            }
        }
        return lis
    }catch(error){
        return lis
    }
}

function movimiento(turno){
    var lis = [];
    for(var i=0; i<8; i++) {
        for(var j=0; j<8; j++) {
            // fila = i
            // columna = j
            let pieza = tablero[i][j]
            if(pieza == turno){       // Turno actual segun pieza
                lis = izquierda(i,j,pieza,lis);
                lis = derecha(i,j,pieza,lis);
                lis = arriba(i,j,pieza,lis);
                lis = abajo(i,j,pieza,lis);
                lis = izquierdaArriba(i,j,pieza,lis);
                lis = izquierdaAbajo(i,j,pieza,lis);
                lis = derechaArriba(i,j,pieza,lis);
                lis = derechaAbajo(i,j,pieza,lis);
            }
        }
    }
    console.log(lis)
    var posicion = Math.floor(Math.random()*lis.length);
    console.log(posicion)
    return lis[posicion];
}

function minimax(){

}

function inicio(entrada){
    llenarTablero(entrada);

    var posicion = movimiento(1);
    document.body.innerHTML += pintarTablero() + "<br><br>Resultado: " + posicion;
}

/*
    Negras: 0
    Blancas: 1
    Turno inicial: 1

    2   2   2   2   2   2   2   2   
    2   2   2   2   2   2   2   2   
    2   2   2   2   2   2   2   2   
    2   2   2   1   0   2   2   2   
    2   2   2   0   1   2   2   2   
    2   2   2   2   2   2   2   2   
    2   2   2   2   2   2   2   2   
    2   2   2   2   2   2   2   2
*/
//var tablero = prompt("Como esta el tablero?");
entrada = "2222222222222222222222222221022222201222222222222222222222222222"//"2222222222222222222222222221022222201222222222222222222222222222"
inicio(entrada);

function agregar(){
    var fila = parseInt(prompt("Fila"));
    var columna = parseInt(prompt("Columna"));
    var valor = parseInt(prompt("Valor"));
    tablero[fila-1][columna-1] = valor;

    var posicion = movimiento(1);


    //var bot = document.body.firstChild.nextSibling;
    var bot = document.getElementById("bot");


    document.body.innerHTML = pintarTablero() + "<br><br>Resultado: " + posicion + "<br>";
    document.body.appendChild(bot);
}