import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
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
            align-items: center;
            grid-template-columns: 1fr 2fr 2fr 6fr;
        }
        .center {
            justify-self: center;
        }
        h1 {
            font-size: 1.5em;
        }
        img {
            max-height: 30em;
        }
    `;

    private _orderItemService: OrderItemService = new OrderItemService();

    private _products!: OrderItem[];

    private _search: string = "";
    private _searchType: string = "name";
    private _orderBy: string = "id";
    private _sortOrder: string = "ASC";

    @state()
    private _viewProduct: boolean = false;
    private _product?: OrderItem;

    private async _getProducts(): Promise<void> {
        const products: OrderItem[] | undefined = await this._orderItemService.getAllWithParameters(this._orderBy,this._sortOrder,this._search,this._searchType);
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
                    <a @click=${(e: Event): void => {void this._handleClickProduct(e,val.id.toString());}} href="">${val.id}</a>
                    <p>${val.title}</p>
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

    private _handleSearch(e: Event): void {
        this._search = (e.target as HTMLInputElement).value;
    }

    private _handleSearchType(e: Event): void {
        this._searchType = (e.target as HTMLInputElement).value;
    }

    private _handleOrderBy(e: Event): void {
        this._orderBy = (e.target as HTMLInputElement).value;
    }

    private _handleSortOrder(e:Event): void {
        this._sortOrder = (e.target as HTMLInputElement).value;
    }
    
    private async _handleClickProduct(e: Event,id: string): Promise<void> {
        e.preventDefault();
        this._product = await this._orderItemService.getProduct(id);
        if (this._product) {
            this._viewProduct = true;
        }
    }

    private _handleEdit(e:Event,id: string): void{
        const buttonElement: HTMLInputElement = e.target as HTMLInputElement;
        buttonElement.dispatchEvent(new CustomEvent("edit", {bubbles: true, composed: true, detail: {id: id}}));
    }

    private renderProduct(): TemplateResult {
        return html`
            <div class="container">
                <button @click=${(): void => {this._viewProduct = false;}}>Back</button>
                <button @click=${(e: Event): void => {this._handleEdit(e,this._product!.id.toString());}}>Edit</button>
                <h1>${this._product?.title}</h1>
                <img src=${this._product!.thumbnail}>
                <p>${this._product?.description}</p>
                <p>${this._product?.price}</p>
                <p>${this._product?.catagory?.name}</p>
                <p>${this._product?.catagory?.description}</p>
                ${map(this._product?.imageURLs, (val) => html`
                    <img src=${val}>
                `)}
            </div>
        `;
    }

    protected render(): TemplateResult {
        if (this._viewProduct) {
            return this.renderProduct();
        }
        return html`
            <div class="container">
                <label for="search">Search</label>
                <input type="text" name="search" id="search" @change=${this._handleSearch}>
                <label for="searchType">Search column</label>
                <select name="searchType" id="searchType" @change=${this._handleSearchType}>
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                </select>
                <label for="sort">Order By:</label>
                <select name="sort" id="sort" @change=${this._handleOrderBy}>
                    <option value="id" ?selected=${this._orderBy === "id"}>ID</option>
                    <option value="name" ?selected=${this._orderBy === "name"}>Name</option>
                    <option value="price" ?selected=${this._orderBy === "price"}>Price</option>
                    <option value="description" ?selected=${this._orderBy === "description"}>Description</option>
                </select>
                <select name="order" id="order" @change=${this._handleSortOrder}>
                    <option value="ASC" ?selected=${this._sortOrder === "ASC"}>Ascending</option>
                    <option value="DESC" ?selected=${this._sortOrder === "DESC"}>Descending</option>
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