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

    input.addEventListener("change", () => {
      const status = input.checked;
      span.classList.toggle("checked");
      const customEvent = new CustomEvent("status-input-checkbox", {
        detail: status,
        id: this.id,
      });
      this.dispatchEvent(customEvent);
    });

    button.addEventListener("click", () => {
      const customEvent = new CustomEvent("status-action-item", {
        detail: "removed",
        id: this.id,
      });
      this.dispatchEvent(customEvent);
      this.remove();
    });
  }
}

window.customElements.define("action-item", ActionItem);
