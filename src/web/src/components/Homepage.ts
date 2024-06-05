import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";

@customElement("home-page")
export class Homepage extends LitElement {
    // static
    public static styles = css`
        .productname {
            cursor: pointer;
        }
        .container {
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: 10vh;
        }
        .ProductsH1 {
            color: #373e98;
        }
        .ProductsContainer {
            padding-top: 1vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 90vw;
            height: 80vh;
            border-radius: 10px;
            margin-bottom: 4vw;
        }
        .products {
            justify-content: space-evenly;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 1vw;
            margin-right: 1vw;
            margin-bottom: 1vh;
            background-color: #ffffff;
            width: 20vw;
            height: 25vh;
            border-radius: 10px;
            padding: 15px, 15px, 15px, 15px;
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 20%;
            width: 90%;
            padding: 10px;
            overflow-x: scroll;
            overflow-y: scroll;
        }
        .price {
            display: flex;
            flex-direction: row-reverse;
            width: 100%;
            padding-right: 10%;
            color: green;
        }
        .image {
            border-radius: 10px;
            height: 40%;
            width: 50%;
        }
    `;

    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _orderItems!: OrderItem[];

    private _sortOrder: string = "DESC";

    public connectedCallback(): void {
        super.connectedCallback();
        this.getOrderItems();
        console.log(new URL(window.location.toString()));
    }

    private async fetchOrderItems(): Promise<OrderItem[]> {
        const result: OrderItem[] | undefined = await this._orderItemService.getAllWithParameters("id", this._sortOrder);

        if (!result) {
            return [];
        }

        return result;
    }

    private getOrderItems(): void {
        void this.fetchOrderItems().then((res: OrderItem[]) => {
            this._orderItems = res;
        });
    }

    private handleClick(e: Event): void {
        const target: HTMLElement = e.target as HTMLElement;
        console.log(target.id);
        window.location.href = `/productpage?id=${target.id}`;
    }

    // polymorphism
    protected render(): unknown {
        return html`
            <div class="container">
                <div class="header">
                </div>
                <div class="ProductsContainer">
                    ${map(this._orderItems, (product) => {
                        return html`
                            <div class="products">
                                <div class="productname" @click="${this.handleClick}" id=${product.id}>
                                    ${product.title}
                                </div>
                                <div
                                    class="image"
                                    style="background: url(${product.thumbnail}); background-position: center; background-size: 100%; background-repeat: no-repeat;"
                                ></div>
                                <div class="description">${product.description}</div>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}

