import "./action-input.js";
import "./action-item.js";

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style></style>

<div>
    <action-input></action-input>
    <button></button>
</div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    this.btnContent = this.getAttribute("btn-content") ?? "Clear Completed";
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const actionInput = this.shadowRoot.querySelector("action-input");
    const button = this.shadowRoot.querySelector("button");

    button.textContent = this.btnContent;

    let currentInputs = JSON.parse(localStorage.getItem("inputs")) ?? [];

    actionInput.addEventListener("submit-action-input", (event) => {
      const id = event.detail.id;
      const value = event.detail.value;
      const isCompleted = event.detail.isCompleted;
      const isDeleted = event.detail.isDeleted;

      this.createActionItem(event.detail);
      currentInputs = JSON.parse(localStorage.getItem("inputs")) ?? [];
      localStorage.setItem(
        "inputs",
        JSON.stringify([
          ...currentInputs,
          {
            id,
            value,
            isCompleted,
            isDeleted,
          },
        ])
      );
    });

    button.addEventListener("click", () => {
      currentInputs = JSON.parse(localStorage.getItem("inputs")) ?? [];
      currentInputs = currentInputs.map((input) => {
        console.log(
          "isDeleted",
          input.isDeleted,
          "isCompleted",
          input.isCompleted
        );
        if (input.isCompleted && !input.isDeleted) {
          this.shadowRoot.getElementById(input.id).remove();
          return { ...input, isDeleted: true };
        }
        return input;
      });
      localStorage.setItem("inputs", JSON.stringify(currentInputs));
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

    function updateInput(property, newValue) {
      const id = actionItem.getAttribute("id");
      let currentInputs = JSON.parse(localStorage.getItem("inputs")) ?? [];
      currentInputs = currentInputs.map((input) => {
        if (input.id === +id) {
          return { ...input, [property]: newValue };
        }
        return input;
      });
      localStorage.setItem("inputs", JSON.stringify(currentInputs));
    }

    actionItem.addEventListener("status-input-checkbox", (event) => {
      const { status } = event.detail;
      updateInput("isCompleted", status);
    });

    actionItem.addEventListener("status-action-item", (event) => {
      const { removed } = event.detail;
      updateInput("isDeleted", removed);
    });

    return actionItem;
  }
}

window.customElements.define("todo-list", TodoList);
