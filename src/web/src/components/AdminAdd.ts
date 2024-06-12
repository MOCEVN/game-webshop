import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
// import { UserService } from "../services/UserService";
import { ProductAddModel } from "@shared/formModels/ProductAddModel";
import { OrderItemService } from "../services/OrderItemService";

@customElement("admin-add")
export class AdminAdd extends LitElement{
    public static styles = css`
        .container {
            display: flex;
        }
        form:not(:last-child) {
            border-right: 1px solid black;
            margin-right: 0;
            padding-right: 2em;
        }
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
        #json {
            margin-top: 1em;
        }
    `;

    // private _userService: UserService = new UserService();
    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _succeeded: boolean = false;

    @state()
    private _jsonStatus: {sent: boolean, recievedResponse: boolean} = {sent: false, recievedResponse: false};
    @state()
    private _jsonResult?: {succeeded?: number, failed?: number, errorOccured: boolean};
    /**
     * Submits the form to the API.
     * @param e event
     */
    private async _handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        const formElement: HTMLFormElement = e.target as HTMLFormElement;
        const formInputData: FormData = new FormData(formElement);
        const formData: ProductAddModel = {
            title: formInputData.get("name") as string,
            description: formInputData.get("description") as string,
            price: formInputData.get("price") as string,
            catagory: formInputData.get("catagory") as string | undefined,
            thumbnail: formInputData.get("thumbnail") as string | undefined,
            imageURLs: (formInputData.get("images") as string | undefined)?.split("\n")
        };
        this._succeeded = await this._orderItemService.add(formData);
        
        if (this._succeeded) {
            formElement.reset();
        }
    }

    private _handleFile(e: Event): void {
        e.preventDefault();
        const formElement: HTMLFormElement = e.target as HTMLFormElement;
        const fileElement: HTMLInputElement = formElement.querySelector("#json") as HTMLInputElement;
        const fileList: FileList | null = fileElement.files;
        if (!fileList){
            return;
        }
        const jsonFile: File = fileList[0];
        const fileReader: FileReader = new FileReader();
        fileReader.readAsText(jsonFile);
        fileReader.addEventListener("load",() => {
            const content: string = fileReader.result as string;
            this._jsonStatus = {sent: true, recievedResponse: false};
            void this._orderItemService.addMultiple(content).then((status) => {
                this._jsonStatus = {sent: true, recievedResponse: true};
                this._jsonResult = status;
            });
        });
    }

    protected render(): TemplateResult {
        return html`
            <div class="container">
                <form @submit=${this._handleSubmit}>
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" required>
                    <label for="description">Description:</label>
                    <textarea name="description" id="description" required></textarea>
                    <label for="price">Price:</label>
                    <input type="number" step=0.01 name="price" id="price" required>
                    <label for="catagory">Catagory:</label>
                    <input type="text" name="catagory" id="catagory">
                    <label for="thumbnail">Thumbnail URL:</label>
                    <input type="text" name="thumbnail" id="thumbnail">
                    <label for="images">Image URLs (one image per line):</label>
                    <textarea name="images" id="images"></textarea>
                    <button type="submit">Submit</button>
                    ${this._succeeded ? html`<p class="success">Success!</p>` : nothing}
                </form>
                <form @submit=${this._handleFile}>
                    <label for="json">Add products from JSON file</label>
                    <input type="file" id="json" accept=".json" required>
                    <input type="submit">
                    ${this._jsonResult && this._jsonStatus.recievedResponse ? this._jsonResult.errorOccured ? html`<p>An error occured</p>` : html`<p>${this._jsonResult.succeeded} succeeded, ${this._jsonResult.failed} failed</p>` : nothing}
                    ${this._jsonStatus.sent && !this._jsonStatus.recievedResponse ? html`<p>Processing...</p>` : nothing}
                </form>
            </div>

        `;
    }
}