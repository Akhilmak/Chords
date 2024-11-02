// import utilities from redux toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Key": "c1da975c94msh84d4bffd9d40d57p1c2788jsn6ecc2887a66d",
// 		"X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
// 	},
// };  VITE_SHAZAM_CORE_RAPID_API_KE

// fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
// 	.then((response) => response.json())
// 	.then((response) => console.log(response))
// 	.catch((err) => console.error(err));

export const shazamCoreApi = createApi({
	reducerPath: "shazamCoreApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://music-m5on.onrender.com", // Updated base URL for Spring Boot
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => "/charts/world" }),
		getSongsByGenre: builder.query({
			query: (genre) => `/charts/genre-world?genre_code=${genre}`,
		}),
		getSongsByCountry: builder.query({
			query: (countryCode) => `/charts/country?country_code=${countryCode}`,
		}),
		getSongsBySearch: builder.query({
			query: (searchTerm) => `/search/songs/${searchTerm}`, // Updated endpoint
		}),
		getArtistDetails: builder.query({
			query: (artistId) => `/artists/details?artist_id=${artistId}`,
		}),
		getSongDetails: builder.query({
			query: ({ songid }) => `/tracks/details?track_id=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/tracks/related?track_id=${songid}`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongsByGenreQuery,
	useGetSongsByCountryQuery,
	useGetSongsBySearchQuery,
	useGetArtistDetailsQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
} = shazamCoreApi;
