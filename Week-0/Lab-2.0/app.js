const http = require("node:http")
const fs = require("node:fs")
const { URLSearchParams } = require("node:url")

users = {
    user1: "Henry",
    user2: "Agyemang",
    user3: "Duah"
}


const server = http.createServer((request,response) =>{
    
    
    if(request.url === '/'){
        response.writeHead(200, {"Content-type": "text/html"})
        const template = fs.createReadStream("./form.html")
        template.pipe(response)
    
    } else if(request.url === '/users'){

        response.writeHead(200, {"Content-type": "text/json"})
        response.end(JSON.stringify(users))
    
    } else if(request.url === '/create-user' && request.method === 'POST'){
        let body = ""  
        request.on('data', chunk =>{
            body += chunk.toString()
          })

        request.on('end', () =>{
            const formData = new URLSearchParams(body)
            const parsedData = Object.fromEntries(formData.entries())
            response.end(parsedData)
        })
          response.writeHead(200, {"Content-Type": "text/plain"})

    }
}
)

server.listen(8080, () =>{
    console.log("Server is running on http://localhost:8080")
})