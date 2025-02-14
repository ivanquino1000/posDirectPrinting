
/* 

// //////////////////////////////////////////////////////////
const todo = document.getElementsByClassName("container-fluid p-0")[0];

let lastTotal = 0;
let actionBt;

window.onload = function () {
  obs = new MutationObserver(talk);
  obs.observe(todo, opt);
  observer1 = new MutationObserver(print);
  const codigo = document.getElementsByClassName("el-switch__core")[0];
  const input = document.getElementsByClassName("fa fa-bars")[0];
  codigo.click();
  input.click();
};

let opt = {
  childList: true,
  subtree: true,
};

let regex = /^([\w\-]+)/gm;
let regexfix = /\-+\s*[a-zA-Z]{3,}/gm;
let regexFloat = /\d*\.*\d/gm;

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "F7":
    case "F8":
    case "F9":
    case "F10":
      e.preventDefault();
      observer1.disconnect();
      break;
  }
});
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "F7":
    case "F8":
    case "F9":
    case "F10":
      actionBt = e.key;
      init(e.key);
      break;
  }
});
init = function (a) {
  try {
    const b = document.getElementsByClassName(
      "row text-white m-0 p-0 h-50 d-flex align-items-center bg-info pointer"
    )[0];
    const total = document.getElementsByClassName("font-weight-semibold h5")[1]
      .innerHTML;
    const select = document.getElementsByClassName(
      "el-input el-input--small el-input--suffix"
    )[0];
    const cliente = document.getElementsByClassName(
      "el-select-dropdown__item"
    )[0];
    let speechTotal = new SpeechSynthesisUtterance(
      "su total es de" +
        parseFloat(total.trim().match(regexFloat)).toFixed(1) +
        "soles"
    );
    speechTotal.rate = 3;
    if (a == "F9" || a == "F10") {
      window.speechSynthesis.speak(speechTotal);
      select.click();
      cliente.click();
      b.click();
    } else {
      window.speechSynthesis.speak(speechTotal);
      b.click();
    }
    observer1.observe(todo, opt);
  } catch (e) {
    console.log("BUTTON ERROR" + e);
  }
};

printPdf = function (url) {
  var iframe = this._printIframe;
  if (!this._printIframe) {
    iframe = this._printIframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.style.display = "none";
    const newSale = document.getElementsByClassName(
      "el-button float-right el-button--primary el-button--small"
    )[0];
    iframe.onload = function () {
      if (iframe.src.length > 50) {
        setTimeout(function () {
          iframe.focus();
          iframe.contentWindow.print();
        }, 100);
        setTimeout(newSale.click(), 8000);
        setTimeout(alert(newSale), 8000);
        observer1.disconnect();
      } else {
        console.log("empty");
      }
    };
  }
  iframe.src = url;
};

function print(m) {
  for (m of m) {
    if (m.addedNodes.length > 0 && m.addedNodes.length <= 1) {
      console.log("observe " + m.target.className);
      switch (m.target.className) {
        case "control-label":
          try {
            const docTypeF = document.getElementsByClassName(
              "el-radio-button el-radio-button--small"
            )[0];
            const docTypeB = document.getElementsByClassName(
              "el-radio-button el-radio-button--small"
            )[1];
            const docTypeN = document.getElementsByClassName(
              "el-radio-button el-radio-button--small"
            )[2];

            switch (actionBt) {
              case "F9":
                docTypeN.click();
                break;
              case "F8":
              case "F10":
                docTypeB.click();
                break;
              case "F7":
                docTypeF.click();
                break;
            }
          } catch (e) {
            console.log("not button: " + e);
          }
        case "el-select-dropdown el-popper":
          try {
            const pay = document.getElementsByClassName(
              "btn btn-block btn-primary"
            )[0];
            setTimeout(pay.click(), 3000);
          } catch (e) {
            console.log("not button: " + e);
          }
        case "el-dialog":
          try {
            const h = document.getElementById("nemo");
            h.onload = function () {
              setTimeout(printPdf(h.src), 500);
            };
          } catch (e) {
            console.log("not charged " + e);
          }
      }
    }
  }
}
function talk(m) {
  for (m of m) {
    if (m.addedNodes.length > 0 && m.addedNodes.length <= 1) {
      console.log("observe " + m.target.className);
      switch (m.target.className) {
        case "row col-lg-12 m-0 p-0":
          try {
            let list = document.getElementsByClassName(
              "table table-sm table-borderless mb-0 pos-list-items"
            )[0];
            let search = document.getElementsByClassName(
              "table table-sm table-borderless mb-0 pos-list-items"
            )[2];
            let itemDesc = document.getElementsByClassName(
              "row col-lg-12 m-0 p-0"
            )[1];
            list.className = "row col-lg-12 m-0 p-0";
            search.className = "row";
            itemDesc.className =
              "table table-sm table-borderless mb-0 pos-list-items";
          } catch (e) {
            console.log("not added");
          }
          break;
        case "table table-sm table-borderless mb-0 pos-list-items":
          try {
            let = regexId = /NIU/gm;
            if (m.target.rows[0].innerText.match(regexId) == "NIU") {
              const desc =
                document.getElementsByClassName("item-description")[0]
                  .innerHTML;
              const total = document.getElementsByClassName(
                "font-weight-semibold h5"
              )[1].innerHTML;
              var h = document.getElementsByClassName(
                "row text-white m-0 p-0 h-50 d-flex align-items-center bg-info pointer"
              )[0];
              //const synth = window.speechSynthesis;

              let descLow = desc.toLowerCase();
              let productName = descLow.trim().match(regex); //fix);
              let price =
                parseFloat(total.trim().match(regexFloat)) - lastTotal;

              //let voices = synth.getVoices()
              //quitar comment del price to talk the price
              let speech = new SpeechSynthesisUtterance(
                productName + "de" + price.toFixed(1) + "soles"
              );
              //speech.voice = voices[0]
              speech.rate = 3; //5
              window.speechSynthesis.speak(speech);
              console.log(lastTotal);
              lastTotal = price;
              let speechTotal = new SpeechSynthesisUtterance(
                "total" +
                  parseFloat(total.trim().match(regexFloat)).toFixed(1) +
                  "soles"
              );
              //speechTotal.voice = voice[1]
              speechTotal.rate = 4;
              //h.onclick = window.speechSynthesis.speak(speechTotal);
              console.log(m.target.rows[0].innerText);
              console.log(price);
            } else {
              console.log("Non product");
            }
          } catch (e) {
            console.log(e);
            setTimeout(observer.observe(todo, opt), 10000);
          }
          break;
        default:
          try {
            const total1 = document.getElementsByClassName(
              "font-weight-semibold h5"
            )[1].innerHTML;
            lastTotal = parseFloat(total1.trim().match(regexFloat)).toFixed(2);
            console.log("second total 1" + total1);
            console.log("Second float" + lastTotal);
          } catch (err) {
            //const total1 = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
            //totalNum= parseFloat(total1.trim().match(regexFloat)).toFixed(2);
            //lastTotal = totalNum
            //console.log("Error total:"+ lastTotal)
            //console.log("Error float" + totalNum)
          }
      }
    }
  }
}
 */

function print(m) {
    for (m of m) {
      if (m.addedNodes.length > 0 && m.addedNodes.length <= 1) {
        console.log("observe " + m.target.className);
        switch (m.target.className) {
          // select receipt type
          case "control-label":
            try {
              const docTypeF = getElementByText("FACTURA");
              const docTypeB = getElementByText("BOLETA");
              const docTypeN = getElementByText("N. VENTA");
  
              switch (actionBt) {
                case "F9":
                  docTypeN.click();
                  break;
                case "F8":
                case "F10":
                  docTypeB.click();
                  break;
                case "F7":
                  docTypeF.click();
                  break;
              }
            } catch (e) {
              console.log("not button: " + e);
            }
            break;
  
          // click payment button
          case "el-select-dropdown el-popper":
            try {
              const pay = getElementByText("PAGAR");
              setTimeout(pay.click(), 3000);
  
              const confirm = document.getElementsByClassName(
                "el-button el-button--default el-button--small el-button--primary"
              )[0]; // getElementByText("SI");
              setTimeout(confirm.click(), 3000);
            } catch (e) {
              console.log("not button: " + e);
            }
            break;
  
          // click payment button
          case "card-body":
            try {
              const confirm = getElementByText("SI");
              setTimeout(confirm.click(), 3000);
            } catch (e) {
              console.log("not button: " + e);
            }
            break;
  
          // print receipt
          case "el-dialog x-modal-container":
            try {
              const h = document.getElementsByTagName("embed")[1];
              h.onload = function () {
                setTimeout(printPdf(h.src), 500);
              };
              observer1.disconnect();
            } catch (e) {
              console.log("not charged " + e);
            }
            break;
        }
      }
    }
  }
  