import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("profile-page")
export class Profile extends LitElement {
    protected render(): TemplateResult {
        return html` <div class="navBar" id="navBar"></div> `;
    }
}
