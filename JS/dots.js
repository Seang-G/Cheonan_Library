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
  span.classList.add("dot");

  if (obj.도서관유형 == '공공도서관'){
    span.classList.add("public");
    span.innerHTML = "📕";
    makeNameBox(span)
    span.addEventListener(onmouseover, function(){
      toggleHidden(span.children[0])
    });
    publicDots.appendChild(span);
  } else {
    span.classList.add("litle");
    span.innerHTML = "📗";
    makeNameBox(span)
    span.addEventListener(onmouseover, function(){
      toggleHidden(span.children[0])
    });
    litleDots.appendChild(span);
  }
}

function makeNameBox(node){
  const div = document.createElement("div");
  div.style = 'width:10px; height:10px; background-color:white;'
  div.innerHTML = node["data-name"];
  div.classList.add("hidden");
  node.appendChild(div);
}

var json = $.getJSON("../../천안시_도서관.json", function(jsonData){
  $.each(jsonData, function(_, data){
    addDots(data)
  })
});

// ------------- 토글 ------------- //

const buttons = document.querySelectorAll("#buttons button");
const publicButton = buttons[0];
const litleButton = buttons[1];

function toggleHidden(node){
  node.classList.toggle("hidden");
}

function publicButtonHandler(){
  toggleHidden(publicDots);
}

function litleButtonHandler(){
  toggleHidden(litleDots);
}

publicButton.addEventListener("click", publicButtonHandler);
litleButton.addEventListener("click", litleButtonHandler);

// ------------- hover ------------- //