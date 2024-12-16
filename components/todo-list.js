import "./action-input.js";
import "./action-item.js";

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style></style>

<div>
    <action-input></action-input>
</div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const actionInput = this.shadowRoot.querySelector("action-input");

    let currentInputs = JSON.parse(localStorage.getItem("inputs")) ?? [];

    actionInput.addEventListener("submit-action-input", (event) => {
      this.createActionItem(event.detail);
      currentInputs = JSON.parse(localStorage.getItem("inputs")) ?? [];
      localStorage.setItem(
        "inputs",
        JSON.stringify([...currentInputs, { detail: event.detail }])
      );
    });

    for (const input of currentInputs) {
      this.createActionItem(input.detail);
    }
  }

  createActionItem(spanContent) {
    const div = this.shadowRoot.querySelector("div");
    const actionItem = document.createElement("action-item");
    div.appendChild(actionItem);
    actionItem.setAttribute("span-content", spanContent);
  }
}

window.customElements.define("todo-list", TodoList);
