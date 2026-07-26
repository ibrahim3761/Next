
import { notFound } from "next/navigation";
import { getNewsById } from "../../_actions/getNewsById";
import { NewsDetails } from "../../_components/news/NewsDetails";

const NewsByIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const result = await getNewsById(id);

  if (!result.success || !result.data) {
    return notFound();
  }

  return <NewsDetails post={result.data} />;
};

export default NewsByIdPage;