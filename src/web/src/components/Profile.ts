import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";


@customElement("profile-page")
export class Profilepage extends LitElement {
    public static styles = css`
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        nav {
            background-color: #444;
            padding: 0.5em;
        }
        nav ul {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: center;
        }
        nav ul li {
            margin: 0 1em;
        }
        nav ul li a {
            color: white;
            text-decoration: none;
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
                                <th>Status</th>
                                <th>Totaal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12345</td>
                                <td>01-06-2024</td>
                                <td>Verzonden</td>
                                <td>€50.00</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section id="user">
                    <h2>Mijn Gegevens</h2>
                    <form>
                    <p><strong>Naam:</strong> </p>
                    <p><strong>E-mail:</strong> </p>
                    </form>
                </section>
            </main>
        `;
    }
}
