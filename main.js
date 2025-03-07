// Sorry for what you're about to read

const mainContainer = document.getElementsByClassName("pr-0")[0];

const mainObserver = new MutationObserver(quickPrint);
const debugObserver = new MutationObserver(mutationLogger);
const config = {
  attributes: true,
  childList: true,
  subtree: true,
};

var paymentExecutor = new PaymentFlowController();

function handleEvents(eventList) {
  eventList.forEach((event) => {
    paymentExecutor.eventHandler(event);
  });
}

// mutationObserver callback
// called each time a render happens - callStack free
function quickPrint(mutationList) {
  var renderEventList = new Set();

  mutationList.forEach((m) => {
    // filter irrelevant mutation types
    if (m.type !== "childList" && m.type !== "attributes") {
      return;
    }
    const targetClassName = m.target.className;

    switch (targetClassName) {
      // MAIN PAGE EVENT: Incomplete Sell Data Pop-Up
      case "el-message el-message--warning el-message-fade-enter-active el-message-fade-enter-to":
        renderEventList.add("payBtnPressed");
        break;

      // event: client selection List is open
      case "el-select-dropdown el-popper el-zoom-in-top-enter el-zoom-in-top-enter-active":
        renderEventList.add("clientPanelOpened");
        break;

      // event: payment quick check up page loaded
      case "card-body":
        renderEventList.add("paymentReviewLoaded");
        break;

      // event: confirmation pop - up displayed
      case "el-message-box__wrapper msgbox-fade-enter-active msgbox-fade-enter-to":
        renderEventList.add("confirmationPopupLoaded");
        break;

      /* // event: print pdf window opens
      case "el-dialog__wrapper":
        renderEventList.add("printPanelLoaded");
        break; */

      // event: print pdf window opens
      case "":
        if (m.attributeName == 'src') {
          renderEventList.add("printPanelLoaded");
        }
        break;
    }
    if (renderEventList.size > 0) {
      console.log(renderEventList);
    }
  });
  handleEvents(renderEventList);
}

bindKeyActions();

window.onload = function () {
  const searchByCodeToggle = getElementByText(
    "Buscar con escáner de código de barras"
  );

  if (searchByCodeToggle) {
    searchByCodeToggle.click();
  }

  const showSearchbarBtn = document.getElementsByClassName("fa fa-bars");

  if (!showSearchbarBtn) {
    console.log("showSearchbarBtn not found");
  }
  for (let i = 0; i < showSearchbarBtn.length; i++) {
    showSearchbarBtn[i].click();
  }

  const saleNoteBtn = getElementByText("N. VENTA");

  if (saleNoteBtn) {
    saleNoteBtn.click();
  }

  const tooltips = document.getElementsByClassName('notifications');
  for (var i = tooltips.length - 1; i >= 0; --i) {
    tooltips[i].remove();
  }


  const posPaymentBtn = getElementByText(
    "PAGAR",
    "el-button submit btn btn-block btn-primary"
  );

  if (posPaymentBtn) {
    posPaymentBtn.addEventListener("click", () => {
      console.log("payment btn pressed");
      try {
        paymentExecutor = new PaymentFlowController();
        mainObserver.observe(mainContainer, config);
        //debugObserver.observe(mainContainer, config);
      } catch (e) {
        console.log(`error iniating observer :\n ${e}`);
      }
    });
  }
  mainObserver.observe(mainContainer, config);
  //createSwith();
};

function createSwith() {
  let wrapperDiv = document.createElement("div");
  wrapperDiv.className = "custom-toggle-container";

  let toggleSwitch = document.createElement("button");
  toggleSwitch.className = "custom-toggle-btn";
  toggleSwitch.innerText = "Toggle";
  // Append the toggle to the new div
  wrapperDiv.appendChild(toggleSwitch);

  // Get the header and logo container
  let header = document.querySelector(".header");
  let logoContainer = document.querySelector(".logo-container");
  let headerRight = document.querySelector(".header-right");

  // Insert the new div between logo-container and header-right
  if (header && logoContainer && headerRight) {
    header.insertBefore(wrapperDiv, headerRight);
  }

  let toggleState = true;
  toggleSwitch.addEventListener("click", function () {
    toggleState = !toggleState; // Toggle the boolean
    console.log("Toggle State:", toggleState); // Debugging output
    toggleSwitch.innerText = toggleState ? "ON" : "OFF"; // Update button text
    if (!toggleState) {
      mainObserver.disconnect();
      console.clear();
    } else {
      mainObserver.observe(mainContainer, config);
    }
  });
}

//callback function that takes an Arary mutations
function mutationLogger(mutationList) {
  const attrMap = new Map();

  mutationList.forEach((m) => {

    /* console.log([m.type], " \n", [m.target.className], " \n", {
      type: m.type,
      attributeName: m.attributeName,
      characterData: m.characterData,
      attributeOldValue: m.attributeOldValue,
      src: Object.assign({},
        ...Array.from(m.target.attributes, ({name, value}) => ({[name]: value})))
    }); */
    if (m.type === "childList") {
      // skip non addded nodes
      if (!m.addedNodes || m.addedNodes.length === 0) {
        return;
      }
      console.log([m.type], " \n", [m.target.className], " \n", {
        type: m.type,
        attributeName: m.attributeName,
        addedNodes: m.addedNodes,
        removedNodes: m.removedNodes,
      });

      m.addedNodes.forEach((addedNode) => {
        if (addedNode instanceof HTMLDivElement) {
          console.log(`div added: \n ${addedNode.className}`);
        }
      });
    }

    if (m.type === "attributes") {
      const targetName = m.target.className;
      const targetStyle = m.target.style.cssText;

      if (m.attributeName !== "style" && m.attributeName !== "class") {
        return;
      }

      if (attrMap.has(targetName)) {
        const lastStyle = attrMap.get(targetName).lastStyle;
        // update target last styte
        if (lastStyle != targetStyle) {
          attrMap.set(targetName, { lastStyle: targetStyle });
          //console.info("node last style updated : ", targetName);
          return;
        }
        // mutation style hasn't changed - skip
        //console.info("mutation style hasn't changed : ", targetName);
        return;
      }

      // register {target - lastStyleAttr}
      attrMap.set(targetName, {
        lastStyle: targetStyle,
      });

      console.log([m.type], "\n", [m.target.className], "\n", {
        type: m.type,
        attributeName: m.attributeName,
        style: m.target.style.cssText,
      });

      m.addedNodes.forEach((addedNode) => {
        if (addedNode instanceof HTMLDivElement) {
          console.log(`div added: \n ${addedNode.className}`);
        }
      });
    }
  });
}

function bindKeyActions() {
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
}

init = function (a) {
  try {
    const clientDropdown = getElementByPlaceholder(
      "el-input__inner",
      "Cliente"
    );
    const firstListClient = document.getElementsByClassName(
      "el-select-dropdown__item"
    )[1];

    const paymentBtn = getElementByText("PAGAR");

    if (a == "F9" || a == "F10") {
      clientDropdown.click();
      firstListClient.click();
      paymentBtn.click();
    } else {
      paymentBtn.click();
    }
    mainObserver.observe(mainContainer, config);
  } catch (e) {
    console.log("BUTTON ERROR" + e);
  }
};
