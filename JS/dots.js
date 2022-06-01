// ------------- dot 생성 ------------- //
const publicDots = document.querySelector("#public-dots");
const litleDots = document.querySelector("#litle-dots");
const info = document.querySelector("#info");
const infoX = document.querySelector("#info-X");
const infoTitle = info.querySelector("#info-header h2");
const infoMain = info.querySelectorAll("#info-main>div");
const colList = ["도서관유형",	"휴관일",	"평일운영시작시각",	"평일운영종료시각",	"토요일운영시작시각",	"토요일운영종료시각",	"공휴일운영시작시각",	"공휴일운영종료시각",	"열람좌석수",	"자료수(도서)",	"자료수,(연속간행물)",	"자료수(비도서)",	"대출가능권수",	"대출가능일수",	"소재지도로명주소",	"도서관전화번호",	"홈페이지주소"];

function coorToPercent(xy){
  return [(xy[0]-36.62)/0.35*100, (xy[1]-127)/0.46*100];
}

function addDots(obj){
  const Pxy = coorToPercent([obj.위도, obj.경도]);
  const span = document.createElement("span");

  span.setAttribute("data-name", obj.도서관명);
  span.style = `bottom:${Pxy[0]}%; left:${Pxy[1]}%;`;

  if (obj.도서관유형 == '공공도서관'){
    makeNameBox(span);
    makeDot(span, "📕", obj);
    $("#public-dots").append(span);
  } else {
    makeNameBox(span);
    makeDot(span, "📗", obj);
    $("#litle-dots").append(span);
  }

  span.lastChild.addEventListener("mouseover", function(e){
    toggleHidden(e.path[1].children[0]);
  });

  span.lastChild.addEventListener("mouseleave", function(e){
    toggleHidden(e.path[1].children[0]);
  });
}

function makeNameBox(node){
  const div = document.createElement("span");
  div.innerText = node.getAttribute("data-name");
  div.classList.add("hidden", "simpleInfo");
  node.appendChild(div);
}

function makeDot(node, str, obj){
  const span = document.createElement("span");
  span.innerText = str;
  span.classList.add("dot");
  addInfo(span, obj);
  node.appendChild(span);
}

function addInfo(node, obj){
  node.addEventListener("click", ()=>{
    infoTitle.innerText = obj.도서관명;
    for (let i in colList) {
      infoMain[i].children[0].innerText = colList[i];
      infoMain[i].children[1].innerText = obj[colList[i]];
    }
    infoX.style.top = "100px";
    info.style.top = 0;
  })
}

var json = $.getJSON("../src/data.json", function(jsonData){
  $.each(jsonData, function(_, data){
    addDots(data);
  });
});

function toggleHidden(node){
  node.classList.toggle("hidden");
}

// ------------- 버튼제어 ------------- //

const buttons = document.querySelectorAll("#buttons button");
const publicButton = buttons[0];
const litleButton = buttons[1];

function publicButtonHandler(){
  toggleHidden(publicDots);
}

function litleButtonHandler(){
  toggleHidden(litleDots);
}

publicButton.addEventListener("click", publicButtonHandler);
litleButton.addEventListener("click", litleButtonHandler);
infoX.addEventListener("click", ()=>{
  infoX.style.top = "-100px";
  info.style.top = info.offsetHeight * (-1) + "px";
})