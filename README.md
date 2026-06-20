# GAK / GAC Calendar Feed

This little repo hosts two things at fixed web addresses:

- **`events.js`** — the shared list of all classes and events (one source of truth).
- **`gak-classes.ics`** — a live calendar feed built automatically from `events.js`.

Anyone who subscribes to the feed (your admin team, or families) gets every dated class in their own Google or Apple calendar, and it updates on its own when you change `events.js`. No third-party calendar service needed.

---

## What's in here

| File | What it is |
|---|---|
| `events.js` | The master event list. **This is the only file you edit.** |
| `build-ics.js` | Turns `events.js` into `gak-classes.ics`. Runs automatically, never by hand. |
| `.github/workflows/build-calendar.yml` | The robot that rebuilds + republishes the feed on every change. |
| `gak-classes.ics` | Generated automatically. Don't edit it. |

---

## One-time setup (about 10 minutes)

1. **Make a GitHub account** at github.com if you don't have one (free).
2. **Create a new repository** — click the **+** (top right) → **New repository**. Name it something like `gak-calendar`. Set it to **Public**. Click **Create repository**.
3. **Upload these files.** On the new repo page click **uploading an existing file**, then drag in `events.js`, `build-ics.js`, and `README.md`. 
   - The workflow file lives in a folder, so it's easiest to drag the whole `.github` folder in too. (If GitHub won't take the folder, create the path by typing `.github/workflows/build-calendar.yml` as the filename when you add a new file, then paste the contents in.)
   - Click **Commit changes**.
4. **Turn on Pages.** Go to the repo's **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**. (You don't pick a branch; the workflow handles it.)
5. **Let it run.** Go to the **Actions** tab. You'll see "Build calendar feed" running. When it finishes (green check), your files are live.

Your two web addresses are now (replace `YOURNAME` and `gak-calendar`):

```
Shared data:    https://YOURNAME.github.io/gak-calendar/events.js
Calendar feed:  https://YOURNAME.github.io/gak-calendar/gak-classes.ics
```

**Send me those two URLs** and I'll wire the homepage carousel and the email/media builders to read `events.js`, so everything runs off this one file.

---

## Subscribing to the calendar (the team)

This is the part that auto-syncs. Give people the **`webcal://`** version of the feed URL — it tells the calendar app to subscribe (and keep checking for updates) instead of doing a one-time import:

```
webcal://YOURNAME.github.io/gak-calendar/gak-classes.ics
```

- **Google Calendar:** Other calendars → **+** → **From URL** → paste the `https://…/gak-classes.ics` address → Add. Google rechecks it roughly once a day.
- **Apple Calendar (Mac):** File → **New Calendar Subscription** → paste the `webcal://…` address. You can set how often it refreshes.
- **iPhone:** Settings → Calendar → Accounts → Add Account → **Other** → **Add Subscribed Calendar** → paste the `webcal://…` address.

Once subscribed, anything you change in `events.js` shows up on their calendar at the next refresh. They never re-subscribe.

> Tip: a one-time **import** (the "Subscribe to all classes" button in the events tool, which downloads the `.ics`) is different — it's a snapshot that won't update. For the team, use the `webcal://` **subscription** above so it stays current.

---

## Editing events later

Open `events.js` on GitHub, click the pencil ✏️ to edit, change the list, and **Commit changes**. That's it — the robot rebuilds `gak-classes.ics`, republishes, and subscribers pick it up on their next refresh. The field guide for every option lives in the comments at the top of `events.js` and in `gak-events-calendar.html`.

---

## Other free hosts

GitHub Pages is the simplest because the rebuild robot is built in. Netlify and Cloudflare Pages also work — connect the same repo and they'll deploy it — but the auto-rebuild step is set up for GitHub Actions here. If you'd rather use one of those, tell me and I'll adjust.
