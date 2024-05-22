import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";
import {until} from "lit/directives/until.js";
import { map } from "lit/directives/map.js";

@customElement("admin-view")
export class AdminView extends LitElement {
    public static styles = css`
        
    `;

    private _orderItemService: OrderItemService = new OrderItemService();

    private _products!: OrderItem[];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this._getProducts();
    }

    private async _getProducts(): Promise<void> {
        const products: OrderItem[] | undefined = await this._orderItemService.getAll();
        if (products) {
            this._products = products;
            return;
        }
    }

    private async _renderProducts(): Promise<TemplateResult> {
        
        await this._getProducts();
        if (this._products) {
            return html`
                ${map(this._products, (val) => html`<p>${val.name}</p>`)}
            `;
        }
        return html`<p>couldn't get products</p>`;
    }

    private _refresh(): void {
        this.requestUpdate();
    }
    
    protected render(): TemplateResult {
        return html`
            <button @click=${this._refresh}>refresh</button>
            ${until(this._renderProducts(),html`<p>Fetching products...</p>`)}
        `;
    }
}