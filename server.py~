import http.server
import socketserver
socketserver.TCPServer.allow_reuse_address = True

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        if self.path == '/':
            self.path = 'index.html'    
        return http.server.SimpleHTTPRequestHandler.do_GET(self)
        
# Create an object of the above class
handler_object = MyHttpRequestHandler
PORT = 8080
my_server = socketserver.TCPServer(("", PORT), handler_object)
print("Server started http://localhost:%s" % (PORT))

try:
    my_server.serve_forever()
except KeyboardInterrupt:
    pass

    my_server.server_close()
    print("Server stopped.")
