import { html, css, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("productpage-element")
export class ProductPage extends LitElement {
    public static styles = css`
    h1 { font-size: 20px
    }
    `;

    protected render():TemplateResult {
        return html`
            <div class="navBar" id="navBar">
                <nav-bar></nav-bar>
            </div>
            <h1>Welcome to the Product Page</h1>
        `;
    }
}