import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ShoppingcartService } from "../services/ShoppingcartService";
import {OrderItem} from "@shared/types";
import {TokenService} from "../services/TokenService";

// TODO Omar: Voeg commentaar toe om token-truc uit te leggen
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
    private _shoppingcartService: ShoppingcartService = new ShoppingcartService();

    private _tokenService: TokenService = new TokenService();

    private checkcart: OrderItem | undefined;

    public async connectedCallback(): Promise<void> {
        const token: string | undefined = this._tokenService.getToken();
        if (token) {
            const payload: any = JSON.parse(atob(token.split(".")[1]));
            const userId: number = payload.userId;
            this.checkcart = await this._shoppingcartService.checkcart(userId);
        }
        super.connectedCallback();
    }

    protected render(): TemplateResult {
        const message: string = this.checkcart ? "Hallo Nico" : "Het is niet gelukt";
        return html` <p class="message">${message}</p> `;
    }
}
// let message: any;
// console.log(checkcart);
// if (checkcart === null) {
//     message = html`<div class="noproductstext">
//         <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />
//
//         <h1>Winkelwagen</h1>
//         <p>Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te winkelen.</p>
//         <button class="winkelen">verder winkelen</button>
//     </div> `;
// } else if (checkcart) {
//     message = html`<p>je hebt items in je shoppingcart</p>`;
// } else {
//     message = html`<p>Welcome to your shoppingbag</p>`;
//     // hier moet een redirect komen naar de
// }
