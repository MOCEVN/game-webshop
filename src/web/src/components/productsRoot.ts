import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import {map} from "lit/directives/map.js";
import { OrderItemService } from "../services/OrderItemService";
import { OrderItem } from "@shared/types";


@customElement("products-root")
export class Root extends LitElement {

    public static styles = css`
    .container {
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
        background-color: grey;
        width: 90vw;
        height: 90vh;
        overflow-y: scroll;
    }
    `;

    @state() private game = "";

    @state()
    private _orderItemService: OrderItemService = new OrderItemService();

    @state()
    private _orderItems: OrderItem[] = [];


    private async getOrderItems(): Promise<void>{
        const result: OrderItem[]|undefined = await this._orderItemService.getAll();

        if (!result) {
            return;
        }

        this._orderItems = result;
    }


    
    protected render(): unknown {
        return html`
        <div class = "container">
            <div class = "header">
        <h1 class= "ProductsH1">Products</h1>
        </div>
         <div class = "ProductsContainer">
         ${map(this._orderItems,(_product) => {
            
         })}
         </div>
    </div>
        `;
    }
}