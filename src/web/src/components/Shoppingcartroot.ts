import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ShoppingcartService } from "../services/ShoppingcartService";
import { OrderItem } from "@shared/types";
import { map } from "lit/directives/map.js";

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
        .container {
            margin-top: 5vw;
            margin-left: 5vw;
            width: 35vw;
            height: 20vw;
            background-color: #aaaa;
            display: block;
            border-radius: 2spx;
        }
        .leftcontainer {
            background-color: #241f1f42;
            width: 45vw;
            height: 100vh;
            position: absolute;
            margin-left: 3vw;
            margin-top: -6vh;
            overflow-y: scroll;
            border-radius: 5px;
        }
    `;

    @state()
    private _shoppingcartService: ShoppingcartService = new ShoppingcartService();

    private checkcart: OrderItem[] | undefined;
    private itemId: number[] | undefined;
    private getproductname: OrderItem[] | undefined;
    public async connectedCallback(): Promise<void> {
        // hier vraag ik de token van de ingelogde gebruiker
        // als die token er is dan pas gaat deze code werkens
        // hier word jhe token ontcijferd waaraan ik hem in een array stop en alleen de tweede sectie van de array gebruik

        // in de array saal ik dan de userId eruit en maak ik ddaar een constructor van om te gebruiken in me api request.

        // Request naar de database om de functie checkcart uit shoppingcartservice uit te voeren met als ID the constructor userId
        this.checkcart = await this._shoppingcartService.checkcart();

        console.log("cartconsole", this.checkcart);
        if (this.checkcart) {
            this.itemId = this.checkcart.map((item: { itemId: any }) => item.itemId);
            console.log("cartconsole", this.itemId);
        }
        super.connectedCallback();
        const id: any = this.itemId;
        this.getproductname = await this._shoppingcartService.getproductname(id);
        console.log("productname", this.getproductname);
    }
    // hier gaan we bepalen of er wat in je shoppingcart zit
    protected render(): TemplateResult {
        let message: any;

        // als er niks in je shoppingcart zit
        // v
        if (this.checkcart?.length === 0) {
            message = html`<div class="noproductstext">
                <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />

                <h1>Winkelwagen</h1>
                <p>
                    Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te
                    winkelen.
                </p>
                <button class="winkelen" @click="${this.handleClick}">verder winkelen</button>
            </div> `;

            // als er wel wat in je shoppingcart zit
            // v
        }
        if (this.checkcart) {
            message = html` <div class="leftcontainer"></div>
                ${map(this.itemId, () => {
                    return html` <div class="container"></div>`;
                })}`;
        } else {
            message = html`<p>je moet ingelogd zijn</p>`;
            window.location.replace("homepage.html");
        }
        return html` <p class="message">${message}</p> `;
    }
    private handleClick(_e: Event): void {
        window.location.replace("homepage.html");
    }
}
