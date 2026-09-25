import { Router, type IRouter } from "express";
import {
  createBooking,
  createMessage,
  createResource,
  deleteResource,
  getBootstrap,
  getDashboardSummary,
  getSettings,
  listBookings,
  listMessages,
  listResource,
  type Resource,
  updateBooking,
  updateResource,
  updateSettings,
} from "../lib/persistence";

function bodyRecord(body: unknown): Record<string, unknown> {
  return body && typeof body === "object" && !Array.isArray(body)
    ? (body as Record<string, unknown>)
    : {};
}

function isResource(value: string): value is Resource {
  return ["services", "projects", "founders", "testimonials", "faqs"].includes(value);
}

const router: IRouter = Router();

router.get("/bootstrap", async (_req, res) => {
  res.json(await getBootstrap());
});

router.get("/settings", async (_req, res) => {
  res.json(await getSettings());
});

router.patch("/settings", async (req, res) => {
  res.json(await updateSettings(bodyRecord(req.body)));
});

router.get("/dashboard/summary", async (_req, res) => {
  res.json(await getDashboardSummary());
});

router.get("/bookings", async (_req, res) => {
  res.json(await listBookings());
});

router.post("/bookings", async (req, res) => {
  res.status(201).json(await createBooking(bodyRecord(req.body)));
});

router.patch("/bookings/:id", async (req, res) => {
  const booking = await updateBooking(Number(req.params.id), bodyRecord(req.body));
  if (!booking) {
    res.status(404).json({ error: "Booking not found or status is invalid" });
    return;
  }
  res.json(booking);
});

router.get("/messages", async (_req, res) => {
  res.json(await listMessages());
});

router.post("/messages", async (req, res) => {
  res.status(201).json(await createMessage(bodyRecord(req.body)));
});

router.get("/:resource", async (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  res.json(await listResource(req.params.resource));
});

router.post("/:resource", async (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  res.status(201).json(await createResource(req.params.resource, bodyRecord(req.body)));
});

router.patch("/:resource/:id", async (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  const item = await updateResource(
    req.params.resource,
    Number(req.params.id),
    bodyRecord(req.body),
  );
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(item);
});

router.delete("/:resource/:id", async (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  const deleted = await deleteResource(req.params.resource, Number(req.params.id));
  if (!deleted) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(204).send();
});

export default router;