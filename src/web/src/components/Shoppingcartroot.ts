import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("shoppingcart-root")
export class shoppingcart extends LitElement {
    public static styles = css`
        .noproductstext {
            text-align: center;
            margin-top: 8vh;
        }
        .shoppingbag {
            width: 8vw;
        }
        .winkelen {
            width: 35vw;
            height: 5vh;
        }
    `;

    protected render(): TemplateResult {
        return html`
            <div class="noproductstext">
                <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />

                <h1>Winkelwagen</h1>
                <p>
                    Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te
                    winkelen.
                </p>
                <button class="winkelen">verder winkelen</button>
            </div>
        `;
    }
}
