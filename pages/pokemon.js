import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

function pokemon({ data }) {
	console.log(data);
	return (
		<Layout>
			<h1 className="text-4xl capitalize font-bold text-center">{data.name}</h1>
			<img src={data.image} className="mx-auto w-80 h-100 mt-2" />
			<div className="pl-7 ">
				<p>Height: {data.height}</p>
				<p>Weight: {data.weight}</p>
				<h3 className="font-semibold text-xl mt-3 mb-1">Types:</h3>
				{data.types.map((res) => (
					<p>{res.type.name}</p>
				))}
			</div>
			<p className="text-center  mt-5">
				<Link href="/">
					<a className="text-2xl underline">Home</a>
				</Link>
			</p>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const id = query.id;
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const data = await res.json();
	const routeNum = "00" + id;
	const modRoute = routeNum.slice(-3);
	const baseUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${modRoute}.png`;
	data.image = baseUrl;

	return {
		props: { data },
	};
}

export default pokemon;
