# Household Solutions — Website

A 6-page static site: Home, Indoor Services, Outdoor Services, Booking, How It Works, About, Contact. No backend required — ready for GitHub Pages.

## 1. Connect the form to Formspree (get an email every time someone books)

1. Go to **https://formspree.io** and sign up (free plan = 50 submissions/month).
2. Click **New Form**, name it e.g. "Household Solutions Booking", and set the email that should get notified (you can use `steveselviro@gmail.com`).
3. Formspree gives you an endpoint like `https://formspree.io/f/abc1234`.
4. Open **`booking.html`** and **`contact.html`**, find this line:
   ```html
   <form id="booking-form" data-formspree action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your real endpoint (you can use the same one for both forms, or create two separate Formspree forms if you want them to show up separately).
5. That's it — every submission emails you, and also shows up in your Formspree dashboard. The first submission from a new form needs one click to confirm it on Formspree, then it's fully live.

The form also has a **"Send via WhatsApp instead"** button, which opens WhatsApp with the form's details already typed in — so people can always reach you even if they don't want to submit online.

## 2. Add your real phone/WhatsApp/email

Open **`js/main.js`** and edit the top three lines:
```js
const WHATSAPP_NUMBER = '264812385723'; // digits only, no + or spaces
const PHONE_NUMBER = '+264 81 238 5723'; // however you want it displayed
const PHONE_TEL = '+264812385723'; // used in tel: links
```
These automatically populate every phone/WhatsApp button and link across all six pages — you only edit it in one place.

> Note: your email came through as `steveselvirogmail.com` (missing the `@`) — I've used `steveselviro@gmail.com` throughout. Double check this is right, and if not, find-and-replace it across the files.

## 3. Add real photos

Right now the site uses clean line icons instead of photos so nothing looks broken while you gather images. To add real photos:
- Take photos of your own completed jobs (best option — builds trust).
- Or grab free stock photos from **unsplash.com**, **pexels.com**, or **pixabay.com**.
- Save them into the `images/` folder, then add `<img src="images/your-photo.jpg" alt="...">` wherever you'd like — I'm happy to wire specific photos into specific spots (e.g. the hero, indoor/outdoor buttons, or each service card) once you send them or tell me which stock photos to use.

## 4. Host it on GitHub Pages

1. Create a new GitHub repository (e.g. `household-solutions-website`).
2. Upload all the files in this folder (keep the folder structure: `css/`, `js/`, `images/`, and the `.html` files) to the repo.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save — GitHub gives you a live URL like `https://yourusername.github.io/household-solutions-website/` within a minute or two.

## File overview

```
index.html          Home page
indoor.html          Indoor services + selector
outdoor.html         Outdoor services + selector
booking.html          Booking form (Formspree)
how-it-works.html    4-step process
about.html            About + values
contact.html          Contact info, map, contact form (Formspree)
css/styles.css        All styling (colors, fonts, layout)
js/icons.js           Icon set used across the site
js/main.js            Nav toggle, form logic, WhatsApp links — edit contact details here
images/                Drop your real photos in here
```
