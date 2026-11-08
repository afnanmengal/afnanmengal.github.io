#!/usr/bin/env python3
"""
Local development server for Engr. Afnan Badar's Portfolio Website.
Runs a lightweight HTTP server and opens the browser automatically.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    # Find an open port starting from 8080
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 65)
                print(f"🚀  Engr. Afnan Badar - Portfolio Server Running!")
                print(f"🌐  Local URL: {url}")
                print(f"📁  Serving Directory: {DIRECTORY}")
                print("=" * 65)
                print("Press Ctrl+C to terminate the server.\n")
                
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 10048:
                port += 1
                continue
            else:
                raise e

if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        print("\n🛑  Server stopped cleanly.")
        sys.exit(0)
