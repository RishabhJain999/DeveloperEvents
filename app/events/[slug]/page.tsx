
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
   const { slug } = await params;
   return (
      <div>Event {slug}</div>
   )
}

export default page