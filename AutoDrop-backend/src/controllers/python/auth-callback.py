print("lol")

import sys
import json
import iop

# Parse the data passed from the Node.js application
data = json.loads(sys.argv[1])
print(data)
url = data['url']
appkey = data['appkey']
appSecret = data['appSecret']
code = data['code']
uuid = "uuid"
print("lol")
client = iop.IopClient(url, appkey ,appSecret)
request = iop.IopRequest('/auth/token/create')
request.add_api_param('code', code)
request.add_api_param('uuid', uuid)
response = client.execute(request)
print(response.type)
print(response.body)
