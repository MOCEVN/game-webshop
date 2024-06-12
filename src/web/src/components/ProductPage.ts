import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { OrderItemService } from "../services/OrderItemService";
import { ShoppingcartService } from "../services/ShoppingcartService";
import { OrderItem } from "@shared/types";
// import { URL } from "url";

@customElement("productpage-element")
export class ProductPage extends LitElement {
    public static styles = css`
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1 { font-size: 20px
    }

    a {
        text-decoration: none;
    }
    
    .container {
        display: flex;
        align-items: center;
        margin-top: -130px;
    }
    
    .game-title {
        font-size: 2em;
        margin-left: 120px;
        margin-top: 20px;
    }
    
    .productBasic {
        display: flex;
        align-items: flex-start; 
        margin-left: 120px;
        margin-top: 50px;
        margin-right: 110px;
        width: calc(70% - 230px); 
        height: auto; 
        border-radius: 2px;
        padding: 5px;
        background-color: #c2c2c2;
        /* overflow: hidden; */
    }
    .aanbevelingen {
        width: 420px;
        background-color: #c2c2c2;
        border: 1px solid #afafaf;
        border-radius: 5px;
        padding: 20px;
        margin-right: 70px;
        margin-top: 120px;
        height: fit-content;
    }

    .aanbevelingen h1 {
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    .productBasic-text {
    width: 50%; /* Adjust width as needed */
    margin-left: 20px; /* Space between carousel and text */
}
    
    .genres {
        margin-top: 15px;
        margin-bottom: 8px;
    }

    .genreLabel {
        background-color: #8d8d8d;
        border-radius: 5px;
        padding: 5px;
    }

    .genresTab {
        margin-bottom: 20px;
    }

    .developers {
        margin-top: 150px;
        font-size: 1em;
    }

    .aanbevelingenTitle {
        margin: 0 0 40px 10px;
    }

    .addToCart {
        height: fit-content;
        width: 900px;
        background-color: #c2c2c2;
        margin-left: 120px;
        border-radius: 2px;
        padding-left: 35px;
        padding-top: 0px;
        padding-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .addCartText {
        font-size: 2em;
        margin-top: 40px;
    }
    
    .addCartBtn {
        border-radius: 6px;
        padding-left: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 20px;
        background-color: #1f1f1f;
        margin-top: 30px;
        margin-right: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
        align-self: flex-end;
    }

    .addCartBtnText {
        margin-top: 5px;
        margin-bottom: 8px;
        color: white;
        font-size: 2em;
    }
    
    .voegToe {
        margin-left: 20px;
        color: #81e978;
        font-size: 1em;
    }
    
    .product-detailed {
        margin-left: 120px;
        width: 1190px;
    }

    .about {
        margin-top: 50px;
        margin-bottom: 4px;
    }
    
    .aboutCont {
        margin-bottom: 90px;
        font-size: 1.2em;
    }

    /* Styles for the fading line */
    .fading-line {
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #525252, rgba(51, 51, 51, 0));
        margin: 20px 0;
        margin-top: 0px;
    }

    .recommendation-item, .recommendation-item2 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .recommendation-item img {
        width: 100px;
        height: auto;
        border-radius: 5px;
        margin-right: 10px;
    }

    .recommendation-item2 img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        margin-right: 10px;
        object-fit: cover;
    }

    .recommendation-info {
        flex-grow: 1;
    }

    .recommendation-info p {
        margin: 0;
    }

    .limitedText {
        max-width: 20ch;
    }

    .old-price {
        text-decoration: line-through;
        color: red;
        margin-right: 5px;
    }

    .price {
        color: green;
        font-weight: bold;
    }

    button {
        padding: 5px 10px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #000000;
    }

    hr {
        border: none;
        border-top: 1px solid #ccc;
        margin: 10px 0;
    }

    #cartImg {
        color: #81e978;
        height: 20px;
        width: 20px;
        margin-left: 10px;
        margin-top: 2px;
    }

    #slider {
    margin-top: 6px;
    width: 50%; /* Adjust width as needed */
    max-width: 100%; /* Ensure it does not exceed parent container */
    margin-right: 20px; /* Space between carousel and text */
    }

    .thumbProduct {
        width: 95%;
        margin-top: 8px;
        height: 250px;
        object-fit: cover;
    }

    .slide-content {
        width: auto;
        margin-top: 8px;
        height: 10px;
        object-fit: cover; 
    }

#slider input[type=radio] {
   display: none;
}
#slider label {
   cursor:pointer;
   text-decoration: none;
}
#slides {
   margin-left: 6px;
   padding: 5px;
   border: 1px solid #ccc;
   background: #fff;
   position: relative;
   z-index: 1;
}
#overflow {
   width: 100%;
   overflow: hidden;
}
#slide1:checked ~ #slides .inner {
   margin-left: 0;
}
#slide2:checked ~ #slides .inner {
   margin-left: -100%;
}
#slide3:checked ~ #slides .inner {
   margin-left: -200%;
}
#slide4:checked ~ #slides .inner {
   margin-left: -300%;
}
#slides .inner {
   transition: margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
   width: 400%;
   line-height: 0;
   height: 300px;
}
#slides .slide {
   width: 25%;
   float:left;
   /* display: flex; */
   justify-content: center;
   align-items: center;
   height: 100%;
   color: #fff;
}
.thumbImg {
    height: fit-content;
    margin-top: -35px;
    margin-left: -35px;
    width: 600px;
    object-fit: cover;
}
#slides .slide_1 {
   background: #00171F;
}
#slides .slide_2 {
   background: #003459;
}
#slides .slide_3 {
   background: #007EA7;
}
#slides .slide_4 {
   background: #00A8E8;
}
#controls {
   margin: -180px 0 0 0;
   width: 100%;
   height: 50px;
   z-index: 3;
   position: relative;
}
#controls label {
   transition: opacity 0.2s ease-out;
   display: none;
   width: 50px;
   height: 50px;
   opacity: .4;
}
#controls label:hover {
   opacity: 1;
}
#slide1:checked ~ #controls label:nth-child(2),
#slide2:checked ~ #controls label:nth-child(3),
#slide3:checked ~ #controls label:nth-child(4),
#slide4:checked ~ #controls label:nth-child(1) {
   background: url(https://image.flaticon.com/icons/svg/130/130884.svg) no-repeat;
   float:right;
   margin: 0 -50px 0 0;
   display: block;
}
#slide1:checked ~ #controls label:nth-last-child(2),
#slide2:checked ~ #controls label:nth-last-child(3),
#slide3:checked ~ #controls label:nth-last-child(4),
#slide4:checked ~ #controls label:nth-last-child(1) {
   background: url(https://image.flaticon.com/icons/svg/130/130882.svg) no-repeat;
   float:left;
   margin: 0 0 0 -50px;
   display: block;
}
#bullets {
   margin: 150px 0 0;
   text-align: center;
}
#bullets label {
   display: inline-block;
   width: 10px;
   height: 10px;
   border-radius:100%;
   background: #ccc;
   margin: 0 10px;
}
#slide1:checked ~ #bullets label:nth-child(1),
#slide2:checked ~ #bullets label:nth-child(2),
#slide3:checked ~ #bullets label:nth-child(3),
#slide4:checked ~ #bullets label:nth-child(4) {
   background: #444;
}
@media screen and (max-width: 900px) {
   #slide1:checked ~ #controls label:nth-child(2),
   #slide2:checked ~ #controls label:nth-child(3),
   #slide3:checked ~ #controls label:nth-child(4),
   #slide4:checked ~ #controls label:nth-child(1),
   #slide1:checked ~ #controls label:nth-last-child(2),
   #slide2:checked ~ #controls label:nth-last-child(3),
   #slide3:checked ~ #controls label:nth-last-child(4),
   #slide4:checked ~ #controls label:nth-last-child(1) {
      margin: 0;
   }
   #slides {
      max-width: calc(100% - 140px);
      margin: 0 auto;
   }
   .addToCart {
        width: 100%;
        margin-left: 0;
        padding-left: 10px;
        padding-right: 10px;
   }
}

`;

    public connectedCallback(): void {
        super.connectedCallback();
        void this.getProduct();
    }

    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _product!: OrderItem;

    @state()
    private _checkcart!: ShoppingcartService;

    private async getProduct(): Promise<void> {
        const id: string | null = new URL(document.location.toString()).searchParams.get("id");
        if (id) {
            const result: OrderItem | undefined = await this._orderItemService.getProduct(id);
            console.log(result);
            if (result) {
                this._product = result;
            }
        } else {

        }
    }

    private addToCart(): void {
        console.log("Je product is toegevoegd aan je mandje!");
    }

    private sumPrices(): string {
        const oldPrice: number = parseFloat(this._product.price.toString());
        let newPrice: number = oldPrice + 8.99;
        if (oldPrice <= 0.00) {
            newPrice = newPrice + 4.00;
        }
        return newPrice.toFixed(2);
    }

    protected render(): TemplateResult {
        if (!this._product) {
            return html`
            
            <div class="navBar" id="navBar">
                <nav-bar></nav-bar>
            </div>
            <p>aan het laden...</p>
            `;
        }


        this.sumPrices();

        return html`
            <div class="navBar" id="navBar">
                <nav-bar></nav-bar>
            </div>
    
            <h1 class="game-title">${this._product.title}</h1> 
    
            <div class="container">
                <div class="productBasic">
                    <div id="slider">
                        <input type="radio" name="slider" id="slide1" checked>
                        <input type="radio" name="slider" id="slide2">
                        <input type="radio" name="slider" id="slide3">
                        <input type="radio" name="slider" id="slide4">
                        <div id="slides" style="width: 550px;">
                            <div id="overflow">
                                <div class="inner">
                                    <div class="slide slide_1">
                                        <!-- <div class="slide-content">
                                            <h2>Slide 1</h2>
                                            <p>Content for Slide 1</p>
                                        </div> -->
                                        <div class="slide-content">
                                            <img src=${this._product.thumbnail} class="thumbImg">
                                        </div>
                                    </div>
                                    <div class="slide slide_2">
                                        <div class="slide-content">
                                            <h2>Slide 2</h2>
                                            <p>Content for Slide 2</p>
                                        </div>
                                    </div>
                                    <div class="slide slide_3">
                                        <div class="slide-content">
                                            <h2>Slide 3</h2>
                                            <p>Content for Slide 3</p>
                                        </div>
                                    </div>
                                    <div class="slide slide_4">
                                        <div class="slide-content">
                                            <h2>Slide 4</h2>
                                            <p>Content for Slide 4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="controls">
                            <label for="slide1"></label>
                            <label for="slide2"></label>
                            <label for="slide3"></label>
                            <label for="slide4"></label>
                        </div>
                        <div id="bullets">
                            <label for="slide1"></label>
                            <label for="slide2"></label>
                            <label for="slide3"></label>
                            <label for="slide4"></label>
                        </div>
                    </div>
    
                    <!-- Game Information -->
                    <div class="productBasic-text">
                        <div id="productThumbnail">
                            <img src="https://lucastars.hbo-ict.cloud/assets/temp.png?height=1080&hmac=885812cc0967a27431a756b368fcc952ab759a9f715082c9582f375dd684a2f1" alt="${this._product.title}" class="thumbProduct">
                        </div>
    
                        <!-- <h3 class="developers">Giorgio, Megan, Nico, Nii, Omar, Sonny</h3> -->
                        <h3 class="publishedDate">6/03/2024</h3>
                        <div class="genresTab">
                            <h3 class="genres">Genres:</h3>
                            <label class="genreLabel">Fantasy</label>
                            <label class="genreLabel">Singleplayer</label>
                            <label class="genreLabel">Text-Based</label>
                        </div>
                    </div>
                </div>
                <!-- aanbevelingen -->
                <div class="aanbevelingen">
                    <h1 class="aanbevelingenTitle" style="margin-bottom: 25px;">Top aanbevelingen</h1>
                    <div class="recommendation-item">
                        <img src="https://lucastars.hbo-ict.cloud/media/6918722fe0104049b27aa218c692a417/00000006000000000000000000000000.png?height=240&v=1da877783972670&hmac=45b6c4a69cf0360b4fedbe3b778e568b23d65bb1e341931104dda3118cd5ed15" alt="Recommendation 1">
                        <div class="recommendation-info">
                            <p class="limitedText">${this._product.title} + Terror Trial</p>
                            <p class="old-price">${this.sumPrices()} $</p>
                            <p class="price">10.98$</p>
                        </div>
                        <button>Voeg toe</button>
                    </div>
                    <hr>
                    <div class="recommendation-item">
                        <img src="https://m.media-amazon.com/images/I/61EK4WHx9EL.jpg" alt="Recommendation 2">
                        <div class="recommendation-info">
                            <p>${this._product.title} + Ghost Plushie</p>
                            <p class="old-price">16.99$</p>
                            <p class="price">12.99$</p>
                        </div>
                        <button>Voeg toe</button>
                    </div>
                    <hr>
                    <div class="recommendation-item2">
                        <img src="https://lucastars.hbo-ict.cloud/media/4b920de079414dec8df411e94f771bf0/00000006000000000000000000000000.png" alt="Recommendation 3">
                        <div class="recommendation-info">
                            <p>${this._product.title} + Lost Lands</p>
                            <p class="old-price">${this.sumPrices()}$</p>
                            <p class="price">9.99$</p>
                        </div>
                        <button>Voeg toe</button>
                    </div>
                </div>
            </div>
    
    
            <div class="addToCart">
                <h1 class="addCartText">Koop ${this._product.title}</h1>
                <a href="#" @click=${this.addToCart}>
                    <button class="addCartBtn">
                        <h1 class="addCartBtnText">$${this._product.price}</h1>
                        <h3 class="voegToe">Voeg toe</h3>
                        <img id="cartImg" src="/assets/img/greenCart.png" alt="shopping cart img">
                    </button>
                </a>
            </div>
    
            <div class="product-detailed">
                <h2 class="about">Over dit spel</h2><div class="fading-line"></div>
    
                <!--TODO: zorg ervoor dat de informatie over de game uit de database hier komt te staan-->
                <p class="aboutCont">${this._product.description}</p>
            </div>
        `;
    }
}
