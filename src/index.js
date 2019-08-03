var box = document.querySelector(".box");

fetch("/api/userdata")
  .then(res => {
    return res.json();
  })
  .then(data => {
    box.style.width = data.width;
    box.style.height = data.height;
    box.style.background = data.background;
  });

function getSearchResultApi(search) {
//   return `https://api.github.com/search/repositories?q=${search}&sort=stars`;
    return `search/repositories?q=${search}&sort=stars`;
}

//创建页面
let page = document.createElement("div");
document.body.appendChild(page);
//创建搜索框
let input = document.createElement("input");
page.appendChild(input);
//创建所搜按钮
let searchBtn = document.createElement("button");
searchBtn.innerHTML = "搜索";
page.appendChild(searchBtn);
//创建显示页面
let result = document.createElement("div");
document.body.appendChild(result);
//点击事件
searchBtn.onclick = function() {
  let str = input.value.trim();

  if (str) {
    console.log(str);
    let url = getSearchResultApi(str);
    console.log(url);
    getDataFromServer(url);
  }
  function getDataFromServer(url) {
    fetch(url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        creatResult(data.items);
      })
      .catch(err => {
        console.log(err, "error");
      });
  }
};

function creatResult(itemArr) {
  let str = "";
  for (let i = 0; i < itemArr.length; i++) {
    str += `<div>
           <a href="${itemArr[i].html_url}">${itemArr[i].full_name}</a>
           <p>${itemArr[i].description}</p>
           </div>`;
  }
//   console.log(str)
  result.innerHTML = str;
}
