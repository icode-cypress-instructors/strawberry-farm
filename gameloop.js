let harvestSound = new Audio('harvest.mp3');
let backgroundMusic = new Audio('hay.mp3');
let gameStart = false;
const strawberry1 = document.getElementById("berry1");
const strawberry2 = document.getElementById("berry2");
const strawberry3 = document.getElementById("berry3");
const strawberry4 = document.getElementById("berry4");
const strawberry5 = document.getElementById("berry5");
const strawberry6 = document.getElementById("berry6");

let multiplier = 1;
let SInitial = 45;
let BPInitial = 20;
let AHInitial = 1000;
let DTInitial = BPInitial;
let growthTime = 100;
let AHPurchaseCounter = 0;
let upgradeMultiplier = {
  SM: 3,
  BM: 1.5,
  AH: 10,
};
let harvester = [
  strawberry1,
  strawberry2,
  strawberry3,
  strawberry4,
  strawberry5,
  strawberry6,
];

const moneyValueH1 = document.querySelector(".money-value");
let moneyValue = parseInt(moneyValueH1.innerHTML.substring(1));
const speedUpgradeButton = document.querySelector(".buttonOne");
const baseProfitUpgradeButton = document.querySelector(".buttonTwo");
const autoHarvestUpgradeButton = document.querySelector(".buttonThree");
const doubleTimerTrigger = document.querySelector(".buttonFour");

main();
function main() {
  gameLoop(strawberry1);
  gameLoop(strawberry2);
  gameLoop(strawberry3);
  gameLoop(strawberry4);
  gameLoop(strawberry5);
  gameLoop(strawberry6);


  speedUpgradeButton.innerHTML = "Speed <br>$" + SInitial;
  baseProfitUpgradeButton.innerHTML = "Base Profit <br>$" + BPInitial;
  autoHarvestUpgradeButton.innerHTML = "Auto Harvest <br>$" + AHInitial;
  doubleTimerTrigger.innerHTML ="Double Profit <br>$" + DTInitial + "<br>(1 min)";

  strawberry1.addEventListener("click", () => {
    gameLoop(strawberry1);
    if(gameStart===false){
      backgroundMusic.play();
      gameStart=true;
    }
  });

  strawberry2.addEventListener("click", () => {
    gameLoop(strawberry2);
    if(gameStart===false){
      backgroundMusic.play();
      gameStart=true;
    }
  });
  strawberry3.addEventListener("click", () => {
    gameLoop(strawberry3);
    if(gameStart===false){
      backgroundMusic.play();
      gameStart=true;
    }
  });
  strawberry4.addEventListener("click", () => {
    gameLoop(strawberry4);
    if(gameStart===false){
      backgroundMusic.play();
      gameStart=true;
    }
  });
  strawberry5.addEventListener("click", () => {
    gameLoop(strawberry5);
    if(gameStart===false){
      backgroundMusic.play();
      gameStart=true;
    }
  });
  strawberry6.addEventListener("click", () => {
    gameLoop(strawberry6);
    if(gameStart===false){
      backgroundMusic.play();
      gameStart=true;
    }
  });
  speedUpgradeButton.addEventListener("click", () => {
    speedUpgrade();
  });
  baseProfitUpgradeButton.addEventListener("click", () => {
    baseProfitUpgrade();
  });
  doubleTimerTrigger.addEventListener("click", () => {
    doubleProfitTimer();
  });
  autoHarvestUpgradeButton.addEventListener("click", () => {
    autoHarvest(strawberry1);
  });
}

function gameLoop(item) {
  let strawberrySize = 10;
  let strawberrylimit = 50;

  for (let i = 0; i < strawberrylimit; i++) {
    setTimeout(function () {
      item.style.width = strawberrySize + "px";
      item.style.height = strawberrySize + "px";
      strawberrySize++;
    }, i * growthTime);
  }
  if (parseInt(item.style.width) === strawberrylimit + 9) {
    increaseMoney(multiplier);
    harvestSound.play();
  }
}

function increaseMoney(multiplier) {
  moneyValue = moneyValue + 1 * multiplier;
  moneyValueH1.innerHTML = "$" + moneyValue;
}

function speedUpgrade() {
  if (moneyValue >= SInitial) {
    moneyValue -= SInitial;
    SInitial = SInitial * upgradeMultiplier.SM;
    growthTime -= 5;
  }
  moneyValueH1.innerHTML = "$" + moneyValue;
  speedUpgradeButton.innerHTML = "Speed <br>$" + SInitial;
}

function baseProfitUpgrade() {
  if (moneyValue >= BPInitial) {
    moneyValue -= BPInitial;
    BPInitial = BPInitial + BPInitial * upgradeMultiplier.BM;
    DTInitial = BPInitial;
    multiplier *= upgradeMultiplier.BM;
  }
  moneyValueH1.innerHTML = "$" + moneyValue;
  baseProfitUpgradeButton.innerHTML = "Base Profit <br>$" + BPInitial;
  
}

function doubleProfitTimer() {
  if (moneyValue >= DTInitial) {
    moneyValue -= DTInitial;
    multiplier = multiplier * 2;
    DTInitial = DTInitial*3;
    doubleTimerTrigger.innerHTML ="Double Profit <br>$" + DTInitial + "<br>(1 min)";
    moneyValueH1.innerHTML = "$" + moneyValue;
    for (let i = 0; i < 60; i++) {
      setTimeout(function () {
        if (i === 59) {
          multiplier = multiplier / 2;
          DTInitial= DTInitial/3;
          doubleTimerTrigger.innerHTML ="Double Profit <br>$" + DTInitial + "<br>(1 min)";
        }
      }, i * 1000);
    }
  }
  
}

function autoHarvest() {
  if (moneyValue >= AHInitial) {
    moneyValue -= AHInitial;
    moneyValueH1.innerHTML = "$" + moneyValue;
    AHInitial = AHInitial * upgradeMultiplier.AH;
    autoHarvestUpgradeButton.innerHTML = "Auto Harvest <br>$" + AHInitial;
    AHPurchaseCounter++;
    let temp = AHPurchaseCounter; 
    gameLoopAutoHarvest(temp);
  }
}

function gameLoopAutoHarvest(t) {
  let strawberrySize = 10;
  let strawberrylimit = 50;
  for (let k = 0; k < 10000; k++) {
    setTimeout(function () {
      if(AHPurchaseCounter>t){
        return; //ends function when new AH is purchased
      }
      for (let i = 0; i < strawberrylimit; i++) {
        setTimeout(function () {
          for(let i =1; i<=AHPurchaseCounter; i++){
            harvester[i-1].style.width = strawberrySize + "px";
            harvester[i-1].style.height = strawberrySize + "px";
          }
          strawberrySize++;
        }, i * growthTime);
      }
      increaseMoney(AHPurchaseCounter * multiplier);
      strawberrySize = 10;
      harvestSound.play();
    }, k * 3000);
  }
}


//upgrades: speed, base-profit, auto harvest, double profit timer
//switch case around AHPurchaseCounter to handle multiple
//auto harvesters
