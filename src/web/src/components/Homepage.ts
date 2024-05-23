import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("home-page")
export class Homepage extends LitElement {
    protected render(): TemplateResult {
        return html` <div class="navBar" id="navBar"></div> `;
    }
}
