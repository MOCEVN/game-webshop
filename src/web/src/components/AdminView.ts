import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";
import {until} from "lit/directives/until.js";
import { map } from "lit/directives/map.js";

@customElement("admin-view")
export class AdminView extends LitElement {
    public static styles = css`
        .container {
            padding: 1em;
        }
        button {
            display: block;
            margin-top: 1em;
        }
        .products {
            display: grid;
            grid-template-columns: 1fr 2fr 2fr 6fr;
        }
        .center {
            justify-self: center;
        }
        h1 {
            font-size: 1.5em;
        }
    `;

    private _orderItemService: OrderItemService = new OrderItemService();

    private _products!: OrderItem[];

    private _orderBy: string = "id";
    private _sortOrder: string = "ASC";

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this._getProducts();
    }

    private async _getProducts(): Promise<void> {
        const products: OrderItem[] | undefined = await this._orderItemService.getAllSortedFiltered(this._orderBy,this._sortOrder);
        if (products) {
            this._products = products;
            return;
        }
    }

    private async _renderProducts(): Promise<TemplateResult> {
        
        await this._getProducts();
        if (this._products) {
            return html`
                ${map(this._products, (val) => html`
                    <p>${val.id}</p>
                    <p>${val.name}</p>
                    <p class="center">${val.price}</p>
                    <p>${val.description}</p>
                `)}
            `;
        }
        return html`<p>couldn't get products</p>`;
    }

    private _refresh(): void {
        this.requestUpdate();
    }

    private _handleOrderBy(e: Event): void {
        this._orderBy = (e.target as HTMLInputElement).value;
    }

    private _handleSortOrder(e:Event): void {
        this._sortOrder = (e.target as HTMLInputElement).value;
    }
    
    protected render(): TemplateResult {
        return html`
            <div class="container">
                <label for="sort">Order By:</label>
                <select name="sort" id="sort" @change=${this._handleOrderBy}>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="description">Description</option>
                </select>
                <select name="order" id="order" @change=${this._handleSortOrder}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
                <button @click=${this._refresh}>refresh</button>
                <div class="products">
                    <h1>ID</h1>
                    <h1>Name</h1>
                    <h1 class="center">Price</h1>
                    <h1>Description</h1>
                    ${until(this._renderProducts(),html`<p>Fetching products...</p>`)}
                </div>
            </div>
        `;
    }
}