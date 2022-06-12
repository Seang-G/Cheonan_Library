const quotes = [
  {
    quote: "남의 책을 읽는 데 시간을 보내라. 남이 고생한 것에 의해 쉽게 자기를 개선할 수 있다.",
    author: "소크라테스"
  },
  {
    quote: "처음 책을 읽을 때에는 한 사람의 친구와 알게 되고, 두 번째 읽을 때에는 옛 친구를 만난다. ",
    author: "중국 격언"
  },
  {
    quote: "가장 훌륭한 벗은 가장 좋은 책이다.",
    author: "체스터필드"
  },
  {
    quote: "책 속에는 과거의 모든 영혼이 가로누워 있다.",
    author: "토마스 칼라"
  },
  {
    quote: "집은 책으로, 정원은 꽃으로 가득 채워라.",
    author: "앤듀르 랑그"
  },
  {
    quote: "좋은 책을 읽는다는 것은 과거의 가장 훌륭한 사람들과 대화하는 것이다.",
    author: "데카르트"
  },
  {
    quote: "당신에게 가장 필요한 책은 당신으로 하여금 가장 많이 생각하게 하는 책이다.",
    author: "마크 트웨인"
  },
  {
    quote: "사귀는 벗을 보면 그 사람을 알 수 있듯이 읽는 책을 보면 그 사람의 품격을 알 수 있다.",
    author: "스마일즈"
  },
]

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

let randInt = getRandomInt(0, quotes.length)

quote.innerText = quotes[randInt].quote;
author.innerText = `- ${quotes[randInt].author} -`;