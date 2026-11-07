# chrd-features

Private TestFlight explainer site for CHRD (GitHub Pages).

- Root URL is intentionally blank.
- Share only the long path link from local `SHARE_URL.txt` (not committed).
- Videos are `.mp4` under the obscure folder.

## Publish

```bash
git add -A && git commit -m "Publish TF explainer" && git push
```

GitHub **Settings → Pages → Build and deployment** must use **GitHub Actions** (workflow `Deploy getchrd.com`). Do not trigger legacy Jekyll builds in parallel — overlapping deploys hit the 10-minute sync timeout.

Overview: `/high-level-features/` · Walkthrough: `/high-level-features/how-it-works.html`
