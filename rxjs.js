let apiKey = "http://www.omdbapi.com/?i=tt3896198&apikey=20cf6cfe";
const input = document.querySelectorAll("input")[0];
const input2 = document.querySelectorAll("input")[1];
let collapsible = document.querySelector(".collapsible");

window.addEventListener("load", function() {
  collapsible.style.display = "none";
});

function debounce(callback, delay = 1000) {
  let timeout;
  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
}

async function getMovies(url, value) {
  let response = await axios.get(url, {
    params: {
      s: value
    }
  });
  if (response.data.Errors) {
    return [];
  } else {
    return response.data;
  }
}

function render(item, current) {
  return `
    <li>
      <div class="collapsible-header" style="padding: 0 1rem; ${
        current === 0
          ? "background-color: #3f51b5 !important; color: #fff !important;transform: scale(1.05)"
          : ""
      }">
        <p>${item.Title}</p>
      </div>
      <div class="collapsible-body">
        <img src="${
          item.Poster === "N/A"
            ? "https://images.unsplash.com/photo-1581405919332-d9f2f192dc6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            : item.Poster
        }" width="30%" />
      </div>
    </li>
  `;
}

function headerClick() {
  let headers = document.querySelectorAll(".collapsible-header");
  for (let header of headers) {
    header.addEventListener("click", function headerClick(e) {
      input.value = e.target.textContent.trim();
    });
  }
}

const onInput = debounce(async function oninput(e) {
  let data = await getMovies(apiKey, e.target.value);
  for (let [index, item] of data.Search.entries()) {
    let target = document.getElementById("target");
    target.innerHTML += render(item, index);
  }
  headerClick();
}, 1000);

document.addEventListener("click", e => {
  let root = document.querySelector(".dropdown");
  if (!root.contains(e.target)) {
    collapsible.style.display = "none";
  } else {
    collapsible.style.display = "block";
  }
});

input.addEventListener("input", onInput);
