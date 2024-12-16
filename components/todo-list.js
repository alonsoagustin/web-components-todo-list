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

    const div = this.shadowRoot.querySelector("div");
    const actionInput = this.shadowRoot.querySelector("action-input");

    actionInput.addEventListener("submit-action-input", (event) => {
      const actionItem = document.createElement("action-item");
      div.appendChild(actionItem);
      actionItem.setAttribute("span-content", event.detail);
    });
  }
}

window.customElements.define("todo-list", TodoList);
