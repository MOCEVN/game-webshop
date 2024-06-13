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
            margin-top: 0px;
            margin-left: 5vw;
            width: 35vw;
            height: 15vw;
            background-color: #aaaa;
            display: block;
            border-radius: 10px;
            position: relative;
        }
        .leftcontainer {
            background-color: #241f1f42;
            width: 45vw;
            position: absolute;
            margin-left: 3vw;
            margin-top: 0vh;
            overflow-y: auto;
            border-radius: 5px;
            padding-bottom: 5vh;
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
            margin-left: 1vw;
        }
        .undertekst {
            font-size: 0.8vw;
            max-width: 28vw;
            margin-left: 1vw;
            text-align: left;
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
            margin-top: -14vh;
            position: relative;
        }
        .checkout {
            width: 15vw;
            height: 7vh;
            border-radius: 5px;
            margin-left: 11vw;
            margin-bottom: 1vh;
            font-size: 2vw;
            cursor: pointer;
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
            margin-left: 1.2vw;
            margin-top: -2.5vh;
        }
        .uppersection {
            padding: 0px;
        }
        .title {
            margin-left: 100px;
            margin-top: 20px;
            top: 1vh;
        }
        .price {
            text-align: center;
            margin-left: 4vw;
            bottom: 100px;
        }
        .productpic {
            width: 13vw;
            margin-top: -10vh;
        }
        .ptitle {
            bottom: 10vh;
            margin-left: 9.1vw;
            font-size: 20px;
            margin-top: 10px;
        }
        .pprice {
            font-size: 20px;
        }
        .removeitem {
            width: 2vw;
            float: right;
            margin-top: 12vw;
            margin-right: 2vw;
            cursor: pointer;
        }
        .line {
            width: 40vw;
            right: 1.5vw;
            position: relative;
            height: 30vh;
            margin-top: -10vh;
        }
    `;

    @state()
    private _shoppingcartService: ShoppingcartService = new ShoppingcartService();

    private checkcart: OrderItem[] | undefined;
    private itemId: number[] | undefined;
    private getproductinfo: OrderItem[] | undefined;
    private totalprice: number | undefined;
    private deleteitem: OrderItem[] | undefined;
    private relevantid: any | undefined;

    public async connectedCallback(): Promise<void> {
        this.checkcart = await this._shoppingcartService.checkcart();
        if (this.checkcart) {
            this.itemId = this.checkcart.map((item: { itemId: any }) => item.itemId);
            console.log(this.itemId);
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
                    <img src="../public/assets/img/line-png.png" class="line" />
                    <div class="totaalprijs">
                        <h2 class="subtotaal">Totaal € ${this.totalprice}</h2>
                        <p class="btw">incl btw</p>
                    </div>
                    <button class="checkout" @click="${this.checkout}">checkout</button>
                </div>
                <div class="leftcontainer">
                    <h3 class="shoppingcart">Shoppingcart</h3>
                    ${map(this.getproductinfo, (product) => {
                        this.relevantid = product.id;

                        return html`
                            <div class="container">
                                <img
                                    class="removeitem"
                                    @click=${this.removeitem}
                                    src="../public/assets/img/trash-bin.png"
                                />
                                <div class="title"><p class="ptitle">${product.title}</p></div>
                                <div class="price"><p class="pprice">€ ${product.price}</p></div>
                                <div class="thumbnail">
                                    <img class="productpic" src=${product.thumbnail} />
                                </div>
                            </div>
                        `;
                    })}
                </div>
            `;
        } else if (!this.checkcart) {
            alert("je moet ingelogd zijn om hier te zijn");
            window.location.replace("/");
        }
        return html`<p class="message">${message}</p>`;
    }

    private handleClick(_e: Event): void {
        window.location.replace("/");
    }
    private async checkout(_e: Event): Promise<void> {
        await this._shoppingcartService.clearcart();
        alert("je hebt een item gekocht");
        window.location.replace("/");
        super.connectedCallback();
    }
    private async removeitem(_e: Event): Promise<void> {
        this.deleteitem = await this._shoppingcartService.deleteitem(this.relevantid);
        alert("removed");
        window.location.reload();
        super.connectedCallback();
    }
}
