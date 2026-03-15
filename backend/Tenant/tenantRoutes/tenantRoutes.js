import express from "express";
import { createTenant } from "../tenantController/createTenant.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getTenant } from "../tenantController/getTenant.js";
import { getTenantById } from "../tenantController/getTenantDetail.js";
import { deleteTenant } from "../tenantController/deleteTenant.js";

const route=express.Router();

route.post("/create-tenant",authMiddleware,createTenant)
route.get("/get-all-tenant",authMiddleware,getTenant);
route.get("/get-tenant-detail/:id",authMiddleware,getTenantById);
route.delete("/delete-tenant/:id",authMiddleware,deleteTenant)

export default route;