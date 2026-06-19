import { NextResponse } from "next/server";
import fs   from "fs";
import path from "path";

/**
 * GET /api/resume — streams the resume PDF for download.
 * Internal file path is never exposed to the client.
 */
export function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/content/resume/resume.pdf");
    const file     = fs.readFileSync(filePath);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": 'attachment; filename="Heramb-Chaudhari-Resume.pdf"',
        "Content-Length":      String(file.byteLength),
        "Cache-Control":       "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse("Resume unavailable.", { status: 404 });
  }
}
