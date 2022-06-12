const wrap = document.querySelector("#main-wrap");
const info = document.querySelector("#info");
const infoX = document.querySelector("#info-X");
const infoTitle = info.querySelector("#info-header h2");
const infoMain = info.querySelector("#info-main");

const colList1 = ["도서관유형",	"휴관일",	"평일운영시작시각",	"평일운영종료시각",	"토요일운영시작시각",	"토요일운영종료시각",	"공휴일운영시작시각",	"공휴일운영종료시각",	"열람좌석수",	"자료수(도서)",	"자료수(연속간행물)",	"자료수(비도서)",	"대출가능권수",	"대출가능일수",	"소재지도로명주소",	"도서관전화번호",	"홈페이지주소"];
const colList2 = ["도서관명", "도서관전화번호", "소재지도로명주소"];


function getNaverMap(obj){
  return `https://map.naver.com/v5/search/천안시${obj[colList2[0]]}`
}

function addInfo(node, obj){
  node.addEventListener("click", ()=>{
    infoTitle.innerText = obj.도서관명;
    infoMain.innerText = ""
    for (let i=0; i<colList1.length; i++) {
      let h3 = document.createElement("h3");
      let div = document.createElement("div");
      switch(i){
        case 2:
          h3.innerText = "평일운영시간";
          div.innerHTML = `${obj[colList1[i]]} ~ ${obj[colList1[i+1]]}`;
          i += 1;
          break;
        case 4:
          h3.innerText = "토요일운영시간";
          div.innerHTML = `${obj[colList1[i]]} ~ ${obj[colList1[i+1]]}`;
          i += 1;
          break;
        case 6:
          h3.innerText = "공휴일운영시간";
          div.innerHTML = `${obj[colList1[i]]} ~ ${obj[colList1[i+1]]}`;
          i += 1;
          break;
        case colList1.length-1:
          h3.innerText = colList1[i];
          div.innerHTML = `<a href="${obj[colList1[i]]}" target="_blank">${obj[colList1[i]]}</a>`;
          i += 1;
          break;
        default:
          h3.innerText = colList1[i];
          div.innerText = obj[colList1[i]];
      }
      infoMain.appendChild(document.createElement("hr"));
      infoMain.appendChild(h3);
      infoMain.appendChild(div);
    }
    infoX.style.top = "100px";
    info.style.top = 0;
  })
}

var json = $.getJSON("./src/data.json", function(jsonData){
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  for (let col of colList2){
    let th = document.createElement("th");
    th.innerText = col;
    thead.appendChild(th);
  }

  table.appendChild(thead);

  $.each(jsonData, function(_, data){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let a = document.createElement("a");

    a.innerText = data[colList2[0]];
    addInfo(a, data);
    td.appendChild(a);
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerText = data[colList2[1]];
    tr.appendChild(td);

    td = document.createElement("td");
    a = document.createElement("a");
    a.href = getNaverMap(data);
    a.target = "_blank"
    a.innerText = data[colList2[2]];
    td.appendChild(a);
    tr.appendChild(td);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  table.setAttribute("border", "3px");
  wrap.appendChild(table);
});

infoX.addEventListener("click", ()=>{
  infoX.style.top = "-100px";
  info.style.top = info.offsetHeight * (-1) + "px";
})