import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthorizationLevel, UserData } from "@shared/types";
import { UserLoginFormModel, UserRegisterFormModel } from "@shared/formModels";
import { orderItems } from "../fakeDatabase";
import { CustomJwtPayload, CustomJwtToken } from "../types/jwt";
import { UserHelloResponse } from "@shared/responses/UserHelloResponse";
import { IUserController } from "../interfaces/UserController";
import { IUserRepository } from "../interfaces/UserRepository";

/**
 * Handles all endpoints related to the User resource
 */
export class UserController implements IUserController{
    private _userRepository: IUserRepository;
    public constructor(
        userRepository: IUserRepository
    ) {
        this._userRepository = userRepository;
    }
    /**
     * Register a user using {@link UserRegisterFormModel}
     *
     * Returns a 200 with a message when successful.
     * Returns a 400 with a message detailing the reason otherwise.
     *
     * @param req Request object
     * @param res Response object
     */
    public async register(req: Request, res: Response): Promise<void> {
        const formModel: UserRegisterFormModel = req.body as UserRegisterFormModel;

        // TODO: Validate empty email/password/name

        // Validate if the user already exists
        const existingUser: UserData | undefined = await this._userRepository.getFromEmail(formModel.email);

        if (existingUser) {
            res.status(400).json({ message: "This email address is already used." });

            return;
        }

        // Hash the password
        const hashedPassword: string = bcrypt.hashSync(formModel.password, 10);

        const queryResult: string = await this._userRepository.add(formModel.email,hashedPassword,formModel.name,formModel.firstName,formModel.lastName);

        if (queryResult) {
            res.status(400).json({message: queryResult});
        }

        res.status(200).json({ message: "Successfully registered user." });
    }

    /**
     * Login a user using a {@link UserLoginFormModel}
     *
     * Returns a 200 with a message when successful.
     * Returns a 400 with a message detailing the reason otherwise.
     *
     * @param req Request object
     * @param res Response object
     */
    public async login(req: Request, res: Response): Promise<void> {
        const formModel: UserLoginFormModel = req.body as UserLoginFormModel;

        // TODO: Validate empty email/password

        // Retrieve user from the database
        const user: UserData | undefined = await this._userRepository.getFromEmail(formModel.email);
        if (!user) {
            res.status(400).json({ message: "User not found" });

            return;
        }

        const passwordMatch: boolean = bcrypt.compareSync(formModel.password, user.password);

        if (!passwordMatch) {
            res.status(400).json({ message: "Incorrect password" });

            return;
        }

        // Generate a JWT Token
        const payload: CustomJwtPayload = { userId: user.id , authorization: user.authorizationLevel };

        const token: string = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });
    }

    /**
     * Logout a user using a valid JWT token
     *
     * Always a returns a 200 signaling success
     *
     * @param _ Request object (unused)
     * @param res Response object
     */
    public logout(_: Request, res: Response): void {
        // TODO: Optional, but revoke the JWT Token.

        res.json({
            message: "You are logged out.",
        });
    }

    /**
     * Temporary method to return some data about a user with a valid JWT token
     *
     * Always a returns a 200 with {@link UserHelloResponse} as the body.
     *
     * @param req Request object
     * @param res Response object
     */
    public hello(req: Request, res: Response): void {
        const userData: UserData = req.user!;

        const cartItemNames: string[] | undefined = userData.cart?.map(
            (e) => orderItems.find((f) => f.id === e.id)!.title
        );

        const response: UserHelloResponse = {
            email: userData.email,
            cartItems: cartItemNames,
        };

        res.json(response);
    }

    /**
     * Add a order item to the cart of the user
     *
     * Always a returns a 200 with the total number of order items in the cart as the body.
     *
     * @param req Request object
     * @param res Response object
     */
    public addOrderItemToCart(req: Request, res: Response): void {
        const userData: UserData = req.user!;
        const id: number = parseInt(req.params.id);

        // TODO: Validation

        userData.cart ??= [];
        userData.cart.push({
            id: id,
            amount: 1,
        });

        res.json(userData.cart?.length || 0);
    }

    public requestAdminAccess(req: Request, res: Response): void {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const userToken: CustomJwtToken = req.token!;
        
        if (userToken.authorization === AuthorizationLevel.ADMIN){
            res.json("true");
            return;
        }
        res.json("false");
    }
}
