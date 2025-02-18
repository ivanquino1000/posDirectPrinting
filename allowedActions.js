const allowed_actions = [
  {
    action: "openClientPanel",
    triggerEvent: "payBtnPressed",
    cb: () => {
      const clientDropdownBtn = getElementByPlaceholder(
        "el-input__inner",
        "Cliente"
      );

      if (clientDropdownBtn) {
        clientDropdownBtn.click();
      } else {
        console.log("error clientDropdownBtn not found");
        return;
      }
    },
  },
  {
    action: "selectClient",
    triggerEvent: "clientPanelOpened",
    cb: () => {
      const defaultClientBtn = getElementByText(
        "Clientes",
        "el-select-dropdown__item"
      );

      if (defaultClientBtn) {
        defaultClientBtn.click();
      } else {
        console.log("error defaultClientBtn not found");
        return;
      }
    },
  },
  {
    action: "click check-up pay btn",
    triggerEvent: "paymentReviewLoaded",
    cb: () => {
      const checkupPayBtn = getElementByText("PAGAR");
      if (checkupPayBtn) {
        console.log("checkupPayBtn:", checkupPayBtn);
        checkupPayBtn.click();
      } else {
        console.log("error checkupPayBtn not found");
        return;
      }
    },
  },
  {
    action: "accept confirmation pop-up",
    triggerEvent: "confirmationPopupLoaded",
    cb: () => {
      const confirmationPayBtn = getElementByText(
        "SI",
        "el-button el-button--default el-button--small el-button--primary"
      );

      if (confirmationPayBtn) {
        confirmationPayBtn.click();
      } else {
        console.log("error confirmationPayBtn not found");
        return;
      }
    },
  },
  {
    action: "next sell",
    triggerEvent: "printPanelLoaded",
    cb: () => {
      printPdf();
      const newSellBtn = getElementByText(
        "Nueva venta",
        "el-button x-button x-button-cancel el-button--default el-button--small"
      );

      if (newSellBtn) {
        newSellBtn.click();
        mainObserver.disconnect();
      } else {
        console.log("error newSellBtn not found");
        return;
      }


      const tooltips = document.getElementsByClassName('notifications');
      for (var i = tooltips.length - 1; i >= 0; --i) {
        tooltips[i].remove();
      }


      const saleNoteBtn = getElementByText("N. VENTA");

      if (saleNoteBtn) {
        saleNoteBtn.click();
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
    },
  },
];
