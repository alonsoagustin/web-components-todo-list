const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
</style>

<div>
    <input type="text">
    <button disabled></button>
</div>
`;

class ActionInput extends HTMLElement {
  constructor() {
    super();
    this.placeholder =
      this.getAttribute("placeholder") ?? "What do you need to do?";
    this.btnContent = this.getAttribute("btn-content") ?? "Save";
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const input = this.shadowRoot.querySelector("input");
    const button = this.shadowRoot.querySelector("button");

    input.setAttribute("placeholder", this.placeholder);
    button.textContent = this.btnContent;

    input.addEventListener("input", () => {
      if (input.value !== "") {
        button.removeAttribute("disabled");
      } else {
        button.setAttribute("disabled", "");
      }
    });

    button.addEventListener("click", () => {
      const customEvent = new CustomEvent("submit-action-input", {
        detail: {
          id: Date.now(),
          value: input.value,
          isCompleted: false,
          isDeleted: false,
        },
      });
      this.dispatchEvent(customEvent);
      input.value = "";
      button.setAttribute("disabled", "");
    });
  }
}

window.customElements.define("action-input", ActionInput);
