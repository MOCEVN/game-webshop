import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { UserService } from "../services/UserService";

@customElement("login-form")
export class LoginForm extends LitElement {
  
  public static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .logo {
      height: 90px;
    }
    .login-form {
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
    input[type="email"], input[type="password"] {
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

  private _userService: UserService = new UserService();

  private _email: string = "";
  private _password: string = "";

  protected render(): TemplateResult {
    return html`
      <div class="navBar" id="navBar"></div>
      <div class="login-form">
        <h2>Inloggen</h2>
        <form @submit="${this.loginForm}">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" @input="${this.handleInputChange}" required>

          <label for="password">Wachtwoord</label>
          <input type="password" id="password" name="password" @input="${this.handleInputChange}" required>
          
          <button type="submit">Inloggen</button>

          <a href="signup.html">
            <p>Heeft u nog geen account? Registreer</p> 
          </a>
        </form>
      </div>
    `;
  }

  private async loginForm(event: Event): Promise<void> {
    event.preventDefault();

    const result: boolean = await this._userService.login({
      email: this._email,
      password: this._password,
    });

    if (result) {
      alert("U bent ingelogd!");
      window.location.href = "/";
    } else {
      alert("Inloggen is niet gelukt!");
    }
  }

  private handleInputChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    switch (input.name) {
      case "email":
        this._email = input.value;
        break;
      case "password":
        this._password = input.value;
        break;
    }
  }
  
}
