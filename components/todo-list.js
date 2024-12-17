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
        JSON.stringify([
          ...currentInputs,
          {
            id: event.detail.id,
            value: event.detail.value,
            isCompleted: event.detail.isCompleted,
            isDeleted: event.detail.isDeleted,
          },
        ])
      );
    });

    for (const currentInput of currentInputs) {
      const actionItem = this.createActionItem(currentInput);
      const span = actionItem.shadowRoot.querySelector("span");
      const input = actionItem.shadowRoot.querySelector("input");

      if (currentInput.isCompleted) {
        span.classList.add("checked");
        input.setAttribute("checked", "");
      } else {
        span.classList.remove("checked");
      }

      if (currentInput.isDeleted) {
        actionItem.remove();
      }
    }
  }

  createActionItem(detail) {
    const div = this.shadowRoot.querySelector("div");
    const actionItem = document.createElement("action-item");

    div.appendChild(actionItem);
    actionItem.setAttribute("span-content", detail.value);
    actionItem.setAttribute("id", detail.id);

    let currentInputs = JSON.parse(localStorage.getItem("inputs"));

    actionItem.addEventListener("status-input-checkbox", (event) => {
      currentInputs.map((input) => {
        if (input.id === +event.detail.id) {
          input.isCompleted = event.detail.status;
          localStorage.setItem("inputs", JSON.stringify(currentInputs));
        }
      });
    });

    actionItem.addEventListener("status-action-item", (event) => {
      currentInputs.map((input) => {
        if (input.id === +event.detail.id) {
          input.isDeleted = event.detail.removed;
          localStorage.setItem("inputs", JSON.stringify(currentInputs));
        }
      });
    });

    return actionItem;
  }
}

window.customElements.define("todo-list", TodoList);
