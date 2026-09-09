"""
Robust multi-threaded HTTP server for THERMOSHELTER website.
"""

import http.server
import socketserver
import os
import sys
import json
import urllib.request
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/weather":
            qs = urllib.parse.parse_qs(parsed.query)
            lat = qs.get("lat", ["26.9124"])[0]
            lon = qs.get("lon", ["75.7873"])[0]
            
            url = (
                f"https://api.open-meteo.com/v1/forecast?"
                f"latitude={lat}&longitude={lon}&"
                f"current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,"
                f"precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,"
                f"wind_speed_10m,wind_direction_10m,direct_normal_irradiance,diffuse_radiation&"
                f"timezone=Asia%2FKolkata"
            )
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "ThermoShelter/2.0"})
                with urllib.request.urlopen(req, timeout=12) as response:
                    data = response.read()
                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("Cache-Control", "no-cache")
                    self.end_headers()
                    self.wfile.write(data)
                    return
            except Exception as e:
                # Return graceful fallback JSON with HTTP 200
                fallback_data = {
                    "current": {
                        "temperature_2m": 25.5,
                        "apparent_temperature": 27.8,
                        "relative_humidity_2m": 65,
                        "wind_speed_10m": 9.5,
                        "wind_direction_10m": 160,
                        "direct_normal_irradiance": 0.0,
                        "diffuse_radiation": 0.0,
                        "surface_pressure": 1010.5,
                        "cloud_cover": 25,
                        "weather_code": 0
                    },
                    "source": "fallback",
                    "error": str(e)
                }
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(fallback_data).encode())
                return

        return super().do_GET()

    def end_headers(self):
        # Disable caching for instant updates
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


def run():
    os.chdir(DIRECTORY)
    with ThreadingHTTPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving HTTP on 0.0.0.0 port {PORT} (http://localhost:{PORT}/) ...", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down.", flush=True)
            httpd.server_close()


if __name__ == "__main__":
    run()

