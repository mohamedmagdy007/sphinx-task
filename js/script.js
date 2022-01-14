const Quetions = Array.from(document.querySelectorAll(".items .quetion"));
let quetionsCount = Quetions.length;
let currentSlide = 1;

let btnNext = document.querySelector(".btn-next");
let btnBack = document.querySelector(".btn-back");
let choose = document.querySelectorAll(".choose");
let reloadBtn = document.querySelector(".reloadBtn");
let reloadAllBtn = document.querySelector(".reloadAllBtn");
let showAnsBtn = document.querySelector(".showAns");
let numbers = document.querySelector(".numbers");
let container = document.querySelector(".container");
let wrapper = document.querySelector(".contant");

let elWidth = container.offsetWidth;
let elHeight = container.offsetHeight;
let audioRight = new Audio("audio/assets_right.wav");
let audioWrong = new Audio("audio/assets_wrong.wav");

btnNext.onclick = nextSlide;
btnBack.onclick = backSlide;
reloadBtn.onclick = removeAnswer;
reloadAllBtn.onclick = removeAnswerALL;
showAnsBtn.onclick = showAnswers;

function nextSlide() {
  if (!btnNext.classList.contains("disabled")) {
    currentSlide++;
    checker();
  } else {
    return false;
  }
}
function backSlide() {
  if (!btnBack.classList.contains("disabled")) {
    currentSlide--;
    checker();
  } else {
    return false;
  }
}
showAnswersEl = () => {
  let activedoc = Array.from(document.querySelector(".items .active").children);
  activedoc.forEach((item) => {
    if (item.classList.contains("que")) {
      item.querySelectorAll(".choose").forEach((item, index) => {
        if (item.dataset.answer === "correct") {
          item.classList.add("correct");
          item.parentElement.classList.replace("notcompleted", "completed");
          Array.from(item.parentElement.children).forEach((item) => {
            if (!item.classList.contains("correct")) {
              item.classList.add("disabled");
              item.setAttribute("disabled", "");
            }
          });
        }
      });
      item.querySelectorAll(".q").forEach((pp) => {
        if (pp.classList.contains("completed")) {
          showAnsBtn.classList.add("disabled");
          showAnsBtn.setAttribute("disabled", "");
        } else {
          showAnsBtn.classList.remove("disabled");
          showAnsBtn.removeAttribute("disabled");
        }
      });
    }
  });
};
function showAnswers() {
  if (currentSlide === 1) {
    showAnswersEl();
  } else {
    showAnswersEl();
  }
}

function removeAnswer() {
  if (currentSlide === 1) {
    removeAnswerEL();
  } else {
    removeAnswerEL();
  }
}
removeAnswerEL = () => {
  let activedoc = Array.from(document.querySelector(".items .active").children);
  activedoc.forEach((item) => {
    if (item.classList.contains("que")) {
      item.querySelectorAll(".choose").forEach((item) => {
        item.classList.remove("correct");
        item.classList.remove("disabled");
        item.removeAttribute("disabled");
        item.parentElement.classList.replace("completed", "notcompleted");
      });
    }
    item.querySelectorAll(".q").forEach((pp) => {
      if (pp.classList.contains("notcompleted")) {
        showAnsBtn.classList.remove("disabled");
        showAnsBtn.removeAttribute("disabled");
      }
    });
  });
};

function removeAnswerALL() {
  choose.forEach((item) => {
    item.classList.remove("correct");
    item.classList.remove("disabled");
    item.removeAttribute("disabled");
    item.parentElement.classList.replace("completed", "notcompleted");
    showAnsBtn.classList.remove("disabled");
    showAnsBtn.removeAttribute("disabled");
  });
}

function checker() {
  removeActive();
  numbers.textContent = `${currentSlide}  of  ${quetionsCount}`;
  Quetions[currentSlide - 1].classList.add("active");
  if (currentSlide === 1) {
    btnBack.classList.add("disabled");
    checkerAns();
  } else {
    btnBack.classList.remove("disabled");
    checkerAns();
  }

  if (currentSlide === quetionsCount) {
    btnNext.classList.add("disabled");
  } else {
    btnNext.classList.remove("disabled");
  }
}
checkerAns = () => {
  let activedoc = Array.from(document.querySelector(".items .active").children);
  activedoc.forEach((item) => {
    if (item.classList.contains("que")) {
      item.querySelectorAll(".choose").forEach((span) => {
        span.addEventListener("click", function () {
          if (span.dataset.answer === "correct") {
            span.classList.add("correct");
            span.parentElement.classList.replace("notcompleted", "completed");
            audioRight.play();
            Array.from(span.parentElement.children).forEach((item) => {
              if (!item.classList.contains("correct")) {
                item.classList.add("disabled");
                item.setAttribute("disabled", "");
              }
            });
          } else if (span.dataset.answer == "incorrect") {
            if (span.getAttribute("disabled") === "") {
              return true;
            } else {
              setTimeout(() => {
                span.classList.add("incorrect");
              }, 100);
              setTimeout(() => {
                span.classList.remove("incorrect");
              }, 1000);
              audioWrong.play();
            }
          }
        });
      });
      item.querySelectorAll(".q").forEach((pp) => {
        if (pp.classList.contains("completed")) {
          showAnsBtn.classList.add("disabled");
          showAnsBtn.setAttribute("disabled", "");
        } else {
          showAnsBtn.classList.remove("disabled");
          showAnsBtn.removeAttribute("disabled");
        }
      });
    }
  });
};

removeActive = () => {
  Quetions.forEach((que) => {
    que.classList.remove("active");
  });
};

window.addEventListener("load", () => {
  const loader = document.querySelector(".loading");
  loader.style.display = "none";
});

window.addEventListener("load", doResize);
window.addEventListener("resize", doResize);
function doResize() {
  let size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  let scale = Math.min(size.width / elWidth, size.height / elHeight);
  container.style.transform = `scale(${scale})`;
  container.style.top = "0";
  container.style.left = "0";
}
checker();
