# Authentication — PakListings

How AI agents and developers obtain credentials for PakListings.

## Discover

PakListings is a public business directory. All directory content — business
listings, company profiles, professional profiles, job posts, city and
category pages, and blog guides — is public and readable without an
account, an API key, or any other credential. Start at https://www.paklistings.com/docs and
https://www.paklistings.com/llms.txt for the machine-readable map of the site.

Machine-readable auth metadata:

- Protected-resource metadata (RFC 9728): https://www.paklistings.com/.well-known/oauth-protected-resource
- Authorization-server metadata (RFC 8414): https://www.paklistings.com/.well-known/oauth-authorization-server
- Public API spec: https://www.paklistings.com/openapi.json

## Pick a method

There are only two ways to interact with PakListings:

1. **Read-only (no credentials).** Fetch any public page directly, for
   example `https://www.paklistings.com/`, `https://www.paklistings.com/businesses`,
   `https://www.paklistings.com/city/lahore/`, `https://www.paklistings.com/category/restaurants/` or
   `https://www.paklistings.com/blog/<slug>/`. The same public data is also
   available as JSON from the read-only API (`GET https://www.paklistings.com/api/v1/businesses?q=plumber&city=lahore`,
   `GET /api/v1/businesses/<slug>`, `GET /api/v1/categories`, `GET /api/v1/cities`)
   and through the MCP server (`POST https://www.paklistings.com/api/mcp`,
   tools `search_businesses`, `get_business`, `list_categories`, `list_cities`).
   No sign-in, no API key, no token, no OAuth. Reads are free, with a fair-use
   limit of 60 requests per minute per IP. This is the correct method for
   finding and reading listings.
2. **Listing-owner account (website sign-up only).** Creating or managing a
   listing requires a normal website account. There is no API key, OAuth
   provider, or programmatic token to obtain — account sign-up happens on
   the website itself (see Register below). Writes are website-only; the
   API and MCP server are read-only by design.

There is no OAuth flow for PakListings. The RFC 8414 metadata document
says this plainly: it lists no authorization endpoint and no token
endpoint, because none exists. Do not look for one, and do not send
credentials to any third party claiming to offer PakListings API access.

## Register

To list or manage a business on PakListings:

1. Go to https://www.paklistings.com/register and create a free account with your email
   address and a password.
2. Verify your email address using the link sent to your inbox.
3. Sign in at https://www.paklistings.com/login and submit your listing from
   https://www.paklistings.com/add-business (business),
   https://www.paklistings.com/add-company (company), https://www.paklistings.com/add-job (job post) or
   https://www.paklistings.com/add-professional (professional profile).
4. Choose a listing tier (see https://www.paklistings.com/pricing.md). Payment is made by
   Easypaisa, JazzCash or bank transfer, with a payment screenshot
   uploaded on the site. Your listing goes live after admin approval.

Business owners manage their listings from the website dashboard.
Agents acting for a business owner must use that owner's own signed-in
browser session — never ask for, store, or reuse the owner's password
or session.

## Claim

A business that already has a directory-created (seed) listing can claim
it: create an account at https://www.paklistings.com/register, verify your
email, and use the claim flow on the listing page. Claiming is a website
action — there is no API endpoint for it.

## Exchange

There is nothing to exchange. PakListings issues no authorization codes,
no access tokens, and no refresh tokens. Sign-in happens on the website
with email and password (Firebase Authentication, with email verification);
the session lives in the owner's browser. No token obtained anywhere can
be used against the API, because the API accepts no credentials.

## Use the access_token

There is no access token. Public reads need no `Authorization` header —
do not send one. The scopes named in the protected-resource metadata are:

- `listings:read` — public reads. No credential needed.
- `listings:write` — website-only. Requires a signed-in website account;
  no bearer token exists for it. A write attempt against the API returns
  `401` with a `WWW-Authenticate: Bearer` header pointing at the
  protected-resource metadata.

## Errors

The public API returns structured JSON errors with a code, a message, and
a resolution hint:

| Status | Code | Meaning |
| --- | --- | --- |
| 400 | `bad_request` | Invalid query parameter (for example `per_page` above 20). Fix the parameter and retry. |
| 401 | `authentication_required` | A write was attempted against the read-only API. Writes need a signed-in website account; see Register above. |
| 404 | `not_found` | No approved public business with that slug. Check the slug or search first. |
| 405 | `method_not_allowed` | Wrong HTTP method (for example GET on the MCP endpoint, which needs POST). |
| 429 | `rate_limited` | More than 60 requests in one minute from one IP. Wait for `Retry-After` seconds, then retry. |

## Use

- Read public pages directly over HTTPS, or use the read-only API / MCP
  server. No `Authorization` header is needed or accepted for public content.
- Respect `robots.txt` (https://www.paklistings.com/robots.txt) and the sitemap
  (https://www.paklistings.com/sitemap.xml).
- Cite the listing page URL you used. Do not present directory data as
  your own, and do not scrape the site in bulk — the API caps results at
  20 per page and 60 requests per minute per IP, and there is no bulk
  export endpoint.
- Questions: support@paklistings.com or https://www.paklistings.com/contact.

Last updated: 2026-11-10.
