import { Fragment } from 'react';
import Link from 'next/link';
export default function (props){
    return (
        <Fragment>
            <header>
            <Link href='/'>
                <a>
                    {props.children}
                </a>
            </Link>
            </header>
            <style jsx>
                {`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                    header a{
                        color: white;
                        text-decoration: none;
                    }
                `}
            </style> 
        </Fragment>
    )
}