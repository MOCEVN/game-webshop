import { html, css, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("productpage-element")
export class ProductPage extends LitElement {
    public static styles = css`
    h1 { font-size: 20px
    }

    .game-title {
        font-size: 2em;
        margin-left: 120px;
        margin-top: 20px;
    }
    
    .product-basic {
        margin-left: 120px;
        margin-top: -15px;
        margin-right: 600px;
        height: 450px;
        border-radius: 2px;
        padding: 5px;
        background-color: #828282;
    }
    `;

    protected render():TemplateResult {
        return html`
            <div class="navBar" id="navBar">
                <nav-bar></nav-bar>
            </div>

            <h1 class="game-title">Titel komt hier</h1> 

            <div class="product-basic">
            </div>

            <div class="aanbevelingen">
                
            </div>
            
            <div class="product-detailed"> 
            </div>
        `;
    }
}