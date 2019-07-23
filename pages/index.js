import 'isomorphic-fetch';
import Layout from '../src/Layout';
import ChannelGrid from '../src/ChannelGrid';
import Error from 'next/error';

export default class extends React.Component{
    static async getInitialProps({res}){
        try{
            let request = await fetch('https://api.audioboom.com/channels/recommended')
            let{ body: channels } = await request.json();
            return { channels, statusCode: 200 }
        }catch(e){
            res.statusCode = 500
            return {channels: null, statusCode: 500}
        }
    }
    render(){
        const { channels, statusCode } = this.props

        if (statusCode !== 200){
            return <Error statusCode={statusCode} />
        }   
        return (
            <Layout title='Podcast'>
              <ChannelGrid channels={channels} />
           </Layout>
        )
    }
}