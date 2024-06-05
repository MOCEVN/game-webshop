import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ShoppingcartService } from "../services/ShoppingcartService";

@customElement("shoppingcart-root")
export class ShoppingCart extends LitElement {
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

    @state()
    private _ShoppingcartService: ShoppingcartService = new ShoppingcartService();
    private checkcart: OrderItem | undefined = await this._ShoppingcartService.checkcart("45");
    protected render(): TemplateResult {
        return html` <p class="message">${message}</p> `;
    }
}
let message: any;
console.log(checkcart);
if (checkcart === null) {
    message = html`<div class="noproductstext">
        <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />

        <h1>Winkelwagen</h1>
        <p>Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te winkelen.</p>
        <button class="winkelen">verder winkelen</button>
    </div> `;
} else if (checkcart) {
    message = html`<p>je hebt items in je shoppingcart</p>`;
} else {
    message = html`<p>Welcome to your shoppingbag</p>`;
    // hier moet een redirect komen naar de
}
