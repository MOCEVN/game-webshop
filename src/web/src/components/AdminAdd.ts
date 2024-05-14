import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";
import { ProductAddModel } from "@shared/formModels/ProductAddModel";

@customElement("admin-add")
export class AdminAdd extends LitElement{
    public static styles = css`
        form {
            margin: 2em;
        }
        form input, form textarea {
            display: block;
            margin-bottom: 1em;
        }
        .success {
            color: green;
        }
    `;

    private _userService: UserService = new UserService();

    @state()
    private _succeeded: boolean = false;
    /**
     * Submits the form to the API.
     * @param e event
     */
    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        const formElement: HTMLFormElement = e.target as HTMLFormElement;
        const formInputData: FormData = new FormData(formElement);
        const formData: ProductAddModel = {
            name: formInputData.get("name") as string,
            description: formInputData.get("description") as string,
            price: formInputData.get("price") as string,
            catagory: formInputData.get("catagory") as string | undefined,
            imageURLs: (formInputData.get("images") as string | undefined)?.split(" ")
        };
        this._succeeded = await this._userService.adminAddProduct(formData);
        
        if (this._succeeded) {
            formElement.reset();
        }
    }

    protected render(): TemplateResult {
        return html`
            <form @submit=${this.handleSubmit}>
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" required>
                <label for="description">Description:</label>
                <textarea name="description" id="description" required></textarea>
                <label for="price">Price:</label>
                <input type="number" step=0.01 name="price" id="price" required>
                <label for="catagory">Catagory:</label>
                <input type="text" name="catagory" id="catagory">
                <label for="images">ImageURLs:</label>
                <textarea name="images" id="images"></textarea>
                <button type="submit">Submit</button>
                ${this._succeeded ? html`<p class="success">Success!</p>` : nothing}
            </form>
        `;
    }
}