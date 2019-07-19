import Header from '../src/header';
export default class extends React.Component {

    static async getInitialProps({query}){
        const channelId = query.id

        const [reqChannel,reqAudio,reqSeries] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${channelId}`),
            fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
            fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`)
        ]);

        const dataChannel = await reqChannel.json();
        const channel = dataChannel.body.channel;
        

        const dataAudios = await reqAudio.json();
        const audioClips = dataAudios.body.audio_clips

        const dataSeries = await reqSeries.json();
        const series = dataSeries.body.channels

        return { channel, audioClips, series }
    }

    render(){
        const {channel, audioClips, series} = this.props
        return (
           <div>
               <Header>{channel.title}</Header>
               <div>
                   {
                       audioClips.map(clip => (
                            <div>
                                {clip.title}
                            </div>
                       ))
                   }
               </div>
               <hr />
               <div>
                   {
                       series.map(serie => (
                            <div>
                                {serie.title}
                            </div>
                       ))
                   }
               </div>
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