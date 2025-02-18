// create from an array of objects

class PaymentFlowController {
  constructor() {
    this.value = 0;
    this.triggerEvents = this.getTriggerEventList();
    this.actions = this.createActionList();
  }

  createActionList() {
    var actions = allowed_actions.map((actionLayout) => {
      const action = new Action(
        actionLayout.action,
        actionLayout.triggerEvent,
        actionLayout.cb
      );
      return action;
    });
    return actions;
  }

  getTriggerEventList() {
    var events = allowed_actions.map((actionLayout) => {
      const event = actionLayout.triggerEvent;
      return event;
    });
    console.log(events);
    return events;
  }

  eventHandler(event) {
    if (this.triggerEvents.includes(event)) {
      console.log("eventHandler: ", event);
      let action = this.findAction(event);
      action.execute()
    }
  }

  findAction(event) {
    for (const action of this.actions) {
      if (action.triggerEvent == event) {
        return action;
      }
    }
    return null;
  }

  // checks for conditions on wrapper before printing
  isPdfReady() {
    const startTime = Date.now();
    const timeout = 20000; // 10 seconds
    const interval = 1000; // 1 second interval

    // This function checks the condition and simulates the while loop
    const intervalId = setInterval(() => {
      if (Date.now() - startTime > timeout) {
        console.log("Timeout reached without finding src attribute.");
        clearInterval(intervalId); // Stop the interval
        return false; // Timeout case
      }
      const matchArray = document.getElementsByTagName("embed");
      for (var i = 0; i < matchArray.length; i++) {
        if (!matchArray[i].hasAttribute("src")) {
          continue;
        }

        if (sanitize(matchArray[i].getAttribute("src")).includes("ticket")) {
          console.log("pdf ticket ready");
          clearInterval(intervalId); // Stop the interval
          return true; // Return true if PDF is ready
        }
      }
    }, interval);
  }

}
