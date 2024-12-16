const templateElement = document.createElement("template");

templateElement.innerHTML = `

<style>

.checked{
text-decoration: line-through;
}
</style>

<div>
    <input type="checkbox">
    <span></span>
    <button></button>
</div>`;

class ActionItem extends HTMLElement {
  constructor() {
    super();
    this.spanContent = this.getAttribute("span-content") ?? "1.Todo-item";
    this.btnContent = this.getAttribute("btn-content") ?? "Delete";
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const input = this.shadowRoot.querySelector("input");
    const span = this.shadowRoot.querySelector("span");
    const button = this.shadowRoot.querySelector("button");

    span.textContent = this.spanContent;
    button.textContent = this.btnContent;

    this.setAttribute("id", Date.now());
  }
}

window.customElements.define("action-item", ActionItem);
