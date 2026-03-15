
import express from "express"
import { uploadPayment } from "../PaymentController/createPayment.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getAllPayments } from "../PaymentController/getAllPayment.js";
import { getPaymentByTenant } from "../PaymentController/getPaymentByTenant.js";
import { updatePaymentStatus } from "../PaymentController/updatePaymentStatus .js";
import { getPaymentsDashboard } from "../PaymentController/getPaymentsDashboard.js";
const router = express.Router();

router.post("/payment", authMiddleware, uploadPayment);
router.get("/get-all-payment",authMiddleware,getAllPayments);
router.get("/payment-by-tenant/:tenantId",authMiddleware,getPaymentByTenant);
router.patch("/update-payment-status/:id",authMiddleware,updatePaymentStatus);
router.get("/get-paid-unpaid-payment",authMiddleware,getPaymentsDashboard);

export default router;

