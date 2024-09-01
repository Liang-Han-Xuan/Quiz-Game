//獲取元素
const body=document.querySelector('body')
const card=document.getElementById("card");

const quiz=document.getElementById('quiz');
const question=document.getElementById('question');
const ans_boxes=document.getElementById('answer_boxes');
const ans_btns=ans_boxes.querySelectorAll('.btn');

const start_btn=document.getElementById('start');
const next_btn=document.getElementById('next');
const final=document.getElementById('final');
const restart=document.getElementById('restart')

//題目
const quiz_list=[
    {
        question:'What country is in Asia ?',
        ans:[
            {text:'Taiwan',result:true},
            {text:'USA',result:false},
            {text:'Paris',result:false},
            {text:'Italy',result:false}
        ]
    },
    {
        question:'What country is in America ?',
        ans:[
            {text:'Taiwan',result:false},
            {text:'USA',result:true},
            {text:'Paris',result:false},
            {text:'Italy',result:false}
        ]
    },
    {
        question:'What country is in next to Greece ?',
        ans:[
            {text:'Taiwan',result:false},
            {text:'USA',result:false},
            {text:'Paris',result:false},
            {text:'Italy',result:true}
        ]
    }
]

let quiz_random=quiz_list.sort(()=>Math.random()-0.5);

//開始，解除、新增隱藏，並打開題目
function Start(){
    quiz.classList.remove('hide');
    next_btn.classList.remove('hide');
    start_btn.classList.add('hide');
    showQuiz();
}
//檢視題目 + 按鈕是否觸發
let current_index=0,score=0,goNext;
function showQuiz(){
    goNext=false;
    question.innerHTML=`Q${current_index+1}. ${quiz_random[current_index].question}`;
    for(let i=0;i<4;i++){
        ans_btns[i].innerHTML=quiz_random[current_index].ans[i].text;
        ans_btns[i].detail=quiz_random[current_index].ans[i].result;
    }
    current_index++;
}
//next_btn 兩功能：為選選項=>警告，有選選項=>下一個頁面
function Alert(){
    if(goNext){
        Next();
        Clean();
    } 
    else{
        console.log('alert');
    }
}
//未選擇答案介面
function Clean(){
    ans_btns.forEach(btn=>{
        if(btn.classList.contains('correct')){
            btn.classList.remove('correct');
            body.classList.remove('correct');
            ans_boxes.style.pointerEvents='auto';
        }
        else if(btn.classList.contains('wrong')){
            btn.classList.remove('wrong');
            body.classList.remove('wrong');
            ans_boxes.style.pointerEvents='auto';
        }
    })
}
//顯示正確答案
function Right_ans(){
    ans_btns.forEach(btn=>{
        if(btn.detail=='true'){
            btn.classList.add('correct');
        }
    })
}
//去到下一個頁面
function Next(){
        if(current_index<quiz_random.length){
            showQuiz();
        }
        else{
            quiz.classList.add('hide');
            next_btn.classList.add('hide');
            final.classList.remove('hide');
            final.innerText=`YOUR SCORE ${score}`;
            restart.classList.remove('hide');
        }
}

function Restart(){
    current_index=0;score=0;
    quiz_random=quiz_list.sort(()=>Math.random()-0.5);
    final.classList.add('hide');
    restart.classList.add('hide');
    quiz.classList.remove('hide');
    next_btn.classList.remove('hide');
    showQuiz();

}
start_btn.addEventListener('click',Start);//檢視考試內容
next_btn.addEventListener('click',Alert);//有選選項=>gogo ,沒有繼續選
ans_btns.forEach(btn=>{btn.addEventListener('click',()=>{
            if(btn.detail==true){
                btn.classList.add('correct');
                body.classList.add('correct');
                score++;
            }
            else{
                btn.classList.add('wrong');
                body.classList.add('wrong');
                Right_ans();
            }
            ans_boxes.style.pointerEvents='none';
            goNext=true;
    })
})
restart.addEventListener('click',Restart);



