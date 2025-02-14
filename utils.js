function printPdf(attemp = 0) {
  const maxRetries = 5;
  if (attemp > maxRetries) {
    console.log("printPdf Polling Timeout");
    return;
  }
  getPdfUrl()
    .then((url) => {
      var iframe = this._printIframe;
      if (!this._printIframe) {
        iframe = this._printIframe = document.createElement("iframe");
        document.body.appendChild(iframe);

        iframe.style.display = "none";
        //const newSale = getElementByText("Nueva venta");
        iframe.onload = function () {
          console.log(iframe.src);
          if (iframe.src.length > 50) {
            setTimeout(function () {
              iframe.focus();
              iframe.contentWindow.print();
            }, 100);
            //setTimeout(newSale.click(), 8000);
            //setTimeout(alert(newSale), 8000);
            //observer1.disconnect();
          } else {
            console.log("invalid iframe printing Process");
          }
        };
      }
      iframe.src = url;
    })
    .catch((e) => {
      console.log(attemp, "pdf Polling err", e);
      attemp++;
      setTimeout(() => printPdf(attemp), 1000);
    });
}

function getPdfUrl() {
  return new Promise((resolve, reject) => {
    var matchArray = document.getElementsByTagName("embed");
    var ticketPdf = null;

    for (var i = 0; i < matchArray.length; i++) {
      console.log("embedded elements \n", matchArray[i]);

      if (!matchArray[i].hasAttribute("src")) {
        reject("No 'src' attribute ticketPdf");
        return;
      }

      if (sanitize(matchArray[i].getAttribute("src")).includes("ticket")) {
        ticketPdf = matchArray[i];
        break;
      }
    }

    if (ticketPdf) {
      // Resolve with the 'src' URL of the ticketPdf embed element
      resolve(ticketPdf.src);
    } else {
      console.log("No embedded element with 'ticket' in the src.");
      reject("No valid embedded element found");
    }
  });
}

function getEmbedPdf() {
  var matchArray = document.getElementsByTagName("embed");

  var found = null;
  for (var i = 0; i < matchArray.length; i++) {
    console.log("embeded elements \n", matchArray[i]);
    if (!matchArray[i].hasAttribute("src")) {
      break;
    }
    if (sanitize(matchArray[i].getAttribute("src")).includes("ticket")) {
      found = matchArray[i];
      break;
    }
  }

  if (found) {
    return found;
  } else {
    console.log("No embeded element with ticket included");
    return null;
  }
}

function getElementByText(innerText, className = null) {
  var matchArray = document.getElementsByTagName("span");

  if (className) {
    matchArray = document.getElementsByClassName(className);
  }

  var found = null;
  for (var i = 0; i < matchArray.length; i++) {
    if (sanitize(matchArray[i].innerText).includes(sanitize(innerText))) {
      found = matchArray[i];
      break;
    }
  }

  if (found) {
    return found;
  } else {
    console.log("No element found matching the text: " + innerText);
    return null;
  }
}

function getElementByPlaceholder(className, innerText) {
  var htmlCollection = document.getElementsByClassName(className);
  var firstFoundElem = null;

  for (var i = 0; i < htmlCollection.length; i++) {
    if (
      sanitize(htmlCollection[i].getAttribute("placeholder")).includes(
        sanitize(innerText)
      )
    ) {
      firstFoundElem = htmlCollection[i];
      break;
    }
  }

  if (firstFoundElem) {
    return firstFoundElem;
  } else {
    console.log("No element found matching the placeHolder: " + innerText);
    return null;
  }
}

//removes accents
function sanitize(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
