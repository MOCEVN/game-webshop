import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("products-root")
export class Root extends LitElement {

    public static styles = css`
    .container {
        display: flex;
        flex-direction: column;
    }
    .productenH1 {
        color: red;
    }
    `;

    @property()
    private game = "";

    
    protected render(): unknown {
        return html`
        <div class = "container">
            <div class = "header">
        <h1 class= "productenH1">Producten</h1>
            </div>
    </div>
        `;
    }
}