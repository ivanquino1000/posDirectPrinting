 case "el-message el-message--warning el-message-fade-enter-active el-message-fade-enter-to":
      
{
  const clickClientDropdown = new posPrintAction();
  actionName = "open client list";
  actionType = "attributes";

  if (isActionComplete(actionName)) {
    break;
  }

  if (m.type !== actionType) {
    console.log(
      `${actionName} \n type mismatch : ${m.target.className}`
    );
    break;
  }

  const clientDropdownBtn = getElementByPlaceholder(
    "el-input__inner",
    "Cliente"
  );

  if (clientDropdownBtn) {
    clientDropdownBtn.click();
    setCompleteState(actionName, true);
  } else {
    console.log("error clientDropdownBtn not found");
    break;
  }
}

//
case "el-select-dropdown el-popper el-zoom-in-top-enter el-zoom-in-top-enter-active":
      
{
  actionName = "select client";
  actionType = "attributes";

  if (isActionComplete(actionName)) {
    break;
  }

  if (m.type !== actionType) {
    console.log(
      `${actionName} \n type mismatch : ${m.target.className}`
    );
    break;
  }

  const defaultClientBtn = getElementByText(
    "Clientes",
    "el-select-dropdown__item"
  );

  if (defaultClientBtn) {
    defaultClientBtn.click();
    setCompleteState(actionName, true);
  } else {
    console.log("error defaultClientBtn not found");
    break;
  }
}
///
case "card-body":
{
  actionName = "click check-up payment";
  actionType = "attributes";
  if (isActionComplete(actionName)) {
    break;
  }

  if (m.type !== actionType) {
    console.log(
      `${actionName} \n type mismatch : ${m.target.className}`
    );
    break;
  }
  const checkupPayBtn = getElementByText("PAGAR");
  if (checkupPayBtn) {
    console.log("checkupPayBtn:", checkupPayBtn);
    checkupPayBtn.click();
    setCompleteState(actionName, true);
  } else {
    console.log("error checkupPayBtn not found");
    break;
  }
}
///
case "el-message-box__wrapper msgbox-fade-enter-active msgbox-fade-enter-to":
      
{
  actionName = "payment confirmation pop-up";
  actionType = "attributes";
  if (isActionComplete(actionName)) {
    break;
  }

  if (m.type !== actionType) {
    console.log(
      `${actionName} \n type mismatch : ${m.target.className}`
    );
    break;
  }

  const confirmationPayBtn = getElementByText(
    "SI",
    "el-button el-button--default el-button--small el-button--primary"
  );

  if (confirmationPayBtn) {
    confirmationPayBtn.click();
    setCompleteState(actionName, true);
  } else {
    console.log("error confirmationPayBtn not found");
    break;
  }
}
//

      // debug event: check pdf embed panel updates
      case "pr-0 el-popup-parent--hidden":
        {
          actionName = "check pdf wrapper";
          actionType = "childList";
          if (isActionComplete(actionName)) {
            break;
          }

          if (m.type !== actionType) {
            console.log(
              `${actionName} \n type mismatch : ${m.target.className}`
            );
            break;
          }

          const pdfWrapper = document.getElementsByClassName("el-dialog__body");
          const copyElement = pdfWrapper[0].cloneNode(true);
          console.log("copypdfWrapper Element: \n", copyElement);
        }
        break;

      // event: print pdf window opens
      case "el-dialog__wrapper":
        {
          actionName = "next sell";
          actionType = "attributes";
          if (isActionComplete(actionName)) {
            break;
          }

          if (m.type !== actionType) {
            console.log(
              `${actionName} \n type mismatch : ${m.target.className}`
            );
            break;
          }

          if (isPdfReady()) {
            const h = getEmbedPdf();
            h.onload = function () {
              setTimeout(printPdf(h.src), 500);
            };
          } else {
            console.log("PDF was not ready within the timeout.");
            break;
          }

          const newSellBtn = getElementByText(
            "Nueva venta",
            "el-button x-button x-button-cancel el-button--default el-button--small"
          );

          if (newSellBtn) {
            newSellBtn.click();
            setCompleteState(actionName, true);
          } else {
            console.log("error newSellBtn not found");
            break;
          }
        }
        break;