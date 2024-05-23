
import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";

const checkcart: any = ();
let message: any ;

if(checkcart === null){
    message = html`<div class="noproductstext">
    <img class="shoppingbag" src="/assets/img/Shoppingbag.png" />

    <h1>Winkelwagen</h1>
    <p>
        Er zijn geen producten in jouw winkelwagen. Klik op de onderstaande knop om verder te
        winkelen.
    </p>
    <button class="winkelen">verder winkelen</button>
</div> `;
}else if(checkcart.length){
}
 else {
 message = html `<img src="">
    <p>je moet ingelogd zijn om de winkelwagen te kunne gebruiken!</p>`;
}


@customElement("shoppingcart-root")
export class shoppingcart extends LitElement {
    public static styles = css`
        .noproductstext {
            text-align: center;
            margin-top: 8vh;
        }
        .shoppingbag {
            width: 8vw;
        }
        .winkelen {
            margin-top: 2vh;
            width: 35vw;
            height: 5vh;
        }
    `;

    }

