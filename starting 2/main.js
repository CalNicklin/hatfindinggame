const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        // Set the "home" position before the game starts
        this.field[0][0] = pathCharacter;
    }
    print = () => {
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }
    // Methods to test whether the current location results in 
    // win (user is on the hat) 
    win() {
        return this.field[this.locationX][this.locationY] === hat;
    }
    // loss (user is on a hole 
    loss() {
        return this.field[this.locationX][this.locationY] === hole;
    }
    //     or out-of-bounds).
    isInBounds() {
        return (
            this.locationX >= 0 &&
            this.locationY >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    // method to handle asking and accepting user input, and updating the current location.
    askQuestion() {
        const answer = prompt('Which way ').toUpperCase();
        switch (answer) {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            case 'R':
                this.locationX += 1;
                break;
            default:
                console.log('Enter U, D, L or R.')
                this.askQuestion();
                break;
        }
    }

    // A method  to run the main game loop until the game is won or lost.
    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Out of bounds instruction');
                playing: false;
                break;
            }
            else if (this.loss()) {
                console.log('Fell in a hole!');
                playing: false;
                break;
            }
            else if (this.win()) {
                console.log('You found a hat!');
                playing: false;
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    // A method to generate a randomised field filled with holes, hats or background.
    static generateField(height, width, percentage) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        // for every item on the field array, populate the element with either a hole, character or hat.
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                field[x][y] = prob > percentage ? fieldCharacter : hole;
            }
        }
        // Set the intial hat location 
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        }
        // Make sure the "hat" is not at the starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.x][hatLocation.y] = hat;
        return field;
    }
}

const myField = new Field(Field.generateField(10, 10, 0.3));
myField.runGame();