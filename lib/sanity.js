import { createClient, createPreviewSubscriptionHook } from "next-sanity";
import {PortableText as PortableTextComponent} from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'

const config = {
	projectId: "610z4piv",
	dataset: "production",
	apiVersion: "2021-03-25",
	useCdn: false,
}

export const sanityClient = createClient(config)

export const usePreviewSuscription = createPreviewSubscriptionHook(config)

export const urlFor = (source) => imageUrlBuilder(sanityClient).image(source)

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />