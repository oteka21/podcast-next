import 'isomorphic-fetch';
export default class extends React.Component{
    static async getInitialProps(){
        let request = await fetch('https://api.audioboom.com/channels/recommended')
        let{ body: channels } = await request.json();
        return { channels }
    }
    render(){
        const { channels } = this.props
        return (
           <div>
                <header>Podcast</header>
                {
                    channels.map(channel => (
                        <div class='channel'>
                            <img src={channel.urls.logo_image.original} alt={channel.title}/>
                        </div>
                    ) )
                }
                <style jsx>{`
                    header{
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                `}</style>
                <style jsx global>{`
                    body{
                        margin: 0;
                        font-family: system-ui;
                        background: white;
                    }
                `}</style>
           </div>
        )
    }
}