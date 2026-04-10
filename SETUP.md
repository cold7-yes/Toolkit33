# Setup walkthrough

This guide is written for someone who has not done backend work before. Follow it top to bottom and the site will be live with a working CMS at the end.

You should have:

- A computer with Node.js 20+ installed
- A GitHub account
- A Vercel account (free tier is fine — sign in with GitHub)
- A Sanity account (free tier is fine — you'll create this in Step 1)

---

## Step 1 — Create your Sanity project

1. Go to https://sanity.io/manage and click **Create new project**
2. Sign up / log in (use Google or GitHub for the easiest path)
3. Name the project something like `automation-studio-site`
4. When asked about a dataset, accept the default name **`production`** and choose **public** read access
5. **Copy the Project ID** shown on the project dashboard — it will look like `a1b2c3d4`. You'll need this in Step 3.

That's it for now. We'll come back to add a project (the content) once the site is wired up.

---

## Step 2 — Generate a webhook secret

The site uses a shared secret to make sure only Sanity can trigger live updates. Open a terminal and run:

```bash
openssl rand -hex 32
```

You'll get a long random string. **Copy it somewhere safe** — you'll paste it twice (once into Vercel, once into Sanity).

---

## Step 3 — Local development (optional but recommended)

If you want to run the site on your laptop before deploying:

1. In the project folder, copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` in any text editor and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID="paste-your-project-id-from-step-1"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"
   SANITY_REVALIDATE_SECRET="paste-the-secret-from-step-2"
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:3000 — you should see the marketing site
5. Open http://localhost:3000/studio — log in with your Sanity account, you should see the empty CMS

If both pages load, you're good. Stop the server with `Ctrl+C`.

---

## Step 4 — Push the code to GitHub

If the repo is already on GitHub (the existing `cold7-yes/portfolio` remote), just commit and push:

```bash
git add -A
git commit -m "Rebuild as automation studio site with Sanity"
git push
```

If you want a brand new repo instead, create one on github.com and follow GitHub's instructions to push.

---

## Step 5 — Deploy on Vercel

1. Go to https://vercel.com → **Add New → Project**
2. Pick your GitHub repo
3. Vercel will detect Next.js automatically — leave the build settings as-is
4. **Before clicking Deploy**, scroll to **Environment Variables** and add these four:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | (from Step 1) |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` |
   | `SANITY_REVALIDATE_SECRET` | (from Step 2) |

5. Click **Deploy**. The first build takes 1–2 minutes.

When it's done, Vercel gives you a live URL like `https://your-project.vercel.app`.

---

## Step 6 — Set up the live-update webhook in Sanity

This is what makes content edits show up on the live site without a redeploy.

1. Go back to https://sanity.io/manage and open your project
2. Click **API** in the left sidebar → **Webhooks** → **Create webhook**
3. Fill in:
   - **Name:** `Vercel revalidation`
   - **URL:** `https://your-project.vercel.app/api/revalidate?secret=PASTE_THE_SECRET_FROM_STEP_2`
     (replace `your-project.vercel.app` with your real Vercel URL, and paste the actual secret)
   - **Dataset:** `production`
   - **Trigger on:** ✅ Create, ✅ Update, ✅ Delete
   - **Filter:** `_type == "project"`
   - **HTTP method:** `POST`
4. Save

---

## Step 7 — Add your first project

1. Open `https://your-project.vercel.app/studio`
2. Log in with your Sanity account
3. Click **Project → Create new**
4. Fill in name, industry, tools, problem, outcome, status, and upload a thumbnail
5. Click **Publish**
6. Wait ~5 seconds, then refresh the homepage — the project will appear in the **Recent work** section

If it doesn't show up:

- Check **Vercel → Project → Deployments → Functions → /api/revalidate** for logs
- In Sanity, go to **API → Webhooks → Recent activity** to see if the webhook fired and what response it got

---

## Step 8 — Customize the copy

Edit these files for the human-readable bits:

| File | What to change |
|---|---|
| `src/components/Header.tsx` | Wordmark / brand name |
| `src/components/Hero.tsx` | Headline, subhead, CTA |
| `src/components/Services.tsx` | The three service descriptions |
| `src/components/Tools.tsx` | The list of tools you actually use |
| `src/components/ContactCTA.tsx` | Your real email address (`CONTACT_EMAIL`) |
| `src/app/layout.tsx` | Browser tab title and OG metadata |

Commit and push — Vercel auto-deploys on every push to `main`.

---

## Common issues

**"Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"**
You forgot to set the env vars in Vercel (Step 5) or in `.env.local` (Step 3). Add them and redeploy.

**`/studio` shows a blank screen**
Check your browser console. Most often this means the project ID env var is wrong, or your Sanity user doesn't have access to the project.

**New project doesn't appear on the live site**
- Did the webhook fire? Check **Sanity → API → Webhooks → Recent activity**
- Did the secret match? The URL in Sanity must include the same `SANITY_REVALIDATE_SECRET` you set in Vercel
- Try waiting 30 seconds and hard-refreshing
