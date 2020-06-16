const fields = document.querySelectorAll('.board__field');
let counter = 1;
let tableX = ['x', '', '', '', '', '', '', '', '', ''];
let tableO = ['o', '', '', '', '', '', '', '', '', ''];

const addSign = () => {
    fields.forEach(function (field) {
        field.addEventListener('click', function () {
            const fieldNumber = field.dataset.number;
            if (counter < 10) {
                if ((tableO[fieldNumber] === '') && (tableX[fieldNumber] === '')) {
                    if (counter % 2) {
                        field.innerHTML = '<i class="icon-cancel"></i>'
                        addToTable(field.dataset.number, 'x');
                    } else {
                        field.innerHTML = '<i class="icon-circle-empty"></i>'
                        addToTable(field.dataset.number, 'o');
                    }
                    counter++;
                    console.log(field.dataset.number);
                } else {
                    console.log('to pole jest już zajęte');
                }
            } else {
                console.log('koniec gry');
                gameOver('remis');
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
    for (let i = 1; i <= 10; i += 3) {
        // console.log(`poziomo: ${i},${i+1},${i+2}`);
        if ((table[i] && table[i + 1] && table[i + 2]) === table[0]) {
            console.log(`wygrał ${table[0]}`);
            gameOver(table[0]);
            break;
        }
    }
    for (let i = 1; i <= 3; i++) {
        // console.log(`pionowo: ${i},${i+3},${i+6}`);
        if ((table[i] && table[i + 3] && table[i + 6]) === table[0]) {
            console.log(`wygrał ${table[0]}`);
            gameOver(table[0]);
            break;
        }
    }
    if ((table[0] === table[1] &&
            table[1] === table[5] &&
            table[5] === table[9]) ||

        (table[0] === table[3] &&
            table[3] === table[5] &&
            table[5] === table[7])) {
        console.log(`wygrał ${table[0]}`);
        gameOver(table[0]);
    }

}

const gameOver = (gracz) => {
    document.querySelector('.winnerH1').textContent = `Zwyciężył gracz: ${gracz}`
    // document.querySelector('.winner').setAttribute('display', 'block');
    document.querySelector('.winner').style.display = 'block';
}


addSign();