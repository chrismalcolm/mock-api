import { Router } from "express";
import {
  addGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from "../controllers/groups";
import {
  addEndpoint,
  deleteEndpoint,
  getAllEndpoints,
  getEndpoints,
  updateEndpoint,
} from "../controllers/endpoints";
import {
  deleteStatic,
  getStatic,
  postStatic,
  putStatic,
} from "../controllers/static";

const router: Router = Router();

router.get("/static/*", getStatic);
router.post("/static/*", postStatic);
router.put("/static/*", putStatic);
router.delete("/static/*", deleteStatic);

router.get("/groups", getGroups);
router.post("/groups", addGroup);
router.put("/groups/:id", updateGroup);
router.delete("/groups/:id", deleteGroup);

router.get("/endpoints", getAllEndpoints);
router.get("/groups/:groupid/endpoints", getEndpoints);
router.post("/groups/:groupid/endpoints", addEndpoint);
router.put("/groups/:groupid/endpoints/:id", updateEndpoint);
router.delete("/groups/:groupid/endpoints/:id", deleteEndpoint);

export default router;
