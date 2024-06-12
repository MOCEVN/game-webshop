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
            border-radius: 10px;
            position: relative;
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
        .waardes {
            font-size: 3vw;
            position: relative;
        }
        .rightcontainer {
            background-color: #a2a2a242;
            width: 37vw;
            position: absolute;
            margin-left: 50vw;
            border-radius: 5px;
        }
        .samenvatting {
            font-size: 2vw;
            text-align: left;
            margin-left: 10px;
        }
        .undertekst {
            font-size: 0.8vw;
            max-width: 28vw;
            margin-left: 10px;
        }
        .subtotaal {
            text-align: left;
            margin-left: 1vw;
            font-size: 2vw;
        }
        .totaalprijs {
            text-align: right;
            margin-right: 1px;
            font-size: 2vw;
            position: relative;
        }
        .checkout {
            width: 15vw;
            height: 7vh;
            border-radius: 5px;
            margin-left: 11vw;
            margin-bottom: 1vh;
            font-size: 2vw;
        }
        .shoppingcart {
            text-align: left;
            font-weight: 100px;
            font-size: 25px;
            margin-top: 5px;
            margin-left: 2vw;
        }
        .btw {
            text-align: left;
            font-size: 1vw;
            margin-left: 1vw;
        }
        .uppersection {
            padding: 0px;
        }
        .title {
            margin-left: 100px;
            top: 1vh;
        }
        .price {
            text-align: center;
            bottom: 100px;
        }
        .test {
            width: 100px;
            margin-top: -10vh;
        }
        .ptitle {
            bottom: 1vh;
            margin-left: 9.1vw;
            font-size: 20px;
            margin-top: 10px;
        }
        .pprice {
            font-size: 20px;
        }
    `;

    @state()
    private _shoppingcartService: ShoppingcartService = new ShoppingcartService();

    private checkcart: OrderItem[] | undefined;
    private itemId: number[] | undefined;
    private getproductinfo: OrderItem[] | undefined;
    private totalprice: number | undefined;
    private clearcart: OrderItem[] | undefined;
    private insertintocart: OrderItem[] | undefined;

    public async connectedCallback(): Promise<void> {
        this.insertintocart = await this._shoppingcartService.insertintocart(2);
        this.checkcart = await this._shoppingcartService.checkcart();
        console.log("dit moet niet te zien zijn", this.checkcart);
        if (this.checkcart) {
            this.itemId = this.checkcart.map((item: { itemId: any }) => item.itemId);
        }
        const id: any = this.itemId;
        const allProducts: OrderItem[] | undefined = await this._shoppingcartService.getproductinfo(id);
        this.getproductinfo = allProducts?.filter((item) => id.includes(item.id));

        // hier ga je de producten info opvragen
        if (this.getproductinfo) {
            this.totalprice = this.getproductinfo.reduce((sum: number, val) => {
                return sum + parseFloat(val.price as unknown as string);
            }, 0);
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
                <button class="winkelen" @click=${this.handleClick}>verder winkelen</button>
            </div>`;
        } else if (this.checkcart?.length !== 0) {
            message = html`
                <div class="rightcontainer">
                    <div class="uppersection">
                        <h3 class="samenvatting">Samenvatting</h3>
                        <p class="undertekst">
                            Kortingscodes kunnen worden toegepast tijdens het afrekenen, maar zijn niet geldig
                            voor producten van onze Marketplace.
                        </p>
                    </div>
                    <div class="totaalprijs">
                        <h2 class="subtotaal">Totaal € ${this.totalprice}</h2>
                        <p class="btw">incl btw</p>
                    </div>
                    <button class="checkout" @click="${this.checkout}">checkout</button>
                </div>
                <div class="leftcontainer">
                    <h3 class="shoppingcart">Shoppingcart</h3>
                </div>
                ${map(this.getproductinfo, (product) => {
                    return html` <div class="container">
                        <div class="title"><p class="ptitle">${product.title}</p></div>
                        <div class="price"><p class="pprice">${product.price}</p></div>
                        <div class="thumbnail">
                            <img class="test" src=${product.thumbnail} />
                        </div>
                    </div>`;
                })}
            `;
        } else {
            message = html`<p>je moet ingelogd zijn</p>`;
            window.location.replace("/");
        }
        return html`<p class="message">${message}</p>`;
    }

    private handleClick(_e: Event): void {
        window.location.replace("/");
    }
    private async checkout(_e: Event): Promise<void> {
        this.clearcart = await this._shoppingcartService.clearcart();
        alert("je hebt een item gekocht");
        window.location.replace("/");
        super.connectedCallback();
    }
}
