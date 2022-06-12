const wrap = document.querySelector("#main-wrap");

const table = document.createElement("table");
const thead = document.createElement("thead");
const tr = document.createElement("tr");
tr.innerHTML = "<th>도서관명</th><th>전화번호</th><th>도로명</th>";
thead.appendChild(tr);
table.appendChild(thead);

const tbody = document.createElement("tbody");
var json = $.getJSON("./src/data.json", function(jsonData){
  $.each(jsonData, function(_, data){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${data.도서관명}</td><td>${data.도서관전화번호}</td><td>${data.소재지도로명주소}</td>`;
    tbody.appendChild(tr);
  });
});
table.appendChild(tbody);

table.setAttribute("border", "3px");

wrap.appendChild(table);