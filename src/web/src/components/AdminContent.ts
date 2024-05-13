import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("admin-content")
export class AdminContent extends LitElement{
    public static styles = css`
    
    `;
    protected render(): TemplateResult {
        return html`
            success
        `;
    }
}