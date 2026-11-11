# Portfolio handoff rules

## Scope and safety

- Base repository: `arnixs115/my_pofol`. Work on a `feature/*` branch; never overwrite or force-push `main`.
- After the approved integration, use the latest `origin/main` as the baseline for subsequent content work. The owner explicitly approved merging `feature/integrate-ai-portfolio` and its automatic Pages deployment on 2026-11-09; this is not blanket approval for future deployments.
- Do not deploy, merge, run the Pages workflow manually, or change its trigger without explicit owner approval. A push to main deploys automatically.
- Preserve BR-A story/growth statistics, updater, Protein GO Explorer, public documents, static export and `NEXT_PUBLIC_BASE_PATH` support.
- Before editing on another PC: fetch, inspect branch/status, and pull with `--ff-only`. Do not reset or discard another PC's work.
- Read `docs/PROGRESS.md` and `docs/CONTENT_SOURCES.md` before continuing. Update progress with changes, exact validation results and remaining questions at each handoff.

## Content

- Project data lives in `data/projects.ts`; cards, skills, experience and static detail routes consume it.
- Additional ALEPH projects live in `data/additional-projects.json`; preserve the AI-assisted personal-work statement and provided-starter boundaries. Group every slug once in `data/project-groups.json`.
- Use `docs/PROJECT_PERIODS.md` for observed planning/commit dates; do not label observed latest activity as a release, official course end or verified completion.
- The master resume has 4 pages and experience document 9. `tools/create_resume.cjs` selects exactly 3 projects for a 2-page application draft. Keep generated company drafts outside the repository or in ignored `private/`; retain role, AI usage and verification limits.
- The master resume must include separate named sections for every catalog entry and the BR-A project. Maintain `data/resume-coverage.json`; `tools/check_documents.py` checks this against the project groups. Selected two-page application drafts intentionally contain only the chosen projects.
- Every claim needs a public source. Distinguish personal work, team features, team results, attempted methods and unverified information.
- Never invent roles, dates, scores, links or proficiency percentages. Preserve the documented source conflicts until the owner provides evidence.
- For team projects, keep the optional team overview/pipeline/result separate from personal role/actions. Do not move team infrastructure or models into personal skills. Movie-review remains personal development/submission with shared study, not a joint team submission.
- Do not publish raw rituals, teammate details, private reports, secrets, phone numbers or home addresses. The existing public contact email is the only approved email.
- Do not add databases, analytics, AI APIs or runtime secrets to this static portfolio.

## Commands

Node.js 22+, npm and Python 3.10+ (`python` or your local Python executable):

```sh
npm ci
npm run build
npm run typecheck
node --test public/protein-go/tests/core.test.cjs
python updater/verify.py
python -m pip install -r tools/requirements.txt
python tools/check_documents.py
python tools/audit.py
python tools/check_export.py
```

Repeat build/export checks with `NEXT_PUBLIC_BASE_PATH=/my_pofol`. PowerShell: `$env:NEXT_PUBLIC_BASE_PATH='/my_pofol'`; remove with `Remove-Item Env:NEXT_PUBLIC_BASE_PATH` for root builds. Do not commit `out/`, `.next/`, dependencies or local input.

Browser review should include home sections, project list, every detail, keyboard navigation, phone width, documents and Explorer. Record limitations honestly. External links require a separate online reachability check; the export checker validates local references and fragments only.

For resume/experience updates, edit the `.md` sources, install `tools/document-requirements.txt`, and run `python tools/build_documents.py`. Render and inspect every PDF page before committing the Markdown and PDF together. `tools/check_documents.py` checks source text, page counts and PDF hyperlinks; it does not replace visual review. Korean fonts are detected on Windows or supplied with `--font-regular` and `--font-bold`.

In the experience document, every project's metadata uses four separate rows in this order: 기간, 소속·형태, 역할, 기술. Keep titles free of date suffixes and keep the role summary short; preserve detailed contributions and attempted methods in the body. Retain observed-date qualifications and AI-assisted work boundaries. Metadata must not wrap mid-word or split across pages.

In each team project's introduction, put the team-wide work and the applicant's own contribution in separate paragraphs, with a blank Markdown line before the personal contribution.
