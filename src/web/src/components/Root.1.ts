import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

@customElement("products-root")
export class Root extends LitElement {
    public static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .ProductsH1 {
            color: black;
        }
        .ProductsContainer {
            background-color: grey;
            width: 90vw;
            height: 90vw;
        }
    `;

    @property() private game = "";
    @property() private productsList = "";

    protected render(): unknown {
        return html`
            <div class="container">
                <div class="header">
                    <h1 class="ProductsH1">Products</h1>
                </div>
                <div class="ProductsContainer">${map(this.productsList)}</div>
            </div>
        `;
    }
}
