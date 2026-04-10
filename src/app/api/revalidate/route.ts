import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * Sanity webhook target. When a `caseStudy` or `testimonial` document is
 * created/updated/deleted, Sanity calls this endpoint and we mark both
 * cache tags expired so the next request rebuilds the affected sections.
 *
 * Configure the webhook in Sanity → API → Webhooks with:
 *   URL:    https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Filter: _type in ["caseStudy", "testimonial"]
 *   HTTP:   POST
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json(
      { revalidated: false, error: "Server is missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 },
    );
  }

  // expire: 0 forces immediate expiration — appropriate for webhook-driven
  // invalidation where we want the next visitor to see fresh content.
  revalidateTag("caseStudies", { expire: 0 });
  revalidateTag("testimonials", { expire: 0 });

  return Response.json({ revalidated: true, now: Date.now() });
}
