const main = document.querySelector("main");
const section = document.createElement("section");

let heightOrWidth = ``;
let inputArray = [];
let scaleArray = [];

// Buttons & inputs
const arrayInput = document.querySelector("input");
const selectOption = document.querySelector(".option");
const button = document.querySelector("#draw");
const spaceButton = document.querySelector("#space");

// main.insertAdjacentHTML('afterbegin', <p>hello</p>)

// _____________________________________________
//      Button & select
// _____________________________________________
selectOption.addEventListener("change", (event) => {
  heightOrWidth = event.target.value;
});

arrayInput.addEventListener("change", (event) => {
  inputArray = event.target.value.split(",");
});

// _____________________________________________
// scale bar-chart
// _____________________________________________
const scaleChart = () => {
  let largestNumber = 0;
  // find the largest number
  inputArray.forEach((element) => {
    if (parseInt(element) > largestNumber) {
      largestNumber = element;
    }
  });

  // scale chart
  if (largestNumber < 5) {
    inputArray.forEach((element) => {
      scaleArray.push({ color: randomColor(), item: element * 100 });
    });
  } else if (largestNumber < 10) {
    inputArray.forEach((element) => {
      scaleArray.push({ color: randomColor(), item: element * 65 });
    });
  } else if (largestNumber < 20) {
    inputArray.forEach((element) => {
      scaleArray.push({ color: randomColor(), item: element * 30 });
    });
  } else if (largestNumber < 50) {
    inputArray.forEach((element) => {
      scaleArray.push({ color: randomColor(), item: element * 12 });
    });
  } else if (largestNumber < 250) {
    inputArray.forEach((element) => {
      scaleArray.push({ color: randomColor(), item: element * 2 });
    });
  }
};

// _____________________________________________
// Generates html for bar-chart
// _____________________________________________
const generateHtml = (space) => {
  let html = ``;
  let htmlWithSpace = ``;
  let largestNumber = 0;

  // scale items first
  scaleChart();

  // error check
  errorCheck();

  // find the largest number in the scaled Array
  scaleArray.forEach((element) => {
    if (parseInt(element.item) > largestNumber) {
      largestNumber = element.item;
    }
  });

  // find the largest number in the input Array
  let inputArrayLargeNumber = 0;
  inputArray.forEach((element) => {
    if (parseInt(element) > inputArrayLargeNumber) {
      inputArrayLargeNumber = element;
    }
  });

  // create html
  scaleArray.map((item) => {
    if (space === false) {
      html += `<div class='bar-${heightOrWidth}' style='${heightOrWidth}: ${item.item}px;  background-color: #${item.color};'></div>`;
    } else {
      html += `<div class='bar-${heightOrWidth}' style='${heightOrWidth}: ${
        item.item
      }px;  background-color: #${item.color};'></div>
      <div style='${
        heightOrWidth === "width" ? "height" : "width"
      }: 10px;  background-color: white;'></div>`;
    }
  });

  // create html with space between
  scaleArray.map((item) => {
    htmlWithSpace += `<div class='bar-${heightOrWidth}' style='${heightOrWidth}: ${
      item.item
    }px;  background-color: #${item.color};'></div>
    <div style='${
      heightOrWidth === "width" ? "height" : "width"
    }: 10px;  background-color: white;'></div>`;
  });

  const finalHtml = `   
      <div id="chart" class="chart-${heightOrWidth} ${
    heightOrWidth === "width" ? "" : "chart"
  }">
      ${html}
      <div class="${heightOrWidth === "width" ? "x" : "y"}-axis">
      ${
        scaleArray.length === 0
          ? ""
          : `<div class="line${
              heightOrWidth === "height" ? "-vertical" : ""
            }" style="${heightOrWidth}:${largestNumber}px"></div>
          <span>0</span>
          <span class=${
            heightOrWidth === "width" ? "end" : "start"
          }>${inputArrayLargeNumber}</span>

        </div>`
      }
        </div>
      `;

  return main.insertAdjacentHTML("afterbegin", finalHtml);
};

// _____________________________________________
// Check for error
// _____________________________________________
const errorCheck = () => {
  // check for errors first
  if (scaleArray.length === 0) {
    main.insertAdjacentHTML(
      "afterbegin",
      `<p id='error'>Please enter numbers below 250</p>`
    );

    const removeError = document.getElementById("error");
    setTimeout(() => removeError.remove(), 5000);
  }
};

// _____________________________________________
// generate random color
// _____________________________________________
const randomColor = () => {
  const randomNumber = Math.random().toString().split(".")[1];
  const randomColor = randomNumber.slice(0, 6);
  return randomColor;
};

// _____________________________________________
// Generates Chart on Click
// _____________________________________________
button.addEventListener("click", (event) => {
  const chart = document.getElementById("chart");

  //remove bar chart if they is already a bar chart
  if (chart) {
    chart.remove();
    scaleArray = [];
  }

  generateHtml(false);
  event.preventDefault();
});

// _____________________________________________
// Generates Chart with space on Click
// _____________________________________________

spaceButton.addEventListener("click", (event) => {
  const chart = document.getElementById("chart");

  //remove bar chart if they is already a bar chart
  if (chart) {
    chart.remove();
    scaleArray = [];
  }

  generateHtml(true);
  event.preventDefault();
});
