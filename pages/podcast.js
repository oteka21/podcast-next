import 'isomorphic-fetch'
import Layout from '../src/Layout';
import PodcastPlayer from '../src/PodcastPlayer';
 function Podcast(props){
     const { audio_clip } = props
        return (
            <Layout title={audio_clip.title}>
                <div className='modal'>
                    <PodcastPlayer clip={audio_clip} />
                </div>
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
        )
}

Podcast.getInitialProps = async function  ({query}){
    const clipId = query.id;
    let audio_clip;
    let res = await fetch(`https://api.audioboom.com/audio_clips/${clipId}`);
    let data = await res.json();
    audio_clip = data.body.audio_clip;
    if (!audio_clip.urls.high_mp3){
        res = await fetch(`https://api.audioboom.com/audio_clips/${clipId}.mp3`);
        data = await res.json();
        audio_clip = data.body.audio_clip;
    }
    return {
        audio_clip
    }
}

export default Podcast;