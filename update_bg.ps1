Get-ChildItem frontend/src/pages/*.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'bg-\[#[a-f0-9]+\]', 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'
    $content = $content -replace 'bg-gradient-to-br from-[a-z0-9-]+ via-[a-z0-9-]+ to-[a-z0-9-]+', 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'
    $content = $content -replace 'bg-gray-100 dark:bg-gray-900', 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'
    $content | Set-Content $_.FullName
}
