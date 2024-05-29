import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { UserService } from "../services/UserService";

@customElement("sign-up")
// signUp class inherited from litElement
export class SignUp extends LitElement {

  public static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .logo {
      height: 90px;
    }
    .signup-form {
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

  // composition from class signUp
  private _userService: UserService = new UserService();

  // encapsulation
  private _email: string = "";
  private _password: string = "";
  private _firstName: string = "";
  private _lastName: string = "";
  private _name: string = "";

  protected render(): TemplateResult {
    return html`
      <div class="navBar" id="navBar"></div>
      <div class="signup-form">
        <h2>Registreren</h2>
        <form @submit="${this.signUpForm}">

          <label for="firstName">Voornaam</label>
          <input type="text" id="firstName" name="firstName" @input="${this.handleInputChange}" required>

          <label for="lastName">Achternaam</label>
          <input type="text" id="lastName" name="lastName" @input="${this.handleInputChange}" required>

          <label for="name">Gebruikersnaam</label>
          <input type="text" id="name" name="name" @input="${this.handleInputChange}" required>

          <label for="email">Email</label>
          <input type="email" id="email" name="email" @input="${this.handleInputChange}" required>
          
          <label for="password">Wachtwoord</label>
          <input type="password" id="password" name="password" @input="${this.handleInputChange}" required>
          
          <button type="submit">Registreren</button>

          <a href="login.html">
            <p>Heeft u al een account? Log in</p> 
          </a>
        </form>
      </div>
    `;
  }

  private handleInputChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    switch (input.name) {
      case "firstName":
        this._firstName = input.value;
        break;
      case "lastName":
        this._lastName = input.value;
        break;
        case "name":
        this._name = input.value;
        break;
      case "email":
        this._email = input.value;
        break;
      case "password":
        this._password = input.value;
        break;
    }
  }

  private async signUpForm(event: Event): Promise<void> {
    event.preventDefault();
    console.log({
      email: this._email,
      password: this._password,
      firstName: this._firstName,
      lastName: this._lastName,
      name: this._name
    });
    

    const result: boolean = await this._userService.register({
      email: this._email,
      password: this._password,
      firstName: this._firstName,
      lastName: this._lastName,
      name: this._name
    });

    if (result) {
      alert("U bent geregistreerd!");
      window.location.href = "homepage.html";
    } else {
      alert("Registratie is niet gelukt!");
    }
  }
}

