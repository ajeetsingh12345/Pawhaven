const MAX_BODY_BYTES = 16 * 1024;
const RECIPIENT = "ak8271691@gmail.com";

function respond(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

export default async function sendEnquiry(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return respond(res, 405, { error: "Method not allowed." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return respond(res, error.statusCode || 400, {
      error:
        error.statusCode === 413
          ? error.message
          : "Please submit a valid enquiry form.",
    });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return respond(res, 400, { error: "Please submit a valid enquiry form." });
  }

  const name = text(body.name);
  const phone = text(body.phone);
  const email = text(body.email);
  const area = text(body.area);
  const message = text(body.message);
  const puppyName = text(body.puppyName).replace(/[\r\n]/g, " ");
  const puppyBreed = text(body.puppyBreed).replace(/[\r\n]/g, " ");
  const phoneDigits = phone.replace(/\D/g, "");

  if (name.length < 2 || name.length > 100) {
    return respond(res, 400, {
      error: "Enter your name (2 to 100 characters).",
    });
  }
  if (
    phoneDigits.length < 8 ||
    phoneDigits.length > 15 ||
    !/^[+()\d\s.-]+$/.test(phone)
  ) {
    return respond(res, 400, {
      error: "Enter a phone number with its country code.",
    });
  }
  if (
    email.length > 254 ||
    (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return respond(res, 400, { error: "Enter a valid email address." });
  }
  if (area.length > 120 || message.length > 1000) {
    return respond(res, 400, { error: "Some enquiry details are too long." });
  }
  if (
    !puppyName ||
    puppyName.length > 100 ||
    !puppyBreed ||
    puppyBreed.length > 120
  ) {
    return respond(res, 400, {
      error: "The selected puppy details are invalid.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return respond(res, 503, {
      error:
        "Direct email delivery isn't configured yet. Use the email draft below or contact us on WhatsApp.",
    });
  }

  const emailText = [
    "New PawHaven puppy enquiry",
    "",
    `Puppy: ${puppyName} (${puppyBreed})`,
    `Name: ${name}`,
    `Phone or WhatsApp: ${phone}`,
    `Email: ${email || "Not provided"}`,
    `Area: ${area || "Not provided"}`,
    "",
    "Message:",
    message || "No additional message.",
  ].join("\n");

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: email || undefined,
        subject: `Puppy enquiry: ${puppyName} (${puppyBreed})`,
        text: emailText,
      }),
    });

    if (!providerResponse.ok) {
      console.error(
        `Resend email request failed with status ${providerResponse.status}.`,
      );
      return respond(res, 502, {
        error:
          "We couldn't send your enquiry right now. Please try WhatsApp or try again later.",
      });
    }

    return respond(res, 200, { ok: true });
  } catch (error) {
    console.error(
      "Resend email request failed.",
      error instanceof Error ? error.message : "Unknown network error.",
    );
    return respond(res, 502, {
      error:
        "We couldn't send your enquiry right now. Please try WhatsApp or try again later.",
    });
  }
}
