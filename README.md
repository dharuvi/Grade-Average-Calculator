# Grade Average Calculator

CMPS 510 final project (Project 8). Add courses with a grade, see the average and letter grade, delete a course.

## Tools and AI use
- Plain HTML, CSS and JavaScript, hosted on GitHub Pages.
- AI assistant used: [name the assistant(s) you used]. I reviewed the code and can explain it.

## CI (Week 11 lab)
`.github/workflows/ci.yml` runs on every push to `main` and on every pull request:
1. Check out the code
2. Set up Node.js 20
3. Build check: `npm run build` (syntax check of `grade.js`)
4. Automated tests: `npm test` (Node's built-in test runner, no dependencies)

If any test fails, the job fails and the commit shows a red X.

## Deployment and infrastructure assumptions
- Static site only: no server, database or sign-in, so nothing to scale or patch.
- GitHub Pages serves the files over HTTPS from the `main` branch.
- Any saved data would live in the visitor's browser (localStorage), not on a server.
- CI uses GitHub-hosted Ubuntu runners; no secrets or paid services are needed.
- Rollback = revert the commit on `main`; Pages redeploys automatically.

## Monitoring and feedback signals
| Signal | Where I see it | What it tells me |
|---|---|---|
| CI status (pass/fail) | Actions tab, status on each commit | A change broke the calculator logic |
| Live page loads | Open the Pages URL after each deploy | Deployment worked |
| Pages deployment status | Settings → Pages / Actions "pages build" | Publishing failed |
| User feedback | GitHub Issues | Wrong averages, confusing input errors |
