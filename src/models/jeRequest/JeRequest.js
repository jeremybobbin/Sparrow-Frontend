module.exports = class JeRequest {
    constructor(url) {
        this.url = url || '';
    }

    get(url, body, headers) {
        console.log('GET has been called -JeRequest');
        return this.request('GET', url, body, headers);
    }
    put(url, body, headers) {
        return this.request('PUT', url, body, headers);
    }
    post(url, body, headers) {
        return this.request('POST', url, body, headers);
    }
    delete(url, body, headers) {
        return this.request('DELETE', url, body, headers);
    }

    request(method, url, body, headers) {
        url = url || '';
        url = this.url + url;
        console.log('JeRequest has been called: ' + url);

        let req = this.init();
        req.open(method, url, true);
        this.addHeaders(req, headers);
        req.send(body || null);

        return new Promise((resolve, reject) => {
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    console.log(req.response);
                    if(req.status == 200) resolve(req.responseText);
                    else reject(req.responseText);
                }
            }
        });
    }

    init() {
        const req = new XMLHttpRequest();
        req.withCredentials = true;
        return req;
    }

    appendHeader(req, k, v) {
        console.log(k + v);
        req.setRequestHeader(k, v); 
    }

    addHeaders(req, headers) {
        for(let k in headers) {
            this.appendHeader(req, k, headers[k]);    
        } 
    }

    exec(req) {
        req.send(null);
    }
}