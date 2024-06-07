import { OrderItem } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { OrderItemService } from "../services/OrderItemService";
import { until } from "lit/directives/until.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ProductAddModel } from "@shared/formModels/ProductAddModel";

@customElement("admin-edit")
export class AdminEdit extends LitElement{
    public static styles = css`
        .container {
            padding: 1em;
        }
        form {
            margin: 1em;
        }
        form input, form textarea {
            display: block;
            margin-bottom: 1em;
        }
        .success {
            color: green;
        }
    `;

    @property()
    public productId?: string;
    
    @state()
    private _succeeded: boolean = false;


    private _orderItemService: OrderItemService = new OrderItemService();

    private _product?: OrderItem;
    
    private async _getProduct(): Promise<void>{
        if (this.productId) {
            this._product = await this._orderItemService.getProduct(this.productId);
        }    
    }

    private async _handleSubmit(e: Event): Promise<void>{
        e.preventDefault();
        const formElement: HTMLFormElement = e.target as HTMLFormElement;
        const formInputData: FormData = new FormData(formElement);
        const formData: ProductAddModel & {id: string} = {
            id: this.productId!,
            title: formInputData.get("name") as string,
            description: formInputData.get("description") as string,
            price: formInputData.get("price") as string,
            catagory: formInputData.get("catagory") as string | undefined,
            thumbnail: formInputData.get("thumbnail") as string | undefined,
            imageURLs: (formInputData.get("images") as string | undefined)?.split("\n")
        };
        this._succeeded = await this._orderItemService.editProduct(formData);
    }

    private async _renderForm(): Promise<TemplateResult>{
        await this._getProduct();
        console.log(this._product);
        
        return html`
            <form @submit=${this._handleSubmit}>
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" value=${this._product!.title} required>
                <label for="description">Description:</label>
                <textarea name="description" id="description" required>${this._product!.description}</textarea>
                <label for="price">Price:</label>
                <input type="number" step=0.01 name="price" id="price" value=${this._product!.price} required>
                <label for="catagory">Catagory:</label>
                <input type="text" name="catagory" id="catagory" value=${ifDefined(this._product?.catagory?.name)}>
                <label for="thumbnail">Thumbnail URL:</label>
                <input type="text" name="thumbnail" id="thumbnail" value=${ifDefined(this._product?.thumbnail)}>
                <label for="images">Image URLs (one image per line):</label>
                <textarea name="images" id="images">${ifDefined(this._product?.imageURLs?.join("\n"))}</textarea>
                <button type="submit">Submit</button>
                ${this._succeeded ? html`<p class="success">Success!</p>` : nothing}
            </form>
        `;
    }

    protected render(): TemplateResult {
        if (!this.productId) {
            return html`
                <div class="container">
                    Select a product from the view page.
                </div>
            `;
        }
        return html`
            <div class="container">
                ${until(this._renderForm(),html`
                    <p>loading...</p>
                `)}
            </div>
        `;
    }
}