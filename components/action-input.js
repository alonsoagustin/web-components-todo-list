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

    this.shadowRoot
      .querySelector("input")
      .setAttribute("placeholder", this.placeholder);

    this.shadowRoot.querySelector("button").textContent = this.btnContent;
  }
}

window.customElements.define("action-input", ActionInput);
