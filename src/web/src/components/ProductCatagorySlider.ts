import { OrderItem } from "@shared/types";
import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

@customElement("product-catagory")
export class ProductCatagorySlider extends LitElement{
    public static styles = css`

        .hover-glow {
            transition-duration: 0.1s;
        }
        .hover-glow:hover, .catagory-fade-right:hover > .hover-glow, .catagory-fade-left:hover > .hover-glow {
            filter: brightness(0.9) drop-shadow(0 3px 10px #ffffff80) drop-shadow(0 3px 10px #fff)
        }
        .catagory {
            display: flex;
            position: relative;
            flex-direction: column;
            max-width: 90vw;
            /* overflow: hidden; */
        }
        .catagory-text{
            text-decoration: underline;
            text-underline-offset: 7px;
            white-space: pre;
            cursor: pointer;
            margin-right: auto;
        }
        .catagory-text:hover {
            text-shadow: 0 0 1px black;
        }
        .catagory-content {
            display: flex;
            overflow: hidden;
        }
        .catagory-fade-right {
            position: absolute;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            right: 0;
            bottom: 0;
            width: 10vw;
            height: 18em;
            background: linear-gradient(270deg, #fff, #ffffff00)
        }
        .catagory-fade-right img {
            width: 3em;
            height: 3em;
            margin-right: clamp(0px, calc(2vw - 10px), 100vw);
            cursor: pointer;
        }
        .catagory-fade-left {
            position: absolute;
            display: none;
            justify-content: flex-start;
            align-items: center;
            left: 0;
            bottom: 0;
            width: 10vw;
            height: 18em;
            background: linear-gradient(90deg, #fff, #ffffff00)
        }
        .catagory-fade-left img {
            width: 3em;
            height: 3em;
            margin-left: clamp(0px, calc(2vw - 10px), 100vw);
            cursor: pointer;
            transform: rotate(180deg);
        }
        .scrolled .catagory-fade-left {
            display: flex !important;
        }
        .game {
            position: relative;
            margin-right: 2em;
            min-width: 12em;
            width: 12em;
            height: 18em;
            overflow: hidden;
            cursor: pointer;
        }
        .game img {
            width: 12em;
            height: 10em;
            object-fit: cover;
            object-position: center;
        }
        .game-title {
            font-size: 1.5em;
            margin: 0;
        }
        .game-description {
            margin: 0;
            font-size: 0.7em;
            /* max-height: 8em; */
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .game-fade {
            position: absolute;
            bottom: 0;
            height: 1.2em;
            width: 100%;
            background: linear-gradient(0, #ffffffff, #ffffff00);
        }
        .noselect, .hover-glow {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;                             
        }
    `;

    @property({type: Array})
    public products!: OrderItem[];

    @property({type: String})
    public catagory!: string;

    @property({type: Number})
    public catagoryId!: number;

    public connectedCallback(): void {
        super.connectedCallback();
        console.log(this.products);
        
    }

    private _scrollCatagoryRight(e: Event): void {
        const catagoryElement: HTMLElement = (e.target as HTMLElement).parentElement?.parentElement?.querySelector(".catagory-content") as HTMLElement;
        catagoryElement.scrollBy({ left: 400, behavior: "smooth" });
        this._checkScrollVisibility(catagoryElement, true);
    }
    private _scrollCatagoryLeft(e: Event): void {
        const catagoryElement: HTMLElement = (e.target as HTMLElement).parentElement?.parentElement?.querySelector(".catagory-content") as HTMLElement;
        catagoryElement.scrollBy({ left: -400, behavior: "smooth" });
        this._checkScrollVisibility(catagoryElement, false);
    }
    private _checkScrollVisibility(catagoryElement: HTMLElement, scrollRight: boolean): void {
        const parentElement: HTMLElement = catagoryElement.parentElement as HTMLElement;
        const leftScroll: HTMLElement = parentElement.querySelector(".catagory-fade-left") as HTMLElement;
        const rightScroll: HTMLElement = parentElement.querySelector(".catagory-fade-right") as HTMLElement;
        if (scrollRight) {
            if (catagoryElement.scrollLeft <= 400) {
                leftScroll.style.display = "flex";
            } else if (catagoryElement.scrollLeft >= catagoryElement.scrollWidth - catagoryElement.clientWidth - 400) {
                rightScroll.style.display = "none";
            }
        } else {
            if (catagoryElement.scrollLeft <= 400) {
                leftScroll.style.display = "none";
            } else if (catagoryElement.scrollLeft >= catagoryElement.scrollWidth - catagoryElement.clientWidth - 400) {
                rightScroll.style.display = "flex";
            }

        }
    }
    
    private renderGame(game: OrderItem): TemplateResult {
        return html`
            <article class="game" @click=${(): void => {window.location.href = `/productpage.html?id=${game.id}`;}}>
                <img src=${game.thumbnail} alt="">
                <p class="game-title">${game.title}</p>
                <p class="game-description">${game.description}</p>
                <div class="game-fade"></div>
            </article>
        `;
    }

    protected render(): TemplateResult {
        return html`
            <section class="catagory">
                <p class="catagory-text">${this.catagory}  ></p>
                <div class="catagory-content">
                    ${map(this.products.filter((item: any) => item.categoryId === this.catagoryId), this.renderGame.bind(this))}
                </div>
                <div class="catagory-fade-right" @click=${this._scrollCatagoryRight}>
                    <img src="/assets/img/arrow.png" alt="" class="hover-glow">
                </div>
                <div class="catagory-fade-left" @click=${this._scrollCatagoryLeft}>
                    <img src="/assets/img/arrow.png" alt="" class="hover-glow">
                </div>
            </section>
        `;
    }
}