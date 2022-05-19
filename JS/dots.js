// ------------- dot 생성 ------------- //
const publicDots = document.querySelector("#public-dots");
const litleDots = document.querySelector("#litle-dots");

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
    makeDot(span, "📕");
    $("#public-dots").append(span);
  } else {
    makeNameBox(span);
    makeDot(span, "📗");
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

function makeDot(node, str){
  const span = document.createElement("span");
  span.innerText = str;
  span.classList.add("dot");
  node.appendChild(span);
}

var json = $.getJSON("../src/천안시_도서관.json", function(jsonData){
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