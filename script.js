document.addEventListener('DOMContentLoaded', function() {
const boxs=document.querySelectorAll('.box');
const playerstatus=document.querySelector('#player-status');
const buttonstatus=document.querySelector('#button-status');

let x='<p style="font-size:70px; font-family:cursive;color:#FF204E;font-weight:bold;">X</p>';
let o='<p style="font-size:70px; font-family:cursive;color:#41C9E2;font-weight:bold;">O</p>';

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

let option=["","","","","","","","",""];
let currentplayer=x;
let player="X";
let running=false;
init();

//start the function to working the function
function init()
{
    boxs.forEach(box=>box.addEventListener('click',boxclick));
    buttonstatus.addEventListener('click',restartgame);
    playerstatus.textContent=` ${player} Your turn`;
    running=true;
    
}
//if the click the function what do
function boxclick() 
{
    const index=this.dataset.index;
    if(option[index]!="" || !running)   
    {
        return;
    }
    updatebox(this,index);
    checkWinner();

}

//put the x or o in our website

function updatebox(box,index)
{
    option[index]=player;
    box.innerHTML=currentplayer;
}

//Change the player x to o

function changeplayer()
{
    if(player=="X" && currentplayer==x)
    {
        player="O";
        currentplayer=o;
        playerstatus.textContent=`${player} your turn`;
    }
    else
    {
        player="X";
        currentplayer=x;
        playerstatus.textContent=`${player} your turn`;
    }

}

//reset the game or restart the game

function restartgame()
{
    option=["","","","","","","","",""];
    currentplayer=x;
    player="X";
    running=true;
    playerstatus.textContent=`${player} your turn`;
    boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
    });
}


function checkWinner()
{
    let isWon=false;

    for(let i=0;i<win.length;i++)
    {
        const condition=win[i];
        const b1=option[condition[0]];
        const b2=option[condition[1]];
        const b3=option[condition[2]];

        if(b1=="" || b2=="" || b3=="")
            continue;
        if(b1==b2 && b2==b3)
        {
            isWon=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
            
        }
    }
    if(isWon)
    {
        playerstatus.textContent=`${player} is Won`;
        running=false;
    }
    else if(!option.includes(""))
    {
        playerstatus.textContent=` Game Draw `
        running=false;
    }
    else
    {
        changeplayer();
    }

}
});

