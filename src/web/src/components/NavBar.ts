import { UserHelloResponse } from "@shared/responses/UserHelloResponse";
import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";
import { when } from "lit/directives/when.js";
import { TokenService } from "../services/TokenService";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("nav-bar")
export class Navbar extends LitElement {
    public static styles = css`
        .navBar {
            width: 100%;
            max-width: 100%;
            background-color: lightgray;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
        }

        .navBar ul li:first-child,
        .navBar ul li:nth-child(2) {
            margin-right: auto;
        }

        .navBar img {
            height: 30px;
            margin-right: 20px;
        }

        .navBar ul {
    display: flex;
    list-style-type: none;
    justify-content: flex-end;
    padding: 15px 30px;


    .navBar ul li {
    display: flex;
    align-items: center;
    margin: 0 10px;
}
.navBar ul li img {
    margin: 0; 
}
}
        .navBar ul ul {
            display: flex;
            gap: 10px;
        }

        .navBar li {
            height: 50px;
        }

        .navBar a {
            height: 100%;
            padding: 0 30px;
            text-decoration: none;
            color: black;
            display: flex;
            align-items: center;
        }

        .navBar .logo {
            height: 70px;
        }

        .searchBar {
            width: 100%;
            align-content: center;
            position: relative;
        }

        .searchBar form {
            width: 100%;
            display: flex;
        }
        .searchBar input[type=text] {
            width: 100%;
            padding: 10px 30px;
            border: 1px solid #ccc;
            border-radius: 20px;
            font-size: 16px;
            box-sizing: border-box;
        }

        .searchBar input[type=image] {
            height: 20px;
            width: 20px;
            position: absolute;
            right: 10px;
            top: 15px;
        }

        footer {
            height: 50px;
            background-color: lightgray;
            padding: 0 50px;
            display: flex;
            align-items: flex-end;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 1;
        }
        footer p {
            line-height: 1.2em;
            height: 1.2em;
        }
    `;

    @state()
    private _isLoggedIn: boolean = false;
    private _isAssigned: boolean = false;
    private _hasAccess!: boolean;

    private _userService: UserService = new UserService();
    private _tokenService: TokenService = new TokenService();
    private _searchQuery: string | undefined;

    // Fetch and Parse navigation bar and footer
    protected render(): TemplateResult {
        return html` ${this.renderNavBar()} ${this.renderFooter()} `;
    }

    private async clickLogoutButton(_event: Event): Promise<void> {
        await this._userService.logout();
        this._tokenService.removeToken();
        this._isLoggedIn = false;
        this._hasAccess = false;

        // redirect to login page
        window.location.href = "login.html";
    }

    // Login
    public async connectedCallback(): Promise<void> {
        super.connectedCallback();


        this._hasAccess = await this._userService.requestAdminAccess();

        const urlParams: URLSearchParams = (new URL(window.location.toString())).searchParams;
        if (urlParams.has("search")){
            this._searchQuery = urlParams.get("search") as string;
        }

        await this.getWelcome();
    }

    private async getWelcome(): Promise<void> {
        const result: UserHelloResponse | undefined = await this._userService.getWelcome();
        if (result) {
            this._isLoggedIn = true;
            this._isAssigned = true;
    
            const isAdmin: boolean = await this._userService.requestAdminAccess();
            if (isAdmin) {
                this._hasAccess = true;
            }
        }
    }

    private handleSearch(e: Event): void {
        e.preventDefault();
        const formElement: HTMLFormElement = e.target as HTMLFormElement;
        const formInputData: FormData = new FormData(formElement);
        window.location.href = `/products.html?search=${formInputData.get("search") as string}`;
        
    }

    private renderNavBar(): TemplateResult {
        return html`
            <nav class="navBar">
                <ul>
                    <li>
                        <a href="/"><img src="/assets/img/logo.png" class="logo" /></a>
                    </li>
                    <li><a href="products.html">Producten</a></li>
                    <li class="searchBar">
                        <form @submit=${this.handleSearch}>
                            <input type="text" placeholder="Zoek producten..." name="search" value=${ifDefined(this._searchQuery)} />
                            <input type="image" src="/assets/img/search.png" alt="search">
                        </form>
                    </li>

                    <!-- Show if the user is logged in -->
                    ${when(
                        this._isLoggedIn && this._isAssigned,
                        () => html`
                            <li>
                                <a href="shoppingcart.html"><img src="/assets/img/cart.png" /></a>
                            </li> 
                            <li>
                                <a href="#"><img src="/assets/img/heart.png" /></a>
                            </li>
                            <li>
                                <a href="profile.html"><img src="/assets/img/account.png" /></a>
                            </li>
                              <!-- Admin panel if the admin is logged in -->
                        ${this._hasAccess
                            ? html`
                                <li>
                                    <a href="admin.html"><img src="/assets/img/admin_panel.png" /></a>
                                </li> 
                            `
                            : ""}
                            <li>
                                <a href="#" @click=${this.clickLogoutButton}
                                    ><img src="/assets/img/login.png" />Logout</a
                                >
                            </li>
                        `,
                        // else the user needs to login first
                        () => html`
                            <li>
                                <a href="login.html" id="logIn"><img src="/assets/img/login.png" />Login</a>
                            </li>
                        `
                    )}
                   
                </ul>
            </nav>
        `;
    }

    private renderFooter(): TemplateResult {
        return html`
            <footer>
                <p>Copyright © Luca Stars 2024</p>
            </footer>
        `;
    }
}
