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
            font-weight: bold;
            margin-bottom: 8px;
        }
        .container {
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        .header {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            height: 10vh;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
        .ProductsH1 {
            color: #373e98;
        }
        .ProductsContainer {
            padding-top: 1vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            width: 100%;
            height: 80vh;
            border-radius: 10px;
            overflow-y: auto;
        }
        .products {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #ffffff;
            width: 20vw;
            height: 35vh;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .products:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .description {
            text-align: center;
            margin-top: 10px;
            font-size: 0.9em;
            color: #555;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 90%;
        }
        .price {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 10px;
            font-size: 1.1em;
            color: green;
        }
        .image {
            width: 100%;
            height: 50%;
            border-radius: 10px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }  `;

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

