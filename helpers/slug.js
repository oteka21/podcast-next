import sluglify from 'slugify';


export default function slug(name){
    return sluglify(name,{ lower: true }).replace(/[^\w\-]+/g, '')
}