
export default async function Page({ params }: { params: { slug: string } }) {
    return <h1 className="min-h-screen py-4 px-4 md:px-2 pt-2 pb-16  max-w-2xl w-full">kjsjkldg {params.slug}</h1>
}