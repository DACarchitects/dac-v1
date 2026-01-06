import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation
 * Receives notifications from WordPress when content changes
 * and revalidates the entire site.
 */

export async function POST(request: NextRequest) {
  const reqContentType = request.headers.get("content-type") || "";
  let body: any = {};

  if (reqContentType.includes("application/json")) {
    body = await request.json().catch(() => ({}));
  } else if (
    reqContentType.includes("application/x-www-form-urlencoded") ||
    reqContentType.includes("multipart/form-data")
  ) {
    const fd = await request.formData().catch(() => null);
    if (fd) body = Object.fromEntries(fd.entries());
  } else {
    body = await request.json().catch(() => ({}));
  }

  const headerSecret =
    request.headers.get("x-webhook-secret") ||
    request.headers.get("x_webhook_secret") ||
    request.headers.get("x-nextjs-revalidate-secret") ||
    null;

  const auth = request.headers.get("authorization");
  const bearerSecret = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  const urlSecret =
    request.nextUrl.searchParams.get("secret") ||
    request.nextUrl.searchParams.get("webhook_secret") ||
    request.nextUrl.searchParams.get("token");

  const bodySecret =
    body.secret ||
    body.webhookSecret ||
    body.webhook_secret ||
    body.WORDPRESS_WEBHOOK_SECRET ||
    body.token ||
    null;

  const secret = headerSecret || bearerSecret || urlSecret || bodySecret;

  const expected = (process.env.WORDPRESS_WEBHOOK_SECRET || "").trim();
  const received = (secret || "").trim();

  console.log("Revalidate request meta", {
    reqContentType,
    hasHeaderSecret: !!headerSecret,
    hasBearerSecret: !!bearerSecret,
    hasUrlSecret: !!urlSecret,
    hasBodySecret: !!bodySecret,
    gotLen: received.length || null,
    envLen: expected.length || null,
    bodyKeys: Object.keys(body || {}).slice(0, 20),
  });

  if (!received || received !== expected) {
    return NextResponse.json(
      { message: "Invalid webhook secret" },
      { status: 401 }
    );
  }

  const { contentType: wpContentType, contentId } = body;

  // allow "test connection" / ping requests
  if (!wpContentType) {
    return NextResponse.json({
      revalidated: true,
      message: "Webhook connected (no contentType provided)",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    console.log(
      `Revalidating content: ${wpContentType}${
        contentId ? ` (ID: ${contentId})` : ""
      }`
    );

    // Revalidate specific content type tags
    revalidateTag("wordpress", { expire: 0 });

    if (wpContentType === "post") {
      revalidateTag("posts", { expire: 0 });
      if (contentId) {
        revalidateTag(`post-${contentId}`, { expire: 0 });
      }
      // Clear all post pages when any post changes
      revalidateTag("posts-page-1", { expire: 0 });
    } else if (wpContentType === "category") {
      revalidateTag("categories", { expire: 0 });
      if (contentId) {
        revalidateTag(`posts-category-${contentId}`, { expire: 0 });
        revalidateTag(`category-${contentId}`, { expire: 0 });
      }
    } else if (wpContentType === "tag") {
      revalidateTag("tags", { expire: 0 });
      if (contentId) {
        revalidateTag(`posts-tag-${contentId}`, { expire: 0 });
        revalidateTag(`tag-${contentId}`, { expire: 0 });
      }
    } else if (wpContentType === "author" || wpContentType === "user") {
      revalidateTag("authors", { expire: 0 });
      if (contentId) {
        revalidateTag(`posts-author-${contentId}`, { expire: 0 });
        revalidateTag(`author-${contentId}`, { expire: 0 });
      }
    }

    // Also revalidate the entire layout for safety
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated ${wpContentType}${
        contentId ? ` (ID: ${contentId})` : ""
      } and related content`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating path:", error);
    return NextResponse.json(
      {
        revalidated: false,
        message: "Failed to revalidate site",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
