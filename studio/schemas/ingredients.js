export default {
	name: "ingredient",
	title: "Ingredient",
	type: "document",
	fields: [
		{ name: "name", title: "Ingredient's name", type: "string" },
		{
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
		},
		{ name: "notes", title: "Notes", type: "text" },
	],
}
