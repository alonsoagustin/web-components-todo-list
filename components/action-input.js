const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
</style>

<div>
    <input type="text">
    <button></button>
</div>
`;

class ActionInput extends HTMLElement {
  constructor() {
    /* 
  constructor() {}
  connectedCallback() {}
  disconnectedCallback() {}
  static get observedAttributes() {}
  attributeChangedCallback(attrName, oldValue, newValue) {}
  */
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

    button.addEventListener("click", () => {
      const customEvent = new CustomEvent("submit-action-input", {
        detail: input.value,
      });
      this.dispatchEvent(customEvent);
      input.value = "";
    });
  }
}

window.customElements.define("action-input", ActionInput);
