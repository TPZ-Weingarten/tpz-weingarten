# Therapiezentrum Untere Breite Weingarten – Website

Statische Website für [www.tpz-weingarten.de](https://www.tpz-weingarten.de), gebaut mit [Astro](https://astro.build).
Bei jedem Push auf `main` baut GitHub Actions die Seite und veröffentlicht sie über GitHub Pages.

## Inhalte bearbeiten

Alle Inhalte liegen als Markdown (`.md`) oder YAML (`.yaml`) im Ordner `src/`. Sie können direkt im
GitHub-Web-Editor bearbeitet werden (Datei öffnen → Stift-Symbol → „Commit changes“). Nach ein bis zwei Minuten
ist die Änderung online.

| Was | Datei |
| --- | --- |
| Adresse, Telefon, E-Mail, Social Media, Menü | `src/data/site.yaml` |
| Sprechzeiten / Öffnungszeiten | `src/data/hours.yaml` |
| Team (Reihenfolge = Anzeige) | `src/data/team.yaml`, Fotos in `src/assets/img/team/` |
| Startseite (Texte, Kacheln, Teaser) | `src/content/pages/index.md` |
| Behandlungskonzept, Sprechzeiten, Über uns, Kontakt, Impressum, Datenschutz | `src/content/pages/*.md` |
| Therapiespektrum (eine Datei pro Leistung) | `src/content/leistungen/*.md` |
| Stellenanzeigen (eine Datei pro Stelle) | `src/content/jobs/*.md` |
| Downloads (z. B. Stellenanzeige als Bild/PDF) | `public/downloads/` |

### Aufbau einer Markdown-Datei

Oben steht zwischen `---` der sogenannte Frontmatter mit Titel, Bild usw., darunter der Text:

```markdown
---
title: Manuelle Lymphdrainage
order: 50                       # Reihenfolge auf der Seite
image: content/lymphdrainage.jpg # Pfad relativ zu src/assets/img
---

Normaler Absatz. **Fett**, *kursiv*, [Link](https://example.com).

## Zwischenüberschrift

- Aufzählungspunkt
- Noch einer
```

Tipps:

- **Neue Leistung:** Datei in `src/content/leistungen/` anlegen. Der Dateiname wird zum Sprunganker
  (z. B. `hausbesuche.md` → `/therapiespektrum#hausbesuche`). Leistungen ohne Text erscheinen in der
  Liste „Außerdem bieten wir“.
- **Stelle ausblenden:** in der Job-Datei `active: false` setzen. Gibt es keine aktive Stelle, zeigt
  `/jobs` den Text aus `src/content/pages/jobs.md`.
- **Bilder:** in `src/assets/img/…` ablegen und mit dem Pfad darunter referenzieren (z. B. `hero/team.jpg`).
  Astro verkleinert und konvertiert sie beim Build automatisch. Ein falscher Pfad lässt den Build mit einer
  klaren Fehlermeldung fehlschlagen – die Live-Seite bleibt dann unverändert.
- Doppelpunkte im Frontmatter-Text in Anführungszeichen setzen: `subtitle: "Standort: Weingarten"`.

## Lokal entwickeln

Voraussetzung: Node.js ≥ 22.22

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # erzeugt dist/
npm run preview   # dist/ lokal ansehen
```

## Hosting (GitHub Pages)

Einmalig im Repository: **Settings → Pages → Build and deployment → Source: „GitHub Actions“**.

Der Workflow `.github/workflows/deploy.yml` veröffentlicht die Seite standardmäßig unter
`https://<owner>.github.io/<repo>/`. Der Unterpfad wird über `BASE_PATH` automatisch gesetzt.

### Umzug auf www.tpz-weingarten.de

1. Datei `public/CNAME` mit dem Inhalt `www.tpz-weingarten.de` anlegen.
2. Repository-Variablen setzen (Settings → Secrets and variables → Actions → Variables):
   `SITE_URL` = `https://www.tpz-weingarten.de`, `BASE_PATH` = `/`.
3. DNS beim Domain-Anbieter: `www` als CNAME auf `<owner>.github.io`; für die Apex-Domain
   `tpz-weingarten.de` A-Records auf die GitHub-Pages-IPs (siehe
   [GitHub-Doku](https://docs.github.com/de/pages/configuring-a-custom-domain-for-your-github-pages-site)).
4. In Settings → Pages die Domain eintragen und „Enforce HTTPS“ aktivieren.

Die alten Weiterleitungen von `physio-s7.de` und `physio-m7.de` (bisher per `.htaccess`) müssen beim
Domain-Anbieter als Weiterleitung eingerichtet werden – GitHub Pages kann das nicht.
