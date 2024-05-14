import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("header")
export class Header extends LitElement {


protected render(): TemplateResult {
  return html`
      <div class="navBar" id="navBar"></div>
  `;
}


}



