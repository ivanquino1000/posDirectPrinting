class Action {
  constructor(name, triggerEvent, callback) {
    this.name = name;
    this.triggerEvent = triggerEvent;
    this.state = "";
    this.result = "";
    this.callback = callback;
  }

  execute() {
    console.log("executing action", this);
    if (this.result == "failed" || this.result == "success") {
      return;
    }
    try {
      this.callback();
      this.result = "success";
    } catch (e) {
      this.result = "failed";
      console.error("action cb error: \n", e);
    }
  }
}
