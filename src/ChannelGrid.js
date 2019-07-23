import {Fragment} from 'react';
import {Link} from '../routes';
import slug from '../helpers/slug';

export default function ChannelGrid (props){
    const {channels} = props
    return (
        <Fragment>
            <div className='channels'>
                    {
                        channels.map(channel => (
                            <Link route='channel' prefetch key={channel.id} params={
                                {
                                    slug: slug(channel.title),
                                    id: channel.id
                                }
                            }>
                                <a className='channel'>
                                    <img src={channel.urls.logo_image.original} alt={channel.title}/>
                                    <h2>{channel.title}</h2>
                                </a>
                            </Link>
                        ) )
                    }
            </div>
            <style jsx>{`
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
        </Fragment>


    )
}