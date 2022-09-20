import {
	sanityClient,
	PortableText,
	urlFor,
	usePreviewSuscription,
} from "../../lib/sanity"

import Head from 'next/head'
import { useState } from "react"

const query = `*[_type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage{
        asset->{
            _id,
            url
        }
    },
    ingredients[]{
        _key,
        unit,
        wholeNumb,
        fraction,
        ingredient->{
            name
        }
    },
    instructions,
    likes
}`

export default function OneRecipe({data}) {
    const [likes, setLikes] = useState(data?.recipe?.likes)
    const { recipe } = data

    const addLike = async () => {
        const res = await fetch("/api/handle-like",{
            body:JSON.stringify({_id:recipe._id}),
            method:"POST"
        })
        .catch(error=>console.log(error))

        const data = await res.json()

        setLikes(data.likes)
    }


    return (
			<>
				<Head>
					<title>{recipe.name}</title>
				</Head>
				<article className="recipe">
					<h1>{recipe.name}</h1>
                    <button className="like-button" onClick={addLike}>{likes}❤️</button>
					<main className="content">
						<img
							src={urlFor(recipe.mainImage).url()}
							alt={recipe.slug.current}
						/>
						<div className="breakdown">
							<ul className="ingredients">
								{recipe.ingredients?.map((ingredient) => (
									<li key={ingredient._key} className="ingredient">
										{ingredient?.wholeNumb} {ingredient?.fraction} {ingredient?.unit}
										<br />
										{ingredient?.ingredient?.name}
									</li>
								))}
							</ul>
                            <div>
                            <PortableText value={recipe.instructions} className="instructions"/>
                            </div>
						</div>
					</main>
				</article>
			</>
		)
}

export async function getStaticPaths() {
	const paths =
		await sanityClient.fetch(`*[_type == "recipe" && defined(slug.current)]{
        "params": {
            "slug": slug.current
        }
    }`)

	return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
	const { slug } = params
	const recipe = await sanityClient.fetch(query, { slug })
	return { props: { data: { recipe } } }
}
