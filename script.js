const fields = document.querySelectorAll('.board__field');
const infoH1 = document.querySelector('.stats__infoH1');
const winsX = document.querySelector('.stats__winsX');
const winsO = document.querySelector('.stats__winsO');
const draws = document.querySelector('.stats__draws');
const resetButton = document.querySelector('.stats__buttons-reset')
const newGameButton = document.querySelector('.stats__buttons-newGame')
let counter = 1;
let stats = [0, 0, 0]; //[X,O,D];
let tableX = [];
let tableO = [];

const newGame = () => {
    infoH1.style.color = 'rgb(43, 184, 8)';
    fields.forEach(function (field) {
        field.innerHTML = "";
    })
    counter = 1;
    tableX = ['x', '', '', '', '', '', '', '', '', ''];
    tableO = ['o', '', '', '', '', '', '', '', '', ''];
    document.querySelector('.board__disabled').style.display = 'none';
}

const addSign = () => {
    fields.forEach(function (field) {
        field.addEventListener('click', function () {
            infoH1.innerHTML = '';
            const fieldNumber = field.dataset.number;
            console.log(counter)
            // console.log(fieldNumber)
            if (counter < 10) {
                if ((tableO[fieldNumber] === '') && (tableX[fieldNumber] === '')) {
                    if (counter % 2) {
                        field.innerHTML = '<i class="icon-cancel"></i>'
                        addToTable(fieldNumber, 'x');
                    } else {
                        field.innerHTML = '<i class="icon-circle-empty"></i>'
                        addToTable(fieldNumber, 'o');
                    }
                    counter++;
                } else {
                    infoH1.innerHTML = 'to pole jest już zajęte';
                }
            }
        })
    })
}

const addToTable = (number, sign) => {
    if (sign === 'x') {
        tableX[number] = sign;
        checkIfWin(tableX);
    } else if (sign === 'o') {
        tableO[number] = sign;
        checkIfWin(tableO);
    }
}

const checkIfWin = (table) => {
    //poziomo
    for (let i = 1; i <= 10; i += 3) {
        if ((table[i] && table[i + 1] && table[i + 2]) === table[0]) {
            console.log(`wygrał ${table[0]}`);
            gameOver(table[0]);
            break;
        }
    }
    //pionowo
    for (let i = 1; i <= 3; i++) {
        if ((table[i] && table[i + 3] && table[i + 6]) === table[0]) {
            console.log(`wygrał ${table[0]}`);
            gameOver(table[0]);
            break;
        }
    }
    //na skos
    if ((table[0] === table[1] &&
            table[1] === table[5] &&
            table[5] === table[9]) ||

        (table[0] === table[3] &&
            table[3] === table[5] &&
            table[5] === table[7])) {
        console.log(`wygrał ${table[0]}`);
        gameOver(table[0]);
    } else if (counter === 9) {
        console.log('koniec gry');
        counter = 1;
        gameOver('remis');
    }

}

const gameOver = (gracz) => {
    document.querySelector('.board__disabled').style.display = 'block';
    if (gracz === 'remis') {
        infoH1.textContent = `Remis!`
        infoH1.style.color = 'red';
        updateStats('draw');
    } else if (gracz === 'x') {
        infoH1.textContent = `Zwyciężył gracz: X`
        updateStats('x');
    } else {
        infoH1.textContent = `Zwyciężył gracz: O`
        updateStats('o');
    }
}

const updateStats = (result) => {
    if (result === 'draw') {
        stats[2]++;
    } else if (result === 'x') {
        stats[0]++;
    } else if (result === 'o') {
        stats[1]++;
    }
    winsX.innerHTML = stats[0];
    winsO.innerHTML = stats[1];
    draws.innerHTML = stats[2];
}



resetButton.addEventListener('click', function () {
    stats = [0, 0, 0];
    winsX.innerHTML = stats[0];
    winsO.innerHTML = stats[1];
    draws.innerHTML = stats[2];
    infoH1.innerHTML = '';
    newGame();
})

newGameButton.addEventListener('click', function () {
    newGame();
})

addSign();
newGame();