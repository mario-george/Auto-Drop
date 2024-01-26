

try:
    print("121232123")
    import sys
    import json
    import iop
    aliexpressData = json.loads(sys.stdin.read())
    code = aliexpressData['code']
    client = iop.IopClient("https://api-sg.aliexpress.com/rest", "34271827" ,"2c5bcc0958a9d9abd339232f1b31712e")
    request = iop.IopRequest('/auth/token/create')
    request.add_api_param('code', code)
    request.add_api_param('uuid', "uuid")
    response = client.execute(request)

    print(response.type)
    print(response.body)
except Exception as e:
    print(f"An error occurred: {e}")
