import { LitElement, html, css, TemplateResult } from "lit";
import {customElement, state} from "lit/decorators.js";
import {OrderItem, UserData} from "@shared/types";
import {UserService} from "../services/UserService";
import { OrderItemService } from "../services/OrderItemService";


@customElement("profile-page")
export class Profilepage extends LitElement {
    public static styles = css`
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        main {
            max-width: 800px;
            margin: 2em auto;
            padding: 1em;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            border-bottom: 2px solid #333;
            padding-bottom: 0.5em;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1em;
        }
        table,
        th,
        td {
            border: 1px solid #ddd;
        }
        th,
        td {
            padding: 0.5em;
            text-align: left;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        form label {
            margin-top: 1em;
        }
        form input {
            padding: 0.5em;
            margin-top: 0.5em;
        }
        form button {
            margin-top: 1em;
            padding: 0.7em;
            background-color: #333;
            color: white;
            border: none;
            cursor: pointer;
        }
        form button:hover {
            background-color: #555;
        }
        ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
        }
    `;

    @state()
    private _userData: UserData | undefined;
    private _orderData: OrderItem | undefined;

    private _userService: UserService = new UserService();
    private _orderItemService: OrderItemService = new OrderItemService();

    public async connectedCallback(): Promise<void> {
        this._userData = await this._userService.getInfo();
        this._orderData = await this._orderItemService.getOrderInfo();
        super.connectedCallback();
    }

    protected render(): TemplateResult {
        return html`
            <main>
                <section id="orders">
                    <h2>Mijn Bestellingen</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Bestelling ID</th>
                                <th>Datum</th>
                                <th>Totaal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${this._orderData?.id}</td>
                                <td>${this._orderData?.description}</td>
                                <td>${this._orderData?.catagory}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section id="user">
                    <h2>Mijn Gegevens</h2>
                    <form>
                    <p><strong>Naam:</strong> ${this._userData?.firstName}</p>
                    <p><strong>E-mail:</strong> ${this._userData?.email}</p>
                    </form>
                </section>
            </main>
        `;
    }
}
