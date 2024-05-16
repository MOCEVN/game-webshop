import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import {map} from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";


@customElement("products-root")
export class Root extends LitElement {

    public static styles = css`
    .container {
        max-height: 95vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .header{
        height: 10vh;
    }
    .ProductsH1 {
        color: black;
    }
    .ProductsContainer {
        padding-top: 1vw;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: grey;
        width: 90vw;
        /* height: 90vh; */
        overflow-y: scroll;
        border-radius: 10px;
    }
    .products{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 1vw;
        margin-right: 1vw;
        margin-bottom: 1vh;
        background-color: lightblue;
        width: 20vw;
        /* min-width: 150px; */
        height: 25vh;
        border-radius: 10px;
        padding: 15px, 15px, 15px, 15px;
    }
    `;

    @state() private game = "";

    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _orderItems: OrderItem[] = [];

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();
        
        await this.getOrderItems();
    }


    private async getOrderItems(): Promise<void>{
        const result: OrderItem[]|undefined = await this._orderItemService.getAll();

        if (!result) {
            return;
        }

        

        this._orderItems = result;
        // console.log(this._orderItems);

    }


    
    protected render(): unknown {
        return html`
        <div class = "container">
            <div class = "header">
        <h1 class= "ProductsH1">Products</h1>
        </div>
         <div class = "ProductsContainer">
         ${map(this._orderItems,(row) => {
            console.log(row);
            const container: HTMLDivElement = document.createElement("div");
            container.className = "products";
            const name: HTMLDivElement = document.createElement("div");
            name.className = "productname";
            name.innerHTML = row.name;

            const description: HTMLDivElement = document.createElement("div");
            description.className = "productdescription";
            
            // const imagesElement : HTMLElement= document.createElement("div");

            // const images : any = queryDatabase
            // description.innerHTML = row.description ? row.description : "";
            // const price: HTMLDivElement = document.createElement("div");
            // price.innerHTML = row.price;
            
            container.append(name,description);

            return container;
         })}
         </div>
    </div>
        `;
    }
}