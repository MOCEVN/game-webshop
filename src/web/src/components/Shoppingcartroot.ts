import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";

const checkcart: any = "select * from shoppingcartitem where userId = ?";
let message: any;

if (checkcart === null) {
    message = html`<div class="noproductstext">
        <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />

        <h1>Winkelwagen</h1>
        <p>Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te winkelen.</p>
        <button class="winkelen">verder winkelen</button>
    </div> `;
} else if (checkcart.length) {
    message = html`<p>je hebt items in je shoppingcart</p>`;
} else {
    message = html`<p>Welcome to your shoppingbag</p>`;
    // hier moet een redirect komen naar de
}

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
            margin-top: 2vh;
            width: 35vw;
            height: 5vh;
        }
    `;

    protected render(): TemplateResult {
        return html` <p class="message">${message}</p> `;
    }
}
