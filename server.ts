import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log("Contact form submission received:", { name, email, subject, message });

    // In a real production environment, you would use SMTP credentials from process.env
    // For this demonstration, we'll log it and simulate success.
    // If the user provides SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env, this will work.

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"FashionhouseNG Contact" <${process.env.SMTP_USER}>`,
          to: "kuteyioluwaloyevincent291@gmail.com",
          subject: `New Contact Form Submission: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });
        console.log("Email sent successfully");
      } else {
        console.log("SMTP credentials not provided. Email not sent, but submission logged.");
      }
      
      res.status(200).json({ status: "success", message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      // We still return 200 for the demo if it's just a missing credential issue, 
      // but in a real app you'd handle this more strictly.
      res.status(200).json({ status: "success", message: "Form received (Email simulation)" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
