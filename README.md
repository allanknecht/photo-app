# Photo App

Rails study project: user auth, image uploads, and one-time payment with Stripe.

## What's in it

- **Auth:** Devise (sign up, sign in, password reset).
- **Photos:** CRUD for images with CarrierWave. Resize to 800×800, jpg/jpeg/gif/png, max 5MB. Storage: local file in dev/test, Fog (e.g. S3) in production.
- **Payment:** On signup, a one-time $10 charge via Stripe (test mode). Card tokenization with Stripe.js.

## Setup

- Ruby and Rails (see `Gemfile`).
- `bundle install`
- `rails db:create db:migrate`
- Copy `.env.example` to `.env` and set Stripe test keys: `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`.
- Run: `rails server`

## Test payment

Use Stripe test card: **4242 4242 4242 4242**, any CVV, any future expiry.

## Main routes

- `/` — Home (project summary, plan, links).
- `/images` — List/create/edit/delete photos (requires login).
- Sign up / sign in via Devise (see navbar or home links).
