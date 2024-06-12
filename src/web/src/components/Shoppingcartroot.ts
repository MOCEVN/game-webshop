import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ShoppingcartService } from "../services/ShoppingcartService";
import { OrderItem } from "@shared/types";
import { map } from "lit/directives/map.js";

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
            margin-top: 100px;
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
        .thumbnail {
            width: 3vw;
        }
        .test {
            width: 10vw;
        }
    `;

    @state()
    private _shoppingcartService: ShoppingcartService = new ShoppingcartService();

    private checkcart: OrderItem[] | undefined;
    private itemId: number[] | undefined;
    private getproductinfo: OrderItem[] | undefined;
    private titleAndPrice: any[] | undefined;

    public async connectedCallback(): Promise<void> {
        this.checkcart = await this._shoppingcartService.checkcart();
        if (this.checkcart) {
            this.itemId = this.checkcart.map((item: { itemId: any }) => item.itemId);
        }
        const id: any = this.itemId;
        this.getproductinfo = await this._shoppingcartService.getproductinfo(id);
        console.log(this.getproductinfo);

        // hier ga je de producten info opvragen
        if (this.getproductinfo) {
            const getproductinfo: OrderItem[] = this.getproductinfo.filter((item) => id.includes(item.id));

            // hier maak ik een map van elke onderdeel die past bij de item id die in de shoppingcart
            this.titleAndPrice = getproductinfo.map(
                (matchItem: { title: string; price: number; id: number; thumbnail: string }) => ({
                    title: matchItem.title,
                    price: matchItem.price,
                    thumbnail: matchItem.thumbnail,
                    id: matchItem.id,
                })
            );
            console.log("self made array van alleen de producten met een passende id", this.titleAndPrice);
        }
        super.connectedCallback();
    }

    protected render(): TemplateResult {
        let message: any;

        if (this.checkcart?.length === 0) {
            message = html`<div class="noproductstext">
                <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />
                <h1>Winkelwagen</h1>
                <p>
                    Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te
                    winkelen.
                </p>
                <button class="winkelen" @click="${this.handleClick}">verder winkelen</button>
            </div>`;
        }
        if (this.checkcart) {
            message = html` <div class="leftcontainer"></div>
                ${map(this.titleAndPrice, (product) => {
                    return html` <div class="container">
                        <div class="title">${product.title}</div>
                        <div class="price">${product.price}</div>
                        <div class="thumbnail">
                            <img class="test" src=${product.thumbnail} />
                        </div>
                    </div>`;
                })}`;
        } else {
            message = html`<p>je moet ingelogd zijn</p>`;
            window.location.replace("homepage.html");
        }
        return html`<p class="message">${message}</p>`;
    }

    private handleClick(_e: Event): void {
        window.location.replace("homepage.html");
    }
}
