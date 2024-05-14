import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";

@customElement("admin-root")
export class AdminRoot extends LitElement{
    public static styles = css`
        h1 {
            font-family: Arial, Helvetica, sans-serif;
            margin-top: 10px;
        }
    `;

    private _userService: UserService = new UserService();


    @state()
    private _responded: boolean = false;

    private _hasAccess!: boolean;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        this._hasAccess = await this._userService.requestAdminAccess();
        this._responded = true;
        this.requestUpdate();
    }

    private renderContent(): TemplateResult {
        if (!this._responded){
            return html`
                <p>requesting permission...</p>
            `;
        }
        if (this._hasAccess){
            return html`
                <admin-content></admin-content>
            `;
        }
        return html`
            <p>access denied</p>
            <p><a href="/">log in</a>to an account with administrator privileges.</p>
        `;
    }

    protected render(): TemplateResult {
        return html`
            <a href="/">back to main page</a>
            <h1>Admin panel</h1>
            ${this.renderContent()}
        `;
    }
}