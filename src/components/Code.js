import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

let baseUrl = 'https://localhost:3001/';

export default class Code extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
        };
        this.script = `<script>(function(w,n) { \
        if (typeof(w[n]) == 'undefined'){ob=n+'Obj';w[ob]=[];w[n]=function(){w[ob].push(arguments);}; \
        d=document.createElement('script');d.type = 'text/javascript';d.async=1; \
        d.src='${baseUrl + 'script'}' ;x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(d,x);} \
        })(window, 'sparrow', ''); \
        sparrow('config', 'baseUrl', '${baseUrl}'); \
        sparrow('config', 'https', ${props.url.includes('https') ? 1 : 0}); \
        sparrow('config', 'track', ${props.tracking ? 1 : 0}); \
        </script>`;
    }
  
    onCopy() {
      this.setState({copied: true});
    }
  
  
    render() {
      return (
            <div>
                <textarea value={this.script} size={10}/>
                <CopyToClipboard text={this.script} onCopy={() => this.onCopy()}>
                    <button>Copy</button>
                </CopyToClipboard>
                <div>
                    {this.state.copied ? <span >Copied.</span> : null}
                </div>
            </div>
      );
    }
}