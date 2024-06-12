import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

enum RouterPage {
    View = "view",
    Add = "add",
    Edit = "edit"
}

@customElement("admin-content")
export class AdminContent extends LitElement{
    public static styles = css`
        body {
            font-family: sans-serif;
        }
        nav {
            display: flex;
            gap: 3em;
            height: 3em;
            border-bottom: 1px solid #373E98;
            padding-left: 1em;
        }
        nav button {
            border: none;
            background-color: white;
            color: #373E98;
            cursor: pointer;
            border-radius: 1em 1em 0 0;
        }
        .selected {
            border: 1px solid #373E98;
            border-bottom: 1px solid white;
            margin-bottom: -1px;
        }
    `;

    @state()
    private _currentPage: RouterPage = RouterPage.Add;

    @state()
    private _editId?: string;

    private handleEditEvent(e: CustomEvent): void {
        this._editId = e.detail.id;
        this._currentPage = RouterPage.Edit;
    }

    protected render(): TemplateResult {
        return html`
            <nav>
                <button @click=${(): void => {this._currentPage = RouterPage.View;}} class=${this._currentPage === RouterPage.View ? "selected" : ""}>View products</button>
                <button @click=${(): void => {this._currentPage = RouterPage.Add;}} class=${this._currentPage === RouterPage.Add ? "selected" : ""}>Add products</button>
                <button @click=${(): void => {this._currentPage = RouterPage.Edit;}} class=${this._currentPage === RouterPage.Edit ? "selected" : ""}>Edit products</button>
            </nav>
            ${this.renderContent()}
        `;
    }
    private renderContent(): TemplateResult {
        switch (this._currentPage) {
            case RouterPage.View:
                return html`<admin-view @edit=${this.handleEditEvent}></admin-view>`;
            case RouterPage.Add:
                return html`<admin-add></admin-add>`;
            default:
                return html`<admin-edit productId=${ifDefined(this._editId)}></admin-edit>`;
        }
    }
}