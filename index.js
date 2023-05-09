let timerLabel = document.querySelector("#timer");
let startBtn = document.querySelector("#startbtn");
let resetBtn = document.querySelector("#resetBtn");
let timerType = document.querySelector("#timertype");
let sessionAddBtn=document.querySelector("#sessionAdd");
let sessionMinusBtn=document.querySelector("#sessionMinus");
let breakAddBtn=document.querySelector("#breakAdd");
let breakMinusBtn=document.querySelector("#breakMinus");

let timerCounter=1;
let sessionTime=2;
let h,m=sessionTime,s=0;
let breakTime=1;
let wasSession=true;
let start=false;
let timeKeeper;

let fancyBorder=document.querySelector("#fancyborder");
let fancyBorderWidth=fancyBorder.clientWidth;
let totalSeconds=sessionTime*6000;
let ml=0;
let color="#00A0B0";

setLabels();

startBtn.addEventListener('click', function(){
    if(!start){            
        timeKeeper = setInterval(function(){            
            ml++;
            let unitWidth=ml/totalSeconds*fancyBorderWidth;
            let per=unitWidth/fancyBorderWidth*100;            
            fancyBorder.style.borderImage=`linear-gradient(to right, ${color} ${per}%, #292828 0%) 2`;            

            if(ml%100==0){
                s--;                
            }

            if(s==-1){
                s=59, m--;
            }

            if(m==-1){                
                if(wasSession){
                    m=breakTime;
                    s=0;
                    wasSession=false;                    
                    timerType.innerText="Break "+timerCounter;
                    timerCounter++;
                    timerLabel.classList.remove("text-blue");
                    timerLabel.classList.add("text-orange");
                    totalSeconds=breakTime*6000;
                    color="orangered";
                    fancyBorder.style.borderImage=`linear-gradient(to right,orangered 0%, #292828 0%) 2`;
                    ml=0;
                }
                else{
                    m=sessionTime;
                    s=0;
                    wasSession=true;
                    timerType.innerText="Session "+timerCounter;
                    timerLabel.classList.add("text-blue");
                    timerLabel.classList.remove("text-orange");
                    totalSeconds=sessionTime*6000;
                    color="#00A0B0";
                    fancyBorder.style.borderImage=`linear-gradient(to right,#00A0B0 0%, #292828 0%) 2`;
                    ml=0
                }
            }
            timerLabel.innerText=`${(m<10)?'0'+m:m}:${(s<10)?'0'+s:s}`;            
        },10);

        startBtn.innerText="Pause";    

        sessionAddBtn.disabled=true;        
        sessionMinusBtn.disabled=true;
        breakAddBtn.disabled=true;  
        breakMinusBtn.disabled=true;  
        start=true;
    }
    else{
        startBtn.innerText="Start";   
        clearInterval(timeKeeper);
        start=false;
    }
});

resetBtn.addEventListener("click",function(){    
    clearInterval(timeKeeper);

    timerLabel.innerText=`${(sessionTime<10)?'0'+sessionTime:sessionTime}:00`;
    timerLabel.classList.remove("text-blue","text-orange");
    timerLabel.classList.add("text-blue");
    startBtn.innerText="Start";
    timerCounter=1;
    m=sessionTime;
    totalSeconds=sessionTime*6000;    
    ml=0;
    s=0;
    start=false;
    color="#00A0B0";
    fancyBorder.style.borderImage=`linear-gradient(to right, #00A0B0 0%, #292828 0%) 2`;

    sessionAddBtn.disabled=false;        
    sessionMinusBtn.disabled=false;
    breakAddBtn.disabled=false;  
    breakMinusBtn.disabled=false;

    timerType.innerText="Session 1";    
});

function setLabels(){
    document.querySelector("#sessionlabel").innerText=`${(sessionTime<10)?'0'+sessionTime:sessionTime} min`;
    document.querySelector("#breaklabel").innerText=`${(breakTime<10)?'0'+breakTime:breakTime} min`;
    timerLabel.innerText=`${(sessionTime<10)?'0'+sessionTime:sessionTime}:00`;
    m=sessionTime;
    totalSeconds=sessionTime*6000;
}
sessionAddBtn.addEventListener('click',function(){    
    sessionTime++;
    setLabels();
});
sessionMinusBtn.addEventListener('click',function(){
    if(sessionTime!=1){
        sessionTime--;
        setLabels();
    }
});
breakAddBtn.addEventListener('click',function(){
    breakTime++;
    setLabels();
});
breakMinusBtn.addEventListener('click',function(){
    if(breakTime!=1){        
        breakTime--;
        setLabels();
    }
});
