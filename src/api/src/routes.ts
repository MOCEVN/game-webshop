import { Router } from "express";
import { handleTokenBasedAuthentication } from "./middlewares/authenticationMiddleware";
import { UserController } from "./controllers/UserController";
import { OrderItemController } from "./controllers/OrderItemController";
import asyncHandler from "express-async-handler";

export const router: Router = Router();

const userController: UserController = new UserController();
const orderItemController: OrderItemController = new OrderItemController();

router.get("/", (_, res) => {
    res.send("Hello, this is a simple webshop API.");
});

router.post("/users/register", asyncHandler(async (req, res) => userController.register(req, res)));
router.post("/users/login", asyncHandler(async (req, res) => userController.login(req, res)));

router.get("/store-content/all", asyncHandler(orderItemController.getAllSortedFiltered));
router.get("/orderItems", asyncHandler(orderItemController.getAll));

// NOTE: Everything after this point only works with a valid JWT token!
router.use(handleTokenBasedAuthentication());

router.get("/users/logout", (req, res) => userController.logout(req, res));
router.get("/users/hello", (req, res) => userController.hello(req, res));
router.post("/users/cart/:id", (req, res) => userController.addOrderItemToCart(req, res));
router.get("/users/admin", (req, res) => userController.requestAdminAccess(req, res));
router.post("/store-content/admin/add",asyncHandler(orderItemController.adminAdd));
router.post("/store-content/admin/add-json",asyncHandler(orderItemController.adminAddJson));

