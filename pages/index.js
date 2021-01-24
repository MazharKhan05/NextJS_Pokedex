import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home({ pokemon }) {
	return (
		<Layout title="NextJS Pokedex">
			<h1 className="text-4xl text-center mb-3">NextJS Pokedex</h1>

			<ul>
				{pokemon.map((res, index) => (
					<li key={index}>
						<a
							className="bg-gray-100 flex capatilize mb-3 items-center rounded-md text-lg font-bold"
							href={`/pokemon?id=${index + 1}`}
						>
							<img src={res.image} className="w-40 h-40  ml-3" />
							<span className="mr-2">{index + 1}</span>
							{res.name}
						</a>
					</li>
				))}
			</ul>
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
	const { results } = await res.json();
	const pokemon = results.map((result, index) => {
		const routeNum = "00" + (index + 1);
		const modRoute = routeNum.slice(-3);
		const baseUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${modRoute}.png`;
		return {
			...result,
			image: baseUrl,
		};
	});

	return {
		props: { pokemon },
	};
}
