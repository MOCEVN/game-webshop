// import { LitElement, html, css, TemplateResult } from "lit";
// import { customElement } from "lit/decorators.js";

// @customElement("nav-bar")
// export class Navbar extends LitElement {
//   public static styles = css`
// .navBar {
//   width: 100%;
//   background-color: lightgray;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .navBar ul li:first-child {
//   margin-right: auto;
// }

// .navBar img {
//   height: 40px; 
//   margin-right: 20px; 
// }

// .navBar ul {
//   width:100%;
//   display: flex;
//   list-style-type: none;
//   justify-content: flex-end;
//   padding: 0 30px;
// }

// .navBar li {
//   height: 50px;
// }

// .navBar a {
//   height: 100%;
//   padding: 0 30px;
//   text-decoration: none;
//   color: black;
//   display:flex;
//   align-items: center;
// }

// .searchBar {
//   flex-grow: 1; 
//   display: flex;
//   justify-content: center; 
//   align-items: center;
// }

// .searchBar input {
//   width: 50%; 
//   padding: 10px 30px;
//   border: 1px solid #ccc;
//   border-radius: 20px;
//   font-size: 16px;
// }

//   `;

// protected render(): TemplateResult {
//   return html`
//       <div class="container">
//           ${this.renderNavBar()}
//       </div>
//   `;
// }

//   private renderNavBar(): TemplateResult {
//     return html`
//       <nav class="navBar">
//         <ul>
//         <li><a href="#"><img src="/assets/img/logo.png"></a></li>
//         <li class="searchBar"><input type="text" placeholder="Search..."><img src="/assets/img/search.png"></li>
//           <li><a href="#"><img src="/assets/img/cart.png"></a></li>
//           <li><a href="#"><img src="/assets/img/heart.png"></a></li>
//           <li><a href="#"><img src="/assets/img/account.png"></a></li>
//         </ul>
//     </nav>
//     `;
//   }
// }