//  Just a prototype

let mainDiv = document.getElementsByClassName("pr-0")[0];
const mainObserver = new MutationObserver(mutationLogger);
const config = { attributes: true, childList: true, subtree: true };

window.onload = function () {
  mainObserver.observe(mainDiv, config);
  createSwith();
};

function createSwith() {
  let wrapperDiv = document.createElement("div");
  wrapperDiv.className = "custom-toggle-container";

  let toggleSwitch = document.createElement("button"); // Change to input[type="checkbox"] for a switch
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
      mainObserver.observe(mainDiv, config);
    }
  });
}

//callback function that takes an Arary mutations
function mutationLogger(mutationList) {
  const attrMap = new Map();

  mutationList.forEach((m) => {
    // console.log(`mutation type: \n ${m.type} \n`);

    if (m.type === "childList") {
      // skip non addded nodes
      if (!m.addedNodes || m.addedNodes.length === 0) {
        return;
      }
      console.log(`
        mutation mutation type: \n ${m.type} \n
        mutation target node: \n ${m.target.className} \n
        mutation attribute Name: \n ${m.attributeName} \n
        mutation addedNodes: \n ${m.addedNodes}, ${m.addedNodes.length} \n
        `);
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

      console.log(`
        mutation mutation type: \n ${m.type} \n
        mutation target node: \n ${m.target.className} \n
        mutation attribute Name: \n ${m.attributeName} \n
        mutation attribute value: \n ${m.target.style.cssText} \n
        `);
      m.addedNodes.forEach((addedNode) => {
        if (addedNode instanceof HTMLDivElement) {
          console.log(`div added: \n ${addedNode.className}`);
        }
      });
    }
  });
}
