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

export default errorCheck