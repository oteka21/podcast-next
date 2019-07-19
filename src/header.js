import { Fragment } from 'react';
export default function (props){
    return (
        <Fragment>
            <header>{props.children}</header>
            <style jsx>
                {`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                `}
            </style> 
        </Fragment>
    )
}