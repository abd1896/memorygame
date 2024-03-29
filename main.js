document.querySelector(".control-buttons span").onclick = function(){
    let name = prompt("What's Your Name?");
    if(name == null || name == ""){
        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = name;
    }
    document.querySelector(".control-buttons").remove();
}

let blocksContainer = document.querySelector(".blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuf(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function(){
    flipBlock(block);
    });
});

function shuf(arr){
    let current = arr.length,
        random,
        tam;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        tam = arr[current];
        arr[current] = arr[random];
        arr[random] = tam;
    }
    return arr;
}

function flipBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedblock => flippedblock.classList.contains('is-flipped'));
    if(allFlippedBlocks.length === 2){
        stopClick();
        checkBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClick(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, 750);
}

function checkBlocks(fblock, sblock){
    let tries = document.querySelector('.tries span');
    if(fblock.dataset.tec === sblock.dataset.tec){
        document.getElementById('suc').play();
        fblock.classList.remove('is-flipped');
        sblock.classList.remove('is-flipped');
        fblock.classList.add('has-match');
        sblock.classList.add('has-match');
    }else{
        document.getElementById('fail').play();
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            blocks.forEach(element => {
                if(element.classList.contains('is-flipped')){
                    element.classList.remove('is-flipped');
                }
            });
        }, 700);
    }
}