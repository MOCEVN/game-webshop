import { html, css, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("productpage-element")
export class ProductPage extends LitElement {
    public static styles = css`
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1 { font-size: 20px
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
        margin-left: 120px;
        margin-top: -15px;
        margin-right: 110px;
        width: 1190px;
        height: 450px;
        border-radius: 2px;
        padding: 5px;
        background-color: #c2c2c2;
    }

    .productBasic-text {
        margin-left: 650px;
    }
    
    .genres {
        margin-top: 50px;
        margin-bottom: 8px;
    }

    .genreLabel {
        background-color: #8d8d8d;
        border-radius: 5px;
        padding: 5px;
    }
    
    .aanbevelingen {
        margin-right: 10px;
        margin-top: 120px;
        height: 600px;
        width: 420px;
        border-radius: 2px;
        background-color: #c2c2c2;
    }

    .developers {
        margin-top: 150px;
        font-size: 1em;
    }

    .aanbevelingenTitle {
        margin-left: 20px;
    }

    .addToCart {
        height: 70px;
        width: 900px;
        background-color: #c2c2c2;
        margin-left: 120px;
        border-radius: 2px;
        padding-left: 35px;
        padding-top: 1px;
        padding-bottom: 30px;
        display: flex;
        align-items: center;
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
        margin-left: 400px;
        /* font-size: 2em; */
        align-items: center;
        display: flex;
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
}

.aanbevelingen {
    width: 420px;
    background-color: #c2c2c2;
    border: 1px solid #afafaf;
    border-radius: 5px;
    padding: 20px;
    margin-right: 70px;
    height: 550px;
}

.aanbevelingen h1 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.recommendation-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.recommendation-item img {
    width: 50px;
    height: auto;
    border-radius: 5px;
    margin-right: 10px;
}

.recommendation-info {
    flex-grow: 1;
}

.recommendation-info p {
    margin: 0;
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
    background-color: #555;
}

hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 10px 0;
}

    
    `;

    protected render():TemplateResult {
        return html`
            <div class="navBar" id="navBar">
                <nav-bar></nav-bar>
            </div>

            <h1 class="game-title">Titel komt hier</h1> 

            <div class= "container">
                <div class="productBasic">
                    <div class= "productBasic-text">
                        <h3 class= "developers">Giorgio, Megan, Nico, Nii, Omar, Sonny</h3>
                        <h3 class= "publishedDate">6/03/2024</h3>
                        <h3 class= "genres">Genres:</h3>
                        <label class= "genreLabel">Fantasy</label>
                        <label class= "genreLabel">Singleplayer</label>
                        <label class= "genreLabel">Text-Based</label>
                    </div>
                </div>

                <!-- <div class="aanbevelingen"> -->
                    <div class="aanbevelingen">
                    <h1 class= "aanbevelingenTitle">Top aanbevelingen</h1>
                        <div class="recommendation-item">
                            <img src="path/to/your/image1.jpg" alt="Recommendation 1">
                            <div class="recommendation-info">
                                <p>Terror Trial</p>
                                <p class="old-price">15.98$</p>
                                <p class="price">12.98$</p>
                            </div>
                            <button>Voeg toe</button>
                        </div>
                        <hr>
                        <div class="recommendation-item">
                            <img src="path/to/your/image2.jpg" alt="Recommendation 2">
                            <div class="recommendation-info">
                                <p>Ghost Plushie</p>
                                <p class="old-price">6.99$</p>
                                <p class="price">8.99$</p>
                            </div>
                            <button>Voeg toe</button>
                        </div>
                        <hr>
                        <div class="recommendation-item">
                            <img src="path/to/your/image3.jpg" alt="Recommendation 3">
                            <div class="recommendation-info">
                                <p>Lost Lands</p>
                                <p class="old-price">6.99$</p>
                                <p class="price">8.99$</p>
                            </div>
                            <button>Voeg toe</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="addToCart">
                <h1 class="addCartText">Koop Terror Trial</h1>
                <div class="addCartBtn">
                    <h1 class="addCartBtnText">8.99$</h1>
                    <h3 class="voegToe">Voeg toe</h3>
                </div>
            </div>

            <div class="product-detailed">
                <h2 class="about">Over dit spel</h2><div class="fading-line"></div>

                <p class="aboutCont">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit, nisl a dignissim cursus, neque sem rutrum nisl, ac pulvinar nunc metus sit amet eros. Fusce eget ultricies magna. Duis semper vitae ex sit amet interdum. Curabitur sagittis rutrum sapien ornare lobortis. Maecenas nisi justo, vulputate at neque a, volutpat auctor erat. Integer ornare ornare massa eu ornare. Etiam sollicitudin sit amet purus volutpat vestibulum. Curabitur id risus ultrices, ultricies odio et, fringilla felis. Etiam pulvinar, felis ac porta porta, enim lacus hendrerit dui, vel dignissim purus sapien ut enim. Duis ac ex cursus, tempor mi eu, sollicitudin magna. Aliquam pretium auctor nisi at porttitor. In varius erat eu fermentum consequat. Sed congue, sem sed molestie cursus, turpis elit ultrices ipsum, et tincidunt urna eros a diam. Aliquam condimentum nibh a ligula venenatis egestas.</p>
            </div>
        `;
    }
}