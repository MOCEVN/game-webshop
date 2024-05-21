import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sign-up")
export class SignUp extends LitElement {

  public static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
      text-align: center;
      color: #333;
    }
    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
    }
    input[type="text"], input[type="email"], input[type="password"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #555;
    }
  `;

  protected render(): TemplateResult {
    return html`
      <div class="container">
        <h2>Sign Up</h2>
        <form>
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
          
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
          
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    `;
  }
}
