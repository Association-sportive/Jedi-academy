import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton'
import PostsApi from '../services/postsAPI'
import RandomArray from '../functions/RandomArray'
import PreviousNextButton from "./PreviousNextButton";
import goldSeparator from '../assets/gold-separator.svg'
import redSeparator from '../assets/red-separator.svg'

// Right part of PostPage
export default function SideBarPost(){
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        fetchAllPosts();
    },[slug])

    // Strapi API call + random 3 posts
    const fetchAllPosts = async () => {
        const data = await PostsApi.findAll();
        const dataArray=RandomArray(data, 3);
        setPosts(dataArray);
        setIsLoading(false);
    }

    const skeletonArray=[1, 2, 3];

    let navigate = useNavigate(); 

    return (
        <Grid item xs={12} md={4} className="sideBarPost">
            <div className="separator"><img className="gold" src={goldSeparator} alt="gold separator"/><img className="red" src={redSeparator} alt="red separator"/></div>
            <div className="content">
                <div className="sticky">
                    <span className="title"><h2>Autres infos utiles</h2></span>
                    {isLoading ? skeletonArray.map(skeloton => 
                    (
                        <article className="card" key={skeloton}>
                            <div className="thumb"></div>
                            <div className="infos">
                                <Skeleton height={20} style={{ marginRight:16, marginLeft:16}}/>
                                <Skeleton height={20} width="60%" style={{ marginRight:30, marginLeft:30}}/>
                            </div>
                        </article>
                    )) : posts.map(post => 
                    (
                        <article className="card" key={post.id}>
                            <div className="thumb" style={{backgroundImage: `url(${post.attributes.img.datasrc.data.attributes.formats.small.url})`, backgroundRepeat: 'no-repeat', backgroundPosition:'center'}}></div>
                            <div className="infos">
                                <h3 className="title">{post.attributes.title}</h3>
                                <PreviousNextButton isNext="true" text="Go !" onClick={() => navigate("/infos-utiles/"+post.attributes.slug+"#top").isFocused()} width="small" />
                            </div>
                        </article>
                    )
                    )}
                </div>
            </div>
        </Grid>
    );
}