const board = document.querySelector('.board');
const cellSize = 100;
const shuffleBtn = document.querySelector('.shuffle');

const timer = document.querySelector('.timer');


const empty = {
    left: 3,
    top: 3,
    value: 0
}

//fixing the cell address on board
let cells = [];
cells.push(empty);
start ();

function start () {
    const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);//randomizer

    
    for (let i=0; i<=14; i++) {
        let cell = document.createElement('div');
        let cellValue = numbers[i] + 1;
        cell.className = 'cell';
        cell.innerHTML = cellValue;
    
    //cell position on board
        const left = i%4;
        const top = (i - left)/4;

        cells.push ({
            top: top,
            left: left,
            element: cell,
            value: cellValue
        });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    board.append(cell);

    cell.addEventListener('click', () => {
        step(i+1);
    });
   
    };

    
}


function step (idx){
    let cell = cells[idx];
    const leftDiff = Math.abs(empty.left - cell.left);//checking if empty cell is next to the clicked one
    const topDiff = Math.abs(empty.top - cell.top);

    if ((leftDiff+topDiff) == 1) {
        
        cell.element.style.left = `${empty.left * cellSize}px`;
        cell.element.style.top = `${empty.top * cellSize}px`;

        const emptyLeft = empty.left;
        const emptyTop = empty.top;

        empty.left = cell.left;
        empty.top = cell.top;

        cell.left = emptyLeft;
        cell.top = emptyTop;

    }

//check if win
   const isWin = cells.every(cell => {
    return cell.value === cell.top*4 + cell.left + 1;})
    if (isWin) {
       throw alert('Congrats! You won!');   
    };
}


//timer function
    let seconds = 0;
    let minutes = 0;

function timeCount (){
    let displaySec = 0;
    let displayMin = 0;
    seconds++;
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;
    };

    if(seconds < 10){
        displaySec = "0" + seconds.toString();
    }
    else{
        displaySec = seconds;
    };

    if(minutes < 10){
        displayMin = "0" + minutes.toString();
    }
    else{
        displayMin = minutes;
    };

    timer.innerHTML = displayMin + ":" + displaySec;  
};

function startTimer(){
    let status = "stopped";
    if(status === "stopped"){

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(timeCount, 1000);
        status = "started";
    }
    else{

        window.clearInterval(interval);
        status = "stopped";
    };

};

function reset(){
    interval = window.setInterval(reset, 1000);
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    
    timer.innerHTML = "00:00";

};


let stepNumber = 0;
//step counter
board.onclick = function stepCount() {
    stepNumber += 1;
    if (stepNumber === 1) {
        startTimer();
    };   
}

shuffleBtn.addEventListener("click", ()=>{
    window.location.reload();
    reset ();
});





