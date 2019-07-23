import {useState} from 'react'
import Layout from '../src/Layout';
import ChannelGrid from '../src/ChannelGrid'; 
import PodcastListWithClick from '../src/PodcastListWithClick';
import PodcastPlayer from '../src/PodcastPlayer';
import Error from './_error';

function Channel (props) {
    const [openPodcast, setOpenPodcast] = useState(null);

    function handleOpenPodcast (e, podcast){
        e.preventDefault();
        setOpenPodcast(podcast)
    }
    function handleClosePodcast (e){
        e.preventDefault 
        setOpenPodcast(null);
    }
    const { channel, audioClips, series, statusCode } = props
    if (statusCode !== 200){
        return <Error statusCode={statusCode} />
    }   

    return <Layout title={channel.title}>

      <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

      <h1>{ channel.title }</h1>
      {openPodcast && <div className='modal'><PodcastPlayer clip={openPodcast} onclose={handleClosePodcast} /></div>}
      { series.length > 0 &&
        <ChannelGrid channels={series} />
      }

      <h2>Ultimos Podcasts</h2>
      { audioClips &&
        <PodcastListWithClick podcasts={audioClips} onClickPodcast={handleOpenPodcast} />
      }
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
        }
      `}</style>
    </Layout>
}

Channel.getInitialProps = async function ({query, res}){
    let idChannel = query.id
    try{
        let [reqChannel, reqSeries, reqAudios] = await Promise.all([
          fetch(`https://api.audioboom.com/channels/${idChannel}`),
          fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
          fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
        ])

        if (reqChannel.status >= 400){
            res.statusCode = reqChannel.status
            return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status}
        }
    
        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel
    
        let dataAudios = await reqAudios.json()
        let audioClips = dataAudios.body.audio_clips
    
        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels
    
        return { channel, audioClips, series, statusCode: 200 }
    }catch(e){
        return { channel: null, audioClips: null, series: null, statusCode: 503}
    }
  }

  export default Channel;