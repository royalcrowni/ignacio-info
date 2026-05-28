#!/usr/bin/env python3
"""Simple static server with clean-URL support (no .html extension needed)."""
import http.server
import os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Try the path as-is first
        local = self.translate_path(self.path)
        if not os.path.exists(local) or os.path.isdir(local):
            # Try appending .html
            candidate = local.rstrip('/') + '.html'
            if os.path.isfile(candidate):
                self.path = self.path.rstrip('/') + '.html'
        super().do_GET()

    def log_message(self, fmt, *args):
        pass  # Silence request logs

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3456
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with http.server.HTTPServer(('', port), CleanURLHandler) as httpd:
        print(f'Serving at http://localhost:{port}')
        httpd.serve_forever()
