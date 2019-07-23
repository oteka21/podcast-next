import Layout from '../src/Layout';
import Link from 'next/link';
export default class Error extends React.Component{
    static getInitialProps({ res, err }) {
      const statusCode = res ? res.statusCode : err ? err.statusCode : null;
      return { statusCode }
    }
  
    render() {
        const { statusCode } = this.props
      return (
          <Layout title='ohh no!'>   
                {
                    statusCode === 404 
                    ? <div className="message">
                        <h1>Esta pagina no existe</h1>
                        <Link href='/'>
                            <a>
                                <h3>Volver a la home!</h3>
                            </a>
                        </Link>
                    </div>
                    : <div className="message">
                    <h1>Ha ocurrido un error generico</h1>
                    <Link href='/'>
                            <a>
                                <h3>Volver a la home!</h3>
                            </a>
                        </Link>
                </div>
                }
                <style jsx>{`
                    .message{
                        padding: 100px;
                        text-align: center;
                    }
                `}</style>
            </Layout>
      )
    }
  }