import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ShoppingcartService } from "../services/ShoppingcartService";
import { OrderItem } from "@shared/types";

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

    private checkcart: OrderItem[] | undefined;

    public async connectedCallback(): Promise<void> {
        // hier vraag ik de token van de ingelogde gebruiker
        // als die token er is dan pas gaat deze code werkens
        // hier word jhe token ontcijferd waaraan ik hem in een array stop en alleen de tweede sectie van de array gebruik

        // in de array saal ik dan de userId eruit en maak ik ddaar een constructor van om te gebruiken in me api request.

        // Request naar de database om de functie checkcart uit shoppingcartservice uit te voeren met als ID the constructor userId
        this.checkcart = await this._shoppingcartService.checkcart();
        console.log("cartconsole", this.checkcart);
        if (this.checkcart) {
            const itemId: number[] = this.checkcart.map((item: { itemId: any }) => item.itemId);
            console.log("dit is de itemid van de items in je shoppingcart", itemId);
        }
        super.connectedCallback();
    }
    // hier maak ik dan een html page die zich aanpast aan de state van de checkcart
    protected render(): TemplateResult {
        let message: any;
        if (this.checkcart === null) {
            message = html`<div class="noproductstext">
                <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />

                <h1>Winkelwagen</h1>
                <p>
                    Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te
                    winkelen.
                </p>
                <button class="winkelen">verder winkelen</button>
            </div> `;
        } else if (this.checkcart) {
            message = html`<p>${this.checkcart}</p>`;
        } else {
            // message = html`<p>je moet ingelogd zijn</p>`;
            // window.location.replace("homepage.html");
            // hier moet een redirect komen naar de product page met een pop up je kan niks in je shoppingcart doen.
            // welicht de navbar aanpassen zodat je alleen op shoppingcart kan drukken als je bent ingelogd. gebruikk hiervoor een gettoken request om met een if else statement de navbar dynamisch te weergeven.
        }
        return html` <p class="message">${message}</p> `;
    }
}
