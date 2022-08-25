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
            else if (this.isHole()) {
                console.log('Fell in a hole!');
                playing: false;
                break;
            }
            else if (this.isHat()) {
                console.log('You found a hat!');
                playing: false;
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    // A method to generate a randomised field filled with holes, hats or background.
    static generateField(height, width, percentage) {
        
    }
}
