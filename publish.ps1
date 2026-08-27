# =============================================================================
#  publish.ps1 — puts this site on GitHub Pages.
#
#  Run it from this folder:   .\publish.ps1
#
#  It will sign you in to GitHub (a browser window opens), create a PUBLIC
#  repo called "portfolio", push the site, turn on GitHub Pages, and print
#  your live URL.
#
#  Safe to re-run: if the repo already exists, it just pushes your changes.
# =============================================================================

Set-Location $PSScriptRoot

# --- Find the GitHub CLI -----------------------------------------------------
$gh = "gh"
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    $candidate = Join-Path $env:ProgramFiles "GitHub CLI\gh.exe"
    if (Test-Path $candidate) {
        $gh = $candidate
    } else {
        Write-Host "GitHub CLI not found. Install it with:" -ForegroundColor Red
        Write-Host "  winget install --id GitHub.cli"
        exit 1
    }
}

# --- 1. Sign in --------------------------------------------------------------
& $gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "== Signing in to GitHub ==" -ForegroundColor Cyan
    Write-Host "Choose: GitHub.com  ->  HTTPS  ->  Login with a web browser"
    Write-Host "Then paste the one-time code into the page that opens."
    Write-Host ""
    & $gh auth login --web --git-protocol https --hostname github.com
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Sign-in did not complete. Nothing was published." -ForegroundColor Red
        exit 1
    }
}

$user = (& $gh api user --jq .login)
if (-not $user) {
    Write-Host "Could not read your GitHub username." -ForegroundColor Red
    exit 1
}
Write-Host "Signed in as $user" -ForegroundColor Green

$repo = "portfolio"

# --- 2. Create the repo and push --------------------------------------------
& $gh repo view "$user/$repo" | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "== Creating public repo $user/$repo ==" -ForegroundColor Cyan
    & $gh repo create $repo --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Could not create the repo." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host ""
    Write-Host "== Repo exists, pushing latest ==" -ForegroundColor Cyan
    git remote get-url origin | Out-Null
    if ($LASTEXITCODE -ne 0) {
        git remote add origin "https://github.com/$user/$repo.git"
    }
    git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Push failed." -ForegroundColor Red
        exit 1
    }
}

# --- 3. Turn on GitHub Pages -------------------------------------------------
Write-Host ""
Write-Host "== Enabling GitHub Pages ==" -ForegroundColor Cyan
& $gh api --method POST "repos/$user/$repo/pages" -f "source[branch]=main" -f "source[path]=/" | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "(Pages was already enabled — carrying on.)"
}

Start-Sleep -Seconds 4
$url = (& $gh api "repos/$user/$repo/pages" --jq .html_url)

Write-Host ""
Write-Host "-----------------------------------------------------------" -ForegroundColor Green
if ($url) {
    Write-Host " Live at: $url" -ForegroundColor Green
} else {
    Write-Host " Live at: https://$user.github.io/$repo/" -ForegroundColor Green
}
Write-Host " The first build takes about a minute." -ForegroundColor Green
Write-Host "-----------------------------------------------------------" -ForegroundColor Green
Write-Host ""
Write-Host "To publish changes later:"
Write-Host "  git add . ; git commit -m ""your message"" ; git push"
