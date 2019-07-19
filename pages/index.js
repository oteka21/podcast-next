import 'isomorphic-fetch';
import Link from 'next/link';
import Header from '../src/header'

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
               <Header>Podcast</Header>
                <div className='channels'>
                {
                    channels.map(channel => (
                        <Link href={`/channel?id=${channel.id}`} prefetch key={channel.id}>
                            <a className='channel'>
                                <img src={channel.urls.logo_image.original} alt={channel.title}/>
                                <h2>{channel.title}</h2>
                            </a>
                        </Link>
                    ) )
                }
                </div>
                <style jsx>{`
                    .channels {
                        display: grid;
                        padding: 15px;
                        grid-gap: 15px;
                        text-align: center;
                        grid-template-columns: repeat(auto-fill,minmax(160px, 1fr));
                    }
                    .channel {
                        display: block;
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                        margin-bottom: 0.5rem;
                    }
                    .channel img{
                        width: 100%;
                    }
                    h2{
                        padding: 5px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin: 0;
                        text-align: center;
                    }
                    .channels{
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
                    }
                    .channel {
                        display: block;
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rgb(0,0,0,0.15);
                        margin-bottom: 0.5rem;
                    }
                    .channel h2{
                        color: #000;
                        text-decoration: none !important;
                    }
                    .channel h2:hover{
                        color: #000;
                        
                    }
                    .channel img{
                        width: 100%;
                    }
                    .channel h2{
                        padding: 5px;
                        font-size: 0.9rem;
                        font-weight: bold;
                        margin: 0;
                        text-align:center;
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