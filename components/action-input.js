const templateElement = document.createElement("template");

templateElement.innerHtml = `
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
  }
}
