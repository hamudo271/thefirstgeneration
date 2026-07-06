/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Sends a contact-form submission as an email via the Resend REST API.
 * This mirrors server/routes/contact.js (the Express/Railway backend) so the
 * exact same form works whether the site is hosted on Cloudflare Pages or Node.
 *
 * No database is involved — Resend is a plain fetch(), which runs fine on the
 * Workers runtime that powers Pages Functions.
 *
 * Required env var (set in the Pages project → Settings → Variables):
 *   RESEND_API_KEY          Resend API key
 * Optional:
 *   CONTACT_TO_EMAIL        recipient (default: dlwjdghks1107@naver.com)
 *   CONTACT_FROM_EMAIL      verified sender (default: Resend sandbox sender)
 */
import { defaults } from "../../shared/content-defaults.js";

const form = defaults.contact.form;

const labelOf = (options, value) =>
  options.find((o) => o.value === value)?.label || value || "-";

const esc = (s = "") =>
  String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function onRequestPost({ request, env }) {
  let b;
  try {
    b = await request.json();
  } catch {
    b = {};
  }
  b = b || {};

  // Honeypot: real users never fill this hidden field.
  if (b._hp) return json({ ok: true });

  // Required fields.
  const required = ["brand", "manager", "phone", "channel", "biz", "bench", "budget", "service", "reason", "goal", "source"];
  const missing = required.filter((k) => !String(b[k] || "").trim());
  if (missing.length) {
    return json({ error: `필수 항목이 누락되었습니다: ${missing.join(", ")}` }, 400);
  }
  if (!b.consent) {
    return json({ error: "개인정보 수집 및 이용에 동의해주세요." }, 400);
  }

  const RESEND_API_KEY = env.RESEND_API_KEY;
  const CONTACT_TO = env.CONTACT_TO_EMAIL || "dlwjdghks1107@naver.com";
  const CONTACT_FROM = env.CONTACT_FROM_EMAIL || "더퍼스트제너레이션 <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY not set — cannot send email.");
    return json({ error: "메일 발송이 아직 설정되지 않았습니다. 잠시 후 다시 시도해주세요." }, 503);
  }

  const rows = [
    ["브랜드명", b.brand],
    ["담당자 성함", b.manager],
    ["담당자 직책", b.position || "-"],
    ["연락처", b.phone],
    ["운영 채널 URL", b.channel],
    ["사업체 소개", b.biz],
    ["벤치마킹 채널 URL", b.bench],
    ["월 예산", labelOf(form.budgetOptions, b.budget)],
    ["원하는 서비스", labelOf(form.serviceOptions, b.service)],
    ["의뢰 이유", b.reason],
    ["유튜브 운영 이유", b.goal],
    ["유입 경로", labelOf(form.sourceOptions, b.source)],
  ];

  const html = `
    <div style="font-family:Pretendard,Apple SD Gothic Neo,Arial,sans-serif;max-width:640px;margin:0 auto;color:#0b1020">
      <h2 style="margin:0 0 16px">📩 새 프로젝트 문의</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:10px 12px;background:#f5f7fb;border:1px solid #e6e9f0;font-weight:700;white-space:nowrap;vertical-align:top;width:160px">${esc(k)}</td>
              <td style="padding:10px 12px;border:1px solid #e6e9f0;white-space:pre-wrap">${esc(v)}</td>
            </tr>`
          )
          .join("")}
      </table>
      <p style="color:#5a6478;font-size:12px;margin-top:16px">더퍼스트제너레이션 문의 폼에서 자동 전송된 메일입니다.</p>
    </div>`;

  let resp;
  try {
    resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        subject: `[문의] ${b.brand} - ${labelOf(form.serviceOptions, b.service)}`,
        html,
      }),
    });
  } catch (err) {
    console.error("[contact] Resend request failed", err);
    return json({ error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요." }, 502);
  }

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    console.error("[contact] Resend error", resp.status, detail);
    return json({ error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요." }, 502);
  }

  return json({ ok: true });
}
