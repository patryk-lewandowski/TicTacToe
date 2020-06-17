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
                        addToTable(fieldNumber, 'x');
                    } else {
                        field.innerHTML = '<i class="icon-circle-empty"></i>'
                        addToTable(fieldNumber, 'o');
                    }
                    counter++;
                } else {
                    console.log('to pole jest już zajęte');
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
            // fields.forEach(function (field) {
            //     if ((field.dataset.number === i) ||
            //         (field.dataset.number === i + 1) ||
            //         (field.dataset.number === i + 2)) {
            //         field.setAttribute('color', 'red');
            //     }
            // })
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
        gameOver('remis');
    }

}

const gameOver = (gracz) => {
    if (gracz === 'remis') {
        document.querySelector('.winnerH1').textContent = `Remis!`
    } else {
        document.querySelector('.winnerH1').textContent = `Zwyciężył gracz: ${gracz}`
    }
    document.querySelector('.winner').style.display = 'block';
}


addSign();