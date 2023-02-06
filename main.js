let duration = 1000;
let flipDuration = 2000;
// Function to start the game
document.querySelector(".control-button span").onclick = function () {

    let yourName = prompt("What is Your Name");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unkown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-button").remove();
    let flipduration =   setInterval(() => {
        blocks.forEach((block) => {
            block.classList.add("is-flipped");
            if (flipDuration < 2000)
            {
                block.classList.remove("is-flipped");
                clearInterval(flipduration);
            }
            
        })
        flipDuration--;
        console.log(flipDuration);
    }, flipDuration);
    
};

let blocksContinear = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContinear.children);
let orderRange = [...Array(blocks.length).keys()];
let wrongAnswer = 0;
let correctAnswer = 0;
let restartGame = document.querySelector(".restart-game");
let restartButton = document.querySelector(".restart-game span");
let winGame = document.querySelector(".win-game");
let winRestartButton = document.querySelector(".win-game span");

// shuffle the orderRange to get random range from 0 to 19

shuffle(orderRange);


// Assign the order of the images
blocks.forEach((block,index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function () {
        flipblock(block);
    })
});

// End Game Function 
function endGame() {
        blocksContinear.classList.add("no-clicking");
}
// flip block function
function flipblock(selectedblock) {
    //  add class flip to the selected block
    selectedblock.classList.add("is-flipped");
    // collect the selected blocks
    let allSelectedBlocks = blocks.filter(flippedblock => flippedblock.classList.contains("is-flipped"));
    // Check if there is 2 selected blocks
    if (allSelectedBlocks.length === 2) {
    // stop clicking function
        stopClecking();
    // check matching function
        checkMatched(allSelectedBlocks[0], allSelectedBlocks[1]);
    }
  
}
// Stop Clicking Function
function stopClecking() {
    // Add Class No Clicking On Main Continear
    blocksContinear.classList.add("no-clicking");
    setTimeout(() => {
        blocksContinear.classList.remove("no-clicking");
    }, duration);

}
// Check Function
function checkMatched(firstBlock,secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        secondBlock.classList.add("matched");
        firstBlock.classList.add("matched");
        document.getElementById("success").play();
        correctAnswer++;
        if (correctAnswer === 10) {
            winGame.style.display = "block";
            winRestartButton.onclick = () => {
                window.location.reload();
            }
        }
    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.getElementById("fail").play();
        wrongAnswer++;
        if (wrongAnswer===10) {
            restartGame.style.display = "block";
            restartButton.onclick = function () {
                window.location.reload();
            }
        }
    }
}


// Shuffle Function

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        // Swapping 
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    };
    return array;
};