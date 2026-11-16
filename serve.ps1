# Máy chủ tĩnh tối giản để chạy thử game trên http://localhost:8123
# Không bắt buộc: mở thẳng index.html bằng trình duyệt cũng chơi được.
param([int]$Port = 8123)
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$types = @{ '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'application/javascript; charset=utf-8'; '.svg' = 'image/svg+xml'; '.json' = 'application/json'; '.png' = 'image/png'; '.ico' = 'image/x-icon' }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Cang Thap Nhat dang chay tai http://localhost:$Port/  (Ctrl+C de dung)"
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
      if ($rel -eq '') { $rel = 'index.html' }
      $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
      if ($path.StartsWith($root) -and (Test-Path $path -PathType Leaf)) {
        $bytes = [IO.File]::ReadAllBytes($path)
        $ext = [IO.Path]::GetExtension($path).ToLower()
        if ($types.ContainsKey($ext)) { $ctx.Response.ContentType = $types[$ext] }
        $ctx.Response.Headers.Add('Cache-Control', 'no-store')
        $ctx.Response.ContentLength64 = $bytes.Length
        if ($ctx.Request.HttpMethod -ne 'HEAD') { $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) }
      } else {
        $ctx.Response.StatusCode = 404
      }
      Write-Host "$($ctx.Response.StatusCode) /$rel"
    } catch {
      Write-Host "Loi: $($_.Exception.Message)"
    } finally {
      try { $ctx.Response.Close() } catch {}
    }
  }
} finally { $listener.Stop() }
