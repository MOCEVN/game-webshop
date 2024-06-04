import { Router } from "express";
import { handleTokenBasedAuthentication } from "./middlewares/authenticationMiddleware";
import { UserController } from "./controllers/UserController";
import { OrderItemController } from "./controllers/OrderItemController";
import asyncHandler from "express-async-handler";
import { UserRepository } from "./repositories/UserRepository";
import { OrderItemRepository } from "./repositories/OrderItemRepository";

export const router: Router = Router();

const userController: UserController = new UserController(new UserRepository());
const orderItemController: OrderItemController = new OrderItemController(new OrderItemRepository());

router.get("/", (_, res) => {
    res.send("Hello, this is a simple webshop API.");
});

router.post("/users/register", asyncHandler(userController.register.bind(userController)));
router.post("/users/login", asyncHandler(userController.login.bind(userController)));

router.get("/store-content/all", asyncHandler(orderItemController.getAllWithParameters.bind(orderItemController)));
router.get("/store-content/all/:id", asyncHandler(orderItemController.getProduct.bind(orderItemController)));
router.get("/orderItems", asyncHandler(orderItemController.getAll.bind(orderItemController)));

router.get("(await response.json()) as OrderItem[]");

// NOTE: Everything after this point only works with a valid JWT token!
router.use(handleTokenBasedAuthentication());

router.get("/users/logout", (req, res) => userController.logout(req, res));
router.get("/users/hello", (req, res) => userController.hello(req, res));
router.post("/users/cart/:id", (req, res) => userController.addOrderItemToCart(req, res));
router.get("/users/admin", (req, res) => userController.requestAdminAccess(req, res));
router.post("/store-content",asyncHandler(orderItemController.add.bind(orderItemController)));

