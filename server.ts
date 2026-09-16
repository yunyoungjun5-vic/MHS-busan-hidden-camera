import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || "hyjjoo@naver.com";

const ALLOWED_STAGES = [
  "경찰 조사 전",
  "경찰 조사 진행 중",
  "검찰 송치",
  "검찰 수사 중",
  "기소 후 재판 준비",
  "재판 진행 중",
  "항소심 진행 중",
  "기타"
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Basic in-memory rate limiting map: IP -> Array of timestamps
  const rateLimitMap = new Map<string, number[]>();

  // API Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
      const now = Date.now();
      const windowMs = 10 * 60 * 1000; // 10 minutes
      const maxRequests = 5;

      const timestamps = (rateLimitMap.get(clientIp) || []).filter((t) => now - t < windowMs);
      if (timestamps.length >= maxRequests) {
        return res.status(429).json({
          success: false,
          message: "너무 많은 상담 신청이 요청되었습니다. 잠시 후 다시 시도해 주세요."
        });
      }
      timestamps.push(now);
      rateLimitMap.set(clientIp, timestamps);

      const { name, phone, caseStage, stage, message, website, privacyConsent } = req.body;

      // 1. Honeypot check for bots
      if (website && website.trim() !== "") {
        // Silently fake success for spam bots
        return res.status(200).json({ success: true, message: "상담 신청이 완료되었습니다." });
      }

      // 2. Privacy consent validation
      if (!privacyConsent) {
        return res.status(400).json({
          success: false,
          message: "개인정보 수집 및 이용에 동의하셔야 상담 신청이 가능합니다."
        });
      }

      // 3. Form validations
      const rawStage = caseStage || stage;
      const validStage = ALLOWED_STAGES.includes(rawStage) ? rawStage : "기타";

      const cleanedPhone = (phone || "").trim();
      const phoneDigits = cleanedPhone.replace(/\D/g, "");
      if (!cleanedPhone || phoneDigits.length < 8) {
        return res.status(400).json({
          success: false,
          message: "올바른 연락처(전화번호)를 입력해 주세요."
        });
      }

      const trimmedMessage = (message || "").trim();
      if (!trimmedMessage || trimmedMessage.length < 5) {
        return res.status(400).json({
          success: false,
          message: "상담 문의 내용을 최소 5자 이상 작성해 주세요."
        });
      }

      const displayName = (name || "").trim() || "익명";

      // Date formatting (KST)
      const dateObj = new Date();
      const nowFormatted = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(dateObj);

      const referer = req.headers["referer"] || req.headers["origin"] || "https://부산불법촬영심리상담센터.kr";

      // Prepare email content
      const emailSubject = `[상담신청] ${validStage} / ${displayName}`;

      const plainTextContent = `부산불법촬영·카촬죄 재범방지 심리상담센터
새로운 상담 신청이 접수되었습니다.

────────────────────────

■ 성명 / 닉네임
${displayName}

■ 연락처
${cleanedPhone}

■ 현재 사건 단계
${validStage}

■ 상담 문의 내용
${trimmedMessage}

────────────────────────

접수 일시
${nowFormatted}

접수 페이지
${referer}

────────────────────────

부산불법촬영·카촬죄 재범방지 심리상담센터
웹사이트 상담 신청`;

      const htmlContent = `<div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
  <h2 style="color: #1E4D33; margin-top: 0; font-size: 20px;">부산불법촬영·카촬죄 재범방지 심리상담센터</h2>
  <p style="color: #4a5568; font-size: 15px; margin-bottom: 24px;">새로운 상담 신청이 접수되었습니다.</p>
  <hr style="border: none; border-top: 1px solid #edf2f7; margin: 20px 0;" />
  <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #2d3748;">
    <tr>
      <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #1A202C;">■ 성명 / 닉네임</td>
      <td style="padding: 10px 0;">${escapeHtml(displayName)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; font-weight: bold; color: #1A202C;">■ 연락처</td>
      <td style="padding: 10px 0;"><a href="tel:${escapeHtml(cleanedPhone)}" style="color: #1E4D33; font-weight: bold; text-decoration: none;">${escapeHtml(cleanedPhone)}</a></td>
    </tr>
    <tr>
      <td style="padding: 10px 0; font-weight: bold; color: #1A202C;">■ 현재 사건 단계</td>
      <td style="padding: 10px 0; font-weight: bold; color: #1E4D33;">${escapeHtml(validStage)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; font-weight: bold; color: #1A202C; vertical-align: top;">■ 상담 문의 내용</td>
      <td style="padding: 10px 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(trimmedMessage)}</td>
    </tr>
  </table>
  <hr style="border: none; border-top: 1px solid #edf2f7; margin: 20px 0;" />
  <p style="font-size: 12px; color: #a0aec0; margin: 4px 0;">접수 일시: ${escapeHtml(nowFormatted)}</p>
  <p style="font-size: 12px; color: #a0aec0; margin: 4px 0;">접수 페이지: ${escapeHtml(String(referer))}</p>
  <hr style="border: none; border-top: 1px solid #edf2f7; margin: 20px 0;" />
  <p style="font-size: 11px; color: #cbd5e0; text-align: center; margin-bottom: 0;">부산불법촬영·카촬죄 재범방지 심리상담센터 웹사이트 상담 신청</p>
</div>`;

      // Setup Nodemailer transporter
      const smtpHost = process.env.SMTP_HOST || "smtp.naver.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const smtpSecure = process.env.SMTP_SECURE !== "false";
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        console.error("[Email API Error]: SMTP_USER or SMTP_PASS environment variables are missing.");
        return res.status(500).json({
          success: false,
          message: "이메일 발송 설정(SMTP_USER, SMTP_PASS)이 설정되지 않았습니다. AI Studio 상단 [Settings] -> [Environment Variables]에서 네이버 ID와 비밀번호를 입력해 주세요."
        });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: smtpUser ? `"부산불법촬영심리상담센터" <${smtpUser}>` : `"부산불법촬영심리상담센터" <noreply@substancelab.kr>`,
        to: TARGET_EMAIL,
        subject: emailSubject,
        text: plainTextContent,
        html: htmlContent,
        replyTo: smtpUser || TARGET_EMAIL
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "상담 신청이 성공적으로 전달되었습니다."
      });
    } catch (error: any) {
      // Avoid printing sensitive user data in logs
      console.error("[Email API Error]:", error?.message || error);
      return res.status(500).json({
        success: false,
        message: "상담 신청을 전송하지 못했습니다. 잠시 후 다시 시도해 주세요."
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
